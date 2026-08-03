export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { url } = req.query;
  if (!url) return res.status(400).json({ error: 'URL parameter is required' });

  const apikey = process.env.REGAL_API_KEY;
  if (!apikey) {
    console.error('[Proxy] REGAL_API_KEY missing in environment');
    return res.status(500).json({ error: 'REGAL_API_KEY not configured in environment variables' });
  }

  try {
    const apiUrl = `https://api.clutch.web.id/download/spotify?apikey=${apikey}&url=${encodeURIComponent(url)}`;
    console.log('[Proxy] Download request for:', url);

    const response = await fetch(apiUrl, { 
      headers: { 'User-Agent': 'YukiStore/1.0' },
      signal: AbortSignal.timeout(20000)
    });

    const data = await response.json();
    console.log('[Proxy] Download response keys:', Object.keys(data));
    res.status(200).json(data);
  } catch (error) {
    console.error('[Proxy] Download exception:', error.message);
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
