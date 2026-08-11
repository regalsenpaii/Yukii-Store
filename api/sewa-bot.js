import crypto from 'crypto';

const AUSTIN_API_KEY = process.env.AUSTIN_API_KEY;
const AUSTIN_API_SECRET = process.env.AUSTIN_API_SECRET;
const AUSTIN_WEBHOOK_SECRET = process.env.AUSTIN_WEBHOOK_SECRET;
const AUSTIN_BASE = 'https://austinstore.id';
const BOT_POLL_KEY = process.env.BOT_POLL_KEY;

let memoryDB = { orders: [], logs: [] };
function readDB() { return memoryDB; }
function writeDB(db) { memoryDB = db; }
function verifyBotKey(req) { return req.query.botKey === BOT_POLL_KEY; }

function signAustinRequest(method, path, bodyObj) {
  const timestamp = Date.now().toString();
  const bodyStr = (bodyObj && Object.keys(bodyObj).length > 0) ? JSON.stringify(bodyObj) : '""';
  const payload = `${method.toUpperCase()}\n${path}\n${bodyStr}\n${timestamp}`;
  const signature = crypto.createHmac('sha256', AUSTIN_API_SECRET).update(payload).digest('hex');
  return { timestamp, signature };
}

function verifyWebhookSignature(rawBody, signature) {
  if (!AUSTIN_WEBHOOK_SECRET) return true;
  const expected = crypto.createHmac('sha256', AUSTIN_WEBHOOK_SECRET).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex')); }
  catch { return false; }
}

async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-API-Key, X-Timestamp, X-Signature, X-AustinPay-Signature, X-AustinPay-Event');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // ─── BOT POLLING ───
  if (req.method === 'GET' && req.query.action === 'poll') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const pending = db.orders.filter(o => o.status === 'paid' && !o.processedByBot);
    return res.status(200).json({ success: true, count: pending.length, orders: pending });
  }

  // ─── BOT CONFIRM ───
  if (req.method === 'GET' && req.query.action === 'confirm') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const order = db.orders.find(o => o.id === req.query.id);
    if (order) { order.processedByBot = true; order.processedAt = Date.now(); writeDB(db); }
    return res.status(200).json({ success: true });
  }

  // ─── CHECK STATUS (proxy ke Austin + update local) ───
  if (req.method === 'GET' && req.query.action === 'check') {
    const depositId = req.query.id;
    if (!depositId) return res.status(400).json({ success: false, message: 'ID diperlukan' });

    try {
      const path = `/api/v1/deposit/check/${depositId}`;
      const { timestamp, signature } = signAustinRequest('GET', path, null);
      const response = await fetch(`${AUSTIN_BASE}${path}`, {
        method: 'GET',
        headers: { 'X-API-Key': AUSTIN_API_KEY, 'X-Timestamp': timestamp, 'X-Signature': signature }
      });
      const data = await response.json();
      console.log('[Austin Check]', JSON.stringify(data));

      const localOrder = db.orders.find(o => o.depositId === depositId || o.id === depositId);
      if (localOrder && data.success && (data.data?.status === 'paid' || data.data?.status === 'success')) {
        localOrder.status = 'paid';
        localOrder.paidAt = Date.now();
        writeDB(db);
      }
      return res.status(200).json({
        success: true,
        status: localOrder?.status || data.data?.status || 'unknown',
        austinStatus: data.data?.status,
        order: localOrder || null
      });
    } catch (error) {
      console.error('[Check Error]', error);
      return res.status(500).json({ success: false, message: error.message });
    }
  }

  // ─── CREATE DEPOSIT ───
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
      console.log('[Austin Create] Raw:', JSON.stringify(data, null, 2));

      if (!data.success) {
        return res.status(400).json({ success: false, message: data.message || 'Gagal membuat deposit' });
      }

      const tx = data.data || {};
      // Coba ambil QR dari berbagai kemungkinan field
      let qrImage = '';
      const possibleQrFields = ['qrImage', 'qr_url', 'qr_string', 'qr_code', 'qrUrl', 'qr_data', 'qrData', 'payment_url', 'checkout_url'];
      for (const f of possibleQrFields) {
        if (tx[f] && typeof tx[f] === 'string') { qrImage = tx[f]; break; }
      }
      // Kalau masih kosong, cek nested
      if (!qrImage && tx.payment?.qrImage) qrImage = tx.payment.qrImage;
      if (!qrImage && tx.qr?.image) qrImage = tx.qr.image;

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
        qrImage: qrImage,
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
        expiredAt: order.expiredAt,
        raw: tx // buat debug, bisa dihapus nanti
      });

    } catch (error) {
      console.error('[Create Error]', error);
      return res.status(500).json({ success: false, message: error.message || 'Server error' });
    }
  }

  // ─── WEBHOOK AUSTIN ───
  if (req.method === 'POST' && req.query.webhook === 'austin') {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-austinpay-signature'];
    const event = req.headers['x-austinpay-event'];
    db.logs.push({ t: Date.now(), event, body: rawBody.toString() });

    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }
    const payload = JSON.parse(rawBody);
    if (event === 'deposit.paid' && payload.data) {
      const ref = payload.data.transactionId || payload.data.merchant_ref || payload.data.reference;
      const order = db.orders.find(o => o.depositId === ref || o.id === ref);
      if (order && order.status !== 'paid') {
        order.status = 'paid'; order.paidAt = Date.now(); order.paymentData = payload.data;
        writeDB(db);
      }
    }
    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
