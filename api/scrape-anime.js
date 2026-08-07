import axios from 'axios';
import * as cheerio from 'cheerio';

const CACHE = new Map();
const CACHE_TTL = 1000 * 60 * 30; // 30 menit

function resolveUrl(src, base) {
  if (!src) return null;
  if (src.startsWith('http')) return src;
  if (src.startsWith('//')) return 'https:' + src;
  try { return new URL(src, base).href; } catch { return src; }
}

function getServerName(url, idx) {
  try {
    const host = new URL(url).hostname.replace(/^www\./, '');
    const parts = host.split('.');
    const name = parts[parts.length - 2] || host;
    return name.charAt(0).toUpperCase() + name.slice(1);
  } catch {
    return `Server ${idx + 1}`;
  }
}

async function fetchWithFallback(targetUrl) {
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36',
    'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
    'Accept-Language': 'en-US,en;q=0.9,id;q=0.8',
    'Referer': 'https://www.google.com/',
    'Upgrade-Insecure-Requests': '1'
  };

  // Layer 1: Direct
  try {
    const res = await axios.get(targetUrl, { headers, timeout: 15000, maxRedirects: 5 });
    if (res.status === 200 && res.data?.includes('</html>')) return { html: res.data, method: 'direct' };
  } catch (e) { console.log('[Direct]', e.message); }

  // Layer 2: allorigins
  try {
    const proxy = `https://api.allorigins.win/raw?url=${encodeURIComponent(targetUrl)}`;
    const res = await axios.get(proxy, { timeout: 20000 });
    if (res.status === 200 && res.data?.includes('</html>')) return { html: res.data, method: 'proxy1' };
  } catch (e) { console.log('[Proxy1]', e.message); }

  // Layer 3: corsproxy
  try {
    const proxy = `https://corsproxy.io/?${encodeURIComponent(targetUrl)}`;
    const res = await axios.get(proxy, { timeout: 20000 });
    if (res.status === 200 && res.data?.includes('</html>')) return { html: res.data, method: 'proxy2' };
  } catch (e) { console.log('[Proxy2]', e.message); }

  return { html: null, method: 'failed' };
}

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'GET') return res.status(405).json({ success: false, error: 'Method not allowed' });

  const { url } = req.query;
  if (!url) return res.status(400).json({ success: false, error: 'URL parameter wajib diisi' });

  let targetUrl;
  try {
    targetUrl = new URL(url).href;
  } catch {
    return res.status(400).json({ success: false, error: 'Format URL tidak valid' });
  }

  // Cache check
  const cached = CACHE.get(targetUrl);
  if (cached && Date.now() - cached.ts < CACHE_TTL) {
    return res.status(200).json({ success: true, data: cached.data, cached: true });
  }

  const { html, method } = await fetchWithFallback(targetUrl);

  if (!html) {
    return res.status(503).json({
      success: false,
      error: 'Cloudflare/anti-bot aktif. Gunakan mode Manual Embed.',
      cloudflare: true
    });
  }

  try {
    const $ = cheerio.load(html);
    const seen = new Set();
    const servers = [];

    const addServer = (raw) => {
      const u = resolveUrl(raw, targetUrl);
      if (!u || seen.has(u)) return;
      if (!u.match(/^https?:\/\//)) return;
      seen.add(u);
      servers.push({ serverName: getServerName(u, servers.length), streamUrl: u });
    };

    // === EXTRACT SERVERS ===
    // 1. iframe player
    $('iframe').each((_, el) => {
      addServer($(el).attr('src'));
      addServer($(el).attr('data-src'));
    });

    // 2. Common anime player containers
    $('.player iframe, #player iframe, .videoplayer iframe, .video-content iframe, .stream iframe').each((_, el) => {
      addServer($(el).attr('src'));
    });

    // 3. data attributes
    ['data-src', 'data-url', 'data-link', 'data-video', 'data-embed', 'data-file', 'data-stream'].forEach(attr => {
      $(`[${attr}]`).each((_, el) => addServer($(el).attr(attr)));
    });

    // 4. button/link server switching (common in anime sites)
    $('.server-item, .server, .mirror, .source, [data-server]').each((_, el) => {
      addServer($(el).attr('data-server'));
      addServer($(el).attr('data-src'));
      addServer($(el).attr('data-link'));
      const onclick = $(el).attr('onclick') || '';
      const m = onclick.match(/https?:\/\/[^"')]+/);
      if (m) addServer(m[0]);
    });

    // 5. scripts
    $('script').each((_, el) => {
      const text = $(el).html() || '';
      const rx = [
        /(?:src|url|file|source|videoUrl|embedUrl|playerUrl|streamUrl)\s*[:=]\s*["'](https?:\/\/[^"']+?)["']/gi,
        /["'](https?:\/\/[^"']*(?:embed|player|stream|video|watch|file)[^"']*?)["']/gi,
        /https?:\/\/[^\s"'<>]+/gi
      ];
      rx.forEach(pattern => {
        let m;
        while ((m = pattern.exec(text)) !== null) {
          const found = m[1] || m[0];
          if (found.length > 15 && /https?:\/\//.test(found)) addServer(found);
        }
      });
    });

    // === EXTRACT METADATA ===
    const title = $('h1.title, h1.entry-title, .title h1, h1').first().text().trim()
      || $('meta[property="og:title"]').attr('content')?.trim()
      || 'Unknown Anime';

    const poster = $('meta[property="og:image"]').attr('content')?.trim()
      || $('.poster img').attr('src')?.trim()
      || $('.thumb img').attr('src')?.trim()
      || $('img[alt*="poster"], img[alt*="anime"]').first().attr('src')?.trim()
      || '';

    const rating = $('.rating, .score, span[itemprop="ratingValue"]').first().text().trim() || '';

    const year = $('a[href*="/year/"], .year, .date, .aired').first().text().trim()
      || $('span[itemprop="datePublished"]').text().trim()
      || '';

    const genres = [];
    $('a[href*="/genre/"], .genre a, .genres a, span[itemprop="genre"]').each((_, el) => {
      const g = $(el).text().trim();
      if (g && !genres.includes(g)) genres.push(g);
    });

    const synopsis = $('meta[property="og:description"]').attr('content')?.trim()
      || $('.synopsis, .desc, .description, .entry-content p').first().text().trim()
      || '';

    // Filter servers: hanya yang mengandung kata video/embed/player (kurangi false positive)
    const filteredServers = servers.filter(s => 
      /embed|player|stream|video|watch|file|mega|yourupload|pdrain|desu|odstream|hihihi/.test(s.streamUrl.toLowerCase())
    );

    const result = {
      title,
      poster,
      rating,
      year,
      genres: genres.length ? genres : ['Anime'],
      synopsis,
      streamUrl: filteredServers[0]?.streamUrl || '',
      servers: filteredServers.slice(0, 15),
      scrapeMethod: method
    };

    CACHE.set(targetUrl, { data: result, ts: Date.now() });

    res.status(200).json({ success: true, data: result });

  } catch (err) {
    console.error('[Scrape Anime]', err);
    res.status(500).json({ success: false, error: err.message });
  }
}
