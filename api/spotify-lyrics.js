const axios = require('axios');

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ error: 'Method not allowed' });

  const { title } = req.query;
  if (!title) return res.status(400).json({ status: false, message: 'Title required' });

  try {
    const apiUrl = `https://api.clutch.web.id/search/spotify-lirik?apikey=${process.env.API_KEY}&title=${encodeURIComponent(title)}`;
    const response = await axios.get(apiUrl, { timeout: 15000 });
    res.status(200).json(response.data);
  } catch (error) {
    console.error('[Spotify Lyrics Error]', error.message);
    res.status(500).json({ status: false, message: 'Failed to fetch lyrics', error: error.message });
  }
};