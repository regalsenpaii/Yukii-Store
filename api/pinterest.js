export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');

  if (req.method === 'OPTIONS') return res.status(200).end();

  const { q } = req.query;
  if (!q) return res.status(400).json({ error: 'Query parameter (q) is required' });

  const apikey = process.env.REGAL_API_KEY;
  if (!apikey) return res.status(500).json({ error: 'REGAL_API_KEY not configured in environment variables' });

  try {
    const apiUrl = `https://api.clutch.web.id/search/pinterest?apikey=${apikey}&q=${encodeURIComponent(q)}`;
    const response = await fetch(apiUrl, { headers: { 'User-Agent': 'YukiStore/1.0' } });
    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: error.message || 'Internal server error' });
  }
}
