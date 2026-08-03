const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { q } = req.query;
  if (!q) return res.status(400).json({ status: false, message: 'Query required' });

  try {
    const apiUrl = `https://api.clutch.web.id/search/pinterest?apikey=${process.env.API_KEY}&q=${encodeURIComponent(q)}`;
    const response = await axios.get(apiUrl, { timeout: 30000 });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Pinterest Error]', error.message);
    res.status(500).json({ status: false, message: 'Failed to fetch Pinterest data', error: error.message });
  }
};