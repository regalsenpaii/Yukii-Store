import crypto from 'crypto';
import { Agent, fetch as undiciFetch } from 'undici';

const AUSTIN_API_KEY = process.env.AUSTIN_API_KEY;
const AUSTIN_API_SECRET = process.env.AUSTIN_API_SECRET;
const AUSTIN_WEBHOOK_SECRET = process.env.AUSTIN_WEBHOOK_SECRET;
const AUSTIN_BASE = 'https://austinstore.id';
const BOT_POLL_KEY = process.env.BOT_POLL_KEY;

// Undici IPv4 agent (penting untuk Austin Pay)
const ipv4Agent = new Agent({ connect: { family: 4 } });

// ─── MEMORY DB ───
let memoryDB = { orders: [], logs: [] };
function readDB() { return memoryDB; }
function writeDB(db) { memoryDB = db; }
function verifyBotKey(req) { return req.query.botKey === BOT_POLL_KEY; }

// ─── HMAC SIGNER ───
function signAustinRequest(method, path, bodyStr) {
  const timestamp = Date.now().toString();
  const payload = `${method.toUpperCase()}\n${path}\n${bodyStr || ''}\n${timestamp}`;
  const signature = crypto.createHmac('sha256', AUSTIN_API_SECRET).update(payload).digest('hex');
  return { timestamp, signature };
}

// ─── FETCH DENGAN HMAC + APIKEY QUERY ───
async function austinFetchSigned(path, method, bodyObj) {
  const bodyStr = bodyObj ? JSON.stringify(bodyObj) : '';
  const { timestamp, signature } = signAustinRequest(method, path, bodyStr);
  
  const url = `${AUSTIN_BASE}${path}?apikey=${AUSTIN_API_KEY}`;
  const headers = {
    'Content-Type': 'application/json',
    'X-Timestamp': timestamp,
    'X-Signature': signature
  };

  const options = {
    method,
    headers,
    dispatcher: ipv4Agent
  };
  if (bodyStr) options.body = bodyStr;

  console.log(`[Austin] ${method} ${path}`);
  console.log(`[Austin] Payload: ${method.toUpperCase()}\\n${path}\\n${bodyStr || ''}\\n${timestamp}`);

  const res = await undiciFetch(url, options);
  const text = await res.text();
  
  console.log(`[Austin] Status: ${res.status}`);
  console.log(`[Austin] Body: ${text.substring(0, 500)}`);

  let json = null;
  try { json = JSON.parse(text); } catch {}
  
  return { status: res.status, text, json };
}

// ─── WEBHOOK SIGNATURE VERIFICATION ───
function verifyWebhookSignature(rawBody, signature) {
  if (!AUSTIN_WEBHOOK_SECRET) return true;
  const expected = crypto.createHmac('sha256', AUSTIN_WEBHOOK_SECRET).update(rawBody).digest('hex');
  try { return crypto.timingSafeEqual(Buffer.from(signature, 'hex'), Buffer.from(expected, 'hex')); }
  catch { return false; }
}

// ─── RAW BODY HELPER ───
async function getRawBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  return Buffer.concat(chunks);
}

