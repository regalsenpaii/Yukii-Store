export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'Metode salah' });

    try {
        const { fileName, base64Content } = req.body;
        
        if (!fileName || !base64Content) {
            return res.status(400).json({ error: 'fileName dan base64Content wajib diisi' });
        }

        // Bersihin nama file biar aman
        const safeFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '');
        
        const token = process.env.REGAL_GITHUB_TOKEN;
        const owner = "regalsenpaii";
        const repo = "Yuki-san";

        const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/contents/${safeFileName}`, {
            method: 'PUT',
            headers: {
                "Authorization": `token ${token}`,
                "Accept": "application/vnd.github.v3+json",
                "Content-Type": "application/json",
                "User-Agent": "YukiStore-Upload-Proxy"
            },
            body: JSON.stringify({
                message: `Upload: ${safeFileName}`,
                content: base64Content
            })
        });

        if (!response.ok) {
            const errData = await response.json().catch(() => ({}));
            return res.status(500).json({ 
                error: 'Gagal upload ke GitHub', 
                status: response.status,
                details: errData.message || response.statusText 
            });
        }

        const data = await response.json();
        
        // ✅ PRIMARY: GitHub Raw URL — langsung bisa diakses, ga perlu redeploy!
        const githubRawUrl = data.content?.download_url 
            || `https://raw.githubusercontent.com/${owner}/${repo}/main/${safeFileName}`;
        
        // Fallback: Vercel URL (dynamic sesuai domain project)
        const host = req.headers.host || 'yuki-regal.vercel.app';
        const protocol = req.headers['x-forwarded-proto'] || 'https';
        const vercelUrl = `${protocol}://${host}/${safeFileName}`;

        return res.status(200).json({ 
            success: true, 
            download_url: githubRawUrl,   // ⬅️ Sekarang gambar langsung muncul!
            vercel_url: vercelUrl,        // Link Vercel (setelah redeploy)
            github_url: data.html_url,    // Link ke file di GitHub
            file_name: safeFileName
        });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}
