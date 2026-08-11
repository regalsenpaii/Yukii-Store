import crypto from 'crypto';

const AUSTIN_API_KEY = process.env.AUSTIN_API_KEY;
const AUSTIN_API_SECRET = process.env.AUSTIN_API_SECRET;
const AUSTIN_WEBHOOK_SECRET = process.env.AUSTIN_WEBHOOK_SECRET;
const AUSTIN_BASE = 'https://austinstore.id';
const BOT_POLL_KEY = process.env.BOT_POLL_KEY;

// In-memory DB (⚠️ hilang saat cold start. Untuk production pakai Vercel KV)
let memoryDB = { orders: [], logs: [] };

function readDB() { return memoryDB; }
function writeDB(db) { memoryDB = db; }

function verifyBotKey(req) {
  return req.query.botKey === BOT_POLL_KEY;
}

// HMAC untuk request KE Austin Store
function signAustinRequest(method, path, bodyObj) {
  const timestamp = Date.now().toString();
  const bodyStr = (bodyObj && Object.keys(bodyObj).length > 0) 
    ? JSON.stringify(bodyObj) 
    : '""';
  const payload = `${method.toUpperCase()}\n${path}\n${bodyStr}\n${timestamp}`;
  const signature = crypto.createHmac('sha256', AUSTIN_API_SECRET).update(payload).digest('hex');
  return { timestamp, signature };
}

// Verifikasi signature dari webhook Austin Store
function verifyWebhookSignature(rawBody, signature) {
  if (!AUSTIN_WEBHOOK_SECRET) return true;
  const expected = crypto.createHmac('sha256', AUSTIN_WEBHOOK_SECRET).update(rawBody).digest('hex');
  try {
    return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex'));
  } catch { return false; }
}

// Baca raw body (penting untuk webhook HMAC)
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export const config = {
  api: { bodyParser: false } // Wajib agar raw body tersedia untuk HMAC webhook
};

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, X-Timestamp, X-Signature, X-AustinPay-Signature, X-AustinPay-Event');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // ═══════════════════════════════════════
  // 1. BOT POLLING (GET ?action=poll)
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'poll') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const pending = db.orders.filter(o => o.status === 'paid' && !o.processedByBot);
    return res.status(200).json({ success: true, count: pending.length, orders: pending });
  }

  // ═══════════════════════════════════════
  // 2. BOT CONFIRM (GET ?action=confirm)
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'confirm') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const order = db.orders.find(o => o.id === req.query.id);
    if (order) {
      order.processedByBot = true;
      order.processedAt = Date.now();
      writeDB(db);
    }
    return res.status(200).json({ success: true });
  }

  // ═══════════════════════════════════════
  // 3. CHECK STATUS (GET ?action=check)
  //    Frontend polling → proxy ke Austin Store
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'check') {
    const depositId = req.query.id;
    if (!depositId) return res.status(400).json({ success: false, message: 'ID diperlukan' });

    try {
      const path = `/api/v1/deposit/check/${depositId}`;
      const { timestamp, signature } = signAustinRequest('GET', path, null);

      const response = await fetch(`${AUSTIN_BASE}${path}`, {
        method: 'GET',
        headers: {
          'X-API-Key': AUSTIN_API_KEY,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
        }
      });

      const data = await response.json();
      
      // Update local DB kalau status paid
      const localOrder = db.orders.find(o => o.depositId === depositId || o.id === depositId);
      if (localOrder && data.success && data.data?.status === 'paid') {
        localOrder.status = 'paid';
        localOrder.paidAt = Date.now();
        writeDB(db);
      }

      return res.status(200).json({ success: true, status: data.data?.status || 'unknown', austin: data, order: localOrder || null });

    } catch (error) {
      console.error('[Check Status Error]', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // ═══════════════════════════════════════
  // 4. CREATE DEPOSIT (POST)
  // ═══════════════════════════════════════
  if (req.method === 'POST' && !req.query.webhook) {
    const { nama, nomor, groupLink, duration } = req.body;
    if (!nama || !nomor || !groupLink || !duration) {
      return res.status(400).json({ success: false, message: 'Data tidak lengkap' });
    }

    const match = groupLink.match(/chat\.whatsapp\.com\/([0-9A-Za-z]{10,})/);
    if (!match) return res.status(400).json({ success: false, message: 'Link grup WA tidak valid' });

    const prices = { '1': 10000, '3': 25000, '6': 45000, '12': 80000 };
    const amount = prices[duration] || 10000;
    const orderId = 'YU-' + Date.now();
    const cleanNomor = nomor.replace(/^0/, '62').replace(/\D/g, '');

    try {
      const path = '/api/v1/deposit/create';
      const bodyObj = {
        amount: amount,
        method: 'qris',
        merchant_ref: orderId,
        customer_name: nama,
        customer_email: `${cleanNomor}@yuki.store`,
        customer_phone: cleanNomor
      };

      const { timestamp, signature } = signAustinRequest('POST', path, bodyObj);

      const response = await fetch(`${AUSTIN_BASE}${path}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': AUSTIN_API_KEY,
          'X-Timestamp': timestamp,
          'X-Signature': signature,
        },
        body: JSON.stringify(bodyObj)
      });

      const data = await response.json();
      console.log('[Austin Create]', JSON.stringify(data, null, 2));

      if (!data.success) {
        throw new Error(data.message || 'Gagal membuat deposit');
      }

      const tx = data.data || {};
      const order = {
        id: orderId,
        nama,
        nomor: cleanNomor,
        groupLink,
        inviteCode: match[1],
        duration: parseInt(duration),
        amount,
        status: 'pending',
        depositId: tx.id || tx.transactionId || tx.reference || orderId,
        qrImage: tx.qrImage || tx.qr_url || tx.qr_string || '',
        totalAmount: tx.totalAmount || tx.amount || amount,
        uniqueCode: tx.uniqueCode || 0,
        createdAt: Date.now(),
        expiredAt: Date.now() + (5 * 60 * 1000),
        processedByBot: false
      };

      db.orders.push(order);
      writeDB(db);

      return res.status(200).json({
        success: true,
        depositId: order.depositId,
        id: order.id,
        qrImage: order.qrImage,
        totalAmount: order.totalAmount,
        uniqueCode: order.uniqueCode,
        expiredAt: order.expiredAt
      });

    } catch (error) {
      console.error('[Austin Create Error]', error);
      return res.status(500).json({
        success: false,
        message: error.message || 'Gagal membuat deposit'
      });
    }
  }

  // ═══════════════════════════════════════
  // 5. WEBHOOK AUSTIN STORE (POST ?webhook=austin)
  // ═══════════════════════════════════════
  if (req.method === 'POST' && req.query.webhook === 'austin') {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-austinpay-signature'];
    const event = req.headers['x-austinpay-event'];

    console.log('[Webhook] Event:', event);
    db.logs.push({ t: Date.now(), event, body: rawBody.toString() });

    if (!verifyWebhookSignature(rawBody, signature)) {
      console.error('[Webhook] Invalid signature!');
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody);

    if (event === 'deposit.paid' && payload.data) {
      const ref = payload.data.transactionId || payload.data.merchant_ref || payload.data.reference;
      const order = db.orders.find(o => o.depositId === ref || o.id === ref);
      
      if (order && order.status !== 'paid') {
        order.status = 'paid';
        order.paidAt = Date.now();
        order.paymentData = payload.data;
        console.log(`[Webhook] ✅ Order ${order.id} marked as PAID`);
        writeDB(db);
      }
    }

    return res.status(200).json({ success: true, received: true });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
