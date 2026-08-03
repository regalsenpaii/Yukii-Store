export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { title } = req.query;
  if (!title) return res.status(400).json({ error: 'Title parameter is required' });

  const apikey = process.env.REGAL_API_KEY;
  if (!apikey) {
    console.error('[Proxy] REGAL_API_KEY missing');
    return res.status(500).json({ error: 'REGAL_API_KEY not configured' });
  }

  try {
    const apiUrl = `https://api.clutch.web.id/search/spotify-lirik?apikey=${apikey}&title=${encodeURIComponent(title)}`;
    console.log('[Proxy] Lyrics request:', title);

    const response = await fetch(apiUrl, { 
      headers: { 'User-Agent': 'YukiStore/1.0' },
      signal: AbortSignal.timeout(15000)
    });

    const data = await response.json();
    console.log('[Proxy] Lyrics response keys:', Object.keys(data));
    res.status(200).json(data);
  } catch (error) {
    console.error('[Proxy] Lyrics exception:', error.message);
    res.status(500).json({ error: error.message });
  }
}