export const config = { api: { bodyParser: false } };

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, X-Timestamp, X-Signature, X-AustinPay-Signature, X-AustinPay-Event');
  if (req.method === 'OPTIONS') return res.status(200).end();

  const db = readDB();

  // ═══════════════════════════════════════
  // 1. BOT POLLING
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'poll') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const pending = db.orders.filter(o => o.status === 'paid' && !o.processedByBot);
    return res.status(200).json({ success: true, count: pending.length, orders: pending });
  }

  // ═══════════════════════════════════════
  // 2. BOT CONFIRM
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'confirm') {
    if (!verifyBotKey(req)) return res.status(403).json({ success: false, message: 'Forbidden' });
    const order = db.orders.find(o => o.id === req.query.id);
    if (order) { order.processedByBot = true; order.processedAt = Date.now(); writeDB(db); }
    return res.status(200).json({ success: true });
  }

  // ═══════════════════════════════════════
  // 3. CHECK STATUS (GET /api/v2/deposit/check/:id)
  // ═══════════════════════════════════════
  if (req.method === 'GET' && req.query.action === 'check') {
    const depositId = req.query.id;
    if (!depositId) return res.status(400).json({ success: false, message: 'ID diperlukan' });

    const { status, json } = await austinFetchSigned(`/api/v2/deposit/check/${depositId}`, 'GET', null);

    if (!json || !json.success) {
      return res.status(500).json({ 
        success: false, 
        message: json?.message || 'Gagal cek status',
        raw: json
      });
    }

    const localOrder = db.orders.find(o => o.depositId === depositId || o.id === depositId);
    const austinStatus = json.data?.status || json.deposit?.status || 'unknown';
    
    if (localOrder && (austinStatus === 'paid' || austinStatus === 'success')) {
      localOrder.status = 'paid';
      localOrder.paidAt = Date.now();
      writeDB(db);
    }

    return res.status(200).json({
      success: true,
      status: localOrder?.status || austinStatus,
      austinStatus,
      order: localOrder || null
    });
  }

  // ═══════════════════════════════════════
  // 4. CREATE DEPOSIT (POST /api/v2/deposit/create)
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

    const bodyObj = {
      amount: amount,
      method: 'qris',
      merchant_ref: orderId,
      customer_name: nama,
      customer_email: `${cleanNomor}@yuki.store`,
      customer_phone: cleanNomor,
      description: `Sewa Bot ${duration} Bulan - ${nama}`
    };

    const { status, json } = await austinFetchSigned('/api/v2/deposit/create', 'POST', bodyObj);

    if (status !== 200 || !json || !json.success) {
      return res.status(500).json({
        success: false,
        message: json?.message || 'Gagal membuat deposit',
        hint: status === 403 ? 'IP/Signature ditolak. Cek API Key & Secret.' : 'Lihat log Vercel.',
        status
      });
    }

    const d = json.data || json.deposit || json;
    const depositId = d.transaction_id || d.transactionId || d.id || d.reference || orderId;
    
    // Parse QR dari semua kemungkinan field
    let qrImage = d.qr_image || d.qrImage || d.qrUrl || d.qr_url || d.qrCode || d.qr_code || '';
    let qrString = d.qr_string || d.qrString || d.qrCode || d.qr_code || '';
    
    // Cek nested
    if (!qrImage && d.payment?.qr_image) qrImage = d.payment.qr_image;
    if (!qrImage && d.payment?.qrImage) qrImage = d.payment.qrImage;
    if (!qrImage && d.qr?.image) qrImage = d.qr.image;
    if (!qrImage && d.qr?.url) qrImage = d.qr.url;

    const order = {
      id: orderId,
      nama,
      nomor: cleanNomor,
      groupLink,
      inviteCode: match[1],
      duration: parseInt(duration),
      amount,
      status: 'pending',
      depositId,
      qrImage,
      qrString,
      totalAmount: d.amount || d.totalAmount || amount,
      expiredAt: d.expired_at || d.expiredAt || Date.now() + (10 * 60 * 1000),
      processedByBot: false,
      createdAt: Date.now()
    };

    db.orders.push(order);
    writeDB(db);

    return res.status(200).json({
      success: true,
      depositId,
      id: order.id,
      qrImage,
      qrString,
      totalAmount: order.totalAmount,
      expiredAt: order.expiredAt
    });
  }

  // ═══════════════════════════════════════
  // 5. WEBHOOK CALLBACK (POST ?webhook=austin)
  // ═══════════════════════════════════════
  if (req.method === 'POST' && req.query.webhook === 'austin') {
    const rawBody = await getRawBody(req);
    const signature = req.headers['x-austinpay-signature'];
    const event = req.headers['x-austinpay-event'];

    console.log('[Webhook] Event:', event);
    db.logs.push({ t: Date.now(), event, body: rawBody.toString() });

    if (!verifyWebhookSignature(rawBody, signature)) {
      return res.status(401).json({ success: false, message: 'Invalid signature' });
    }

    const payload = JSON.parse(rawBody);
    if (event === 'deposit.paid' && payload.data) {
      const ref = payload.data.merchant_ref || payload.data.transactionId || payload.data.reference;
      const order = db.orders.find(o => o.depositId === ref || o.id === ref);
      if (order && order.status !== 'paid') {
        order.status = 'paid';
        order.paidAt = Date.now();
        order.paymentData = payload.data;
        writeDB(db);
        console.log(`[Webhook] Order ${order.id} PAID`);
      }
    }

    return res.status(200).json({ success: true });
  }

  return res.status(405).json({ success: false, message: 'Method not allowed' });
}
