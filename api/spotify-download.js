export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ status: false, error: 'URL parameter is required' });

  const apikey = process.env.REGAL_API_KEY;
  if (!apikey) {
    console.error('[Proxy] REGAL_API_KEY missing');
    return res.status(500).json({ status: false, error: 'REGAL_API_KEY not configured' });
  }

  try {
    const apiUrl = `https://api.clutch.web.id/download/spotify?apikey=${apikey}&url=${encodeURIComponent(url)}`;
    console.log('[Proxy] Download request:', url);

    const response = await fetch(apiUrl, { 
      headers: { 'User-Agent': 'YukiStore/1.0' },
      signal: AbortSignal.timeout(30000)
    });

    const data = await response.json();
    console.log('[Proxy] Clutch response keys:', Object.keys(data));
    console.log('[Proxy] Result keys:', data.result ? Object.keys(data.result) : 'no result');

    // Pass through clutch response AS-IS (same as bot)
    res.status(200).json(data);
  } catch (error) {
    console.error('[Proxy] Download exception:', error.message);
    res.status(500).json({ status: false, error: error.message });
  }
}
