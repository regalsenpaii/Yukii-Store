/* =========================================================================
   YUKI STORE v4.0 - MULTI-PAGE SCRIPT
   Theme Sync, Spotify Lyrics, Pinterest Grid, Invoice & Upload
   ========================================================================= */

// --- 1. CORE & API CONFIGURATION ---
const API_PROXY = {
    spotifySearch: '/api/spotify-search',
    spotifyDownload: '/api/spotify-download',
    spotifyLyrics: '/api/spotify-lyrics',
    pinterest: '/api/pinterest'
};

// --- 2. SVG LOGOS & ICONS ---
const SPOTIFY_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" width="18" height="18"><path fill="#1DB954" d="M84 0C37.8 0 0 37.8 0 84s37.8 84 84 84 84-37.8 84-84S130.2 0 84 0zm38.5 121.2c-1.5 2.5-4.7 3.2-7.1 1.7-19.5-11.9-44.1-14.6-73-8-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.6-7.2 58.7-4.1 80.3 9.2 2.4 1.4 3.1 4.6 1.7 7.1zm10.3-22.9c-1.9 3-5.9 4-8.9 2.1-22.3-13.7-56.3-17.7-82.7-9.7-3.4 1-7-1-8-4.4s1-7 4.4-8c30.2-9.2 67.7-4.7 92.9 11.1 3.1 1.8 4.1 5.8 2.2 8.9zm.9-23.8c-26.8-15.9-71-17.4-96.5-9.6-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.3-8.9 78.1-7.2 108.7 11.1 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.6-6.9 4.9-10.5 2.7z"/></svg>`;
const PINTEREST_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#E60023" d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.5 7.6 11.2-.1-1-.3-2.6.1-3.7.3-.8 1.7-5.4 1.7-5.4s-.4-.9-.4-2.1c0-2 1.2-3.5 2.6-3.5 1.2 0 1.8.9 1.8 2 0 1.2-.8 3-1.2 4.7-.3 1.4.7 2.5 2 2.5 2.4 0 4.2-2.5 4.2-6.1 0-3.2-2.3-5.4-5.5-5.4-3.8 0-6 2.8-6 5.7 0 1.1.4 2.3.9 3 .1.2.2.3.1.5l-.3 1.1c0 .2-.1.2-.3.1-1.2-.5-2-2.3-2-3.7 0-3 2.5-6.6 7.5-6.6 4 0 7.1 2.9 7.1 6.7 0 4.1-2.6 7.4-6.1 7.4-1.2 0-2.3-.6-2.7-1.3l-.7 2.8c-.3 1.1-1 2.5-1.5 3.3C9.5 23.8 10.7 24 12 24c6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>`;

const IC_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="0"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const IC_PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="0"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
const IC_CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const IC_INFO = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`;
const IC_CLOCK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const IC_MUSIC = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
const IC_DISC = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
const IC_EXTERNAL = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const IC_LYRICS = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 12h.01"/><path d="M15 12h.01"/><path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5"/><path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1"/></svg>`;
const IC_DOWNLOAD = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;

// --- 3. DATA PRODUCTS ---
const panelProducts = [
    { id: 1, name: 'Panel 1GB', price: 2000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '1GB' },
    { id: 2, name: 'Panel 2GB', price: 3000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '2GB' },
    { id: 3, name: 'Panel 3GB', price: 4000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '3GB' },
    { id: 4, name: 'Panel 4GB', price: 5000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '4GB' },
    { id: 5, name: 'Panel 5GB', price: 6000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '5GB' },
    { id: 6, name: 'Panel 6GB', price: 7000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '6GB' },
    { id: 7, name: 'Panel 7GB', price: 8000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '7GB' },
    { id: 8, name: 'Panel 8GB', price: 9000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '8GB' },
    { id: 9, name: 'Panel 9GB', price: 10000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '9GB' },
    { id: 10, name: 'Panel 10GB', price: 11000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: '10GB' },
    { id: 11, name: 'Panel UNLIMITED', price: 25000, specs: 'VPS R18 C4 \u2022 Aktif 30 Hari', ram: 'UNLIMITED' },
];

// --- 4. GLOBAL APP STATES ---
let currentModalProduct = { name: '', price: 0 };
let isPlaying = false;
let currentAudioUrl = '';
let currentTrackData = null;
let lastKickTime = 0;
let kickEnergy = 0;
let kickDecay = 0.92;
let audioCtx = null;
let analyser = null;
let source = null;
let dataArray = null;
let vizFrameId = null;
let audioErrorFired = false;

const trackDataMap = new Map();

// --- 5. UTILITIES ---
function formatRupiah(price) {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDuration(input) {
    if (!input && input !== 0) return '0:00';
    if (typeof input === 'string') {
        const t = input.trim();
        if (/^\d{1,2}:\d{2}$/.test(t)) return t;
        const n = parseInt(t, 10);
        if (!isNaN(n)) input = n; else return '0:00';
    }
    if (typeof input === 'number') {
        if (isNaN(input) || input <= 0) return '0:00';
        let s = input > 10000 ? Math.floor(input / 1000) : Math.floor(input);
        const m = Math.floor(s / 60), sec = s % 60;
        return m + ':' + (sec < 10 ? '0' : '') + sec;
    }
    return '0:00';
}

function initIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function isPage(name) {
    return window.location.pathname.includes(name);
}

function copySpotifyLink(trackUrl) {
    if (!trackUrl) {
        showToast('Error', 'Link Spotify tidak tersedia untuk lagu ini.', 'error');
        return;
    }

    navigator.clipboard.writeText(trackUrl).then(() => {
        showToast('Sukses', 'Link Spotify berhasil disalin!', 'success');
    }).catch(err => {
        // Fallback jika browser memblokir clipboard API
        const textArea = document.createElement("textarea");
        textArea.value = trackUrl;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            showToast('Sukses', 'Link Spotify berhasil disalin!', 'success');
        } catch (e) {
            showToast('Error', 'Gagal menyalin link.', 'error');
        }
        document.body.removeChild(textArea);
    });
}


function extractDownloadResult(data) {
    if (!data || typeof data !== 'object') return null;
    let raw = data.result !== undefined ? data.result : (data.data !== undefined ? data.data : data);
    if (Array.isArray(raw) && raw.length > 0) raw = raw[0];
    if (!raw || typeof raw !== 'object') return null;
    return raw;
}
function normalizeDownloadResult(raw) {
    if (!raw || typeof raw !== 'object') return {};
    
    // Image extraction
    let image = raw.image || raw.thumbnail || raw.thumb || raw.cover || raw.artwork || raw.artworkUrl || raw.artwork_url || raw.picture || raw.img || '';
    if (!image && raw.album && typeof raw.album === 'object') {
        image = raw.album.image || raw.album.cover || raw.album.thumbnail || raw.album.artwork || '';
        if (!image && raw.album.images && raw.album.images[0]) {
            image = typeof raw.album.images[0] === 'string' ? raw.album.images[0] : raw.album.images[0].url;
        }
    }
    
    // === FIX DURATION: tambah banyak fallback field ===
    let duration = raw.duration || raw.duration_ms || raw.durationMs || raw.length || raw.trackDuration || raw.time || raw.timelength || raw.durationText || raw.total_time || raw.play_time || raw.durasi || '0:00';
    
    // Kalau duration object (misal {minutes: 4, seconds: 21})
    if (typeof duration === 'object' && duration !== null) {
        const m = duration.minutes || 0;
        const s = duration.seconds || 0;
        duration = m + ':' + (s < 10 ? '0' : '') + s;
    }
    
    // Kalau number, format jadi mm:ss
    if (typeof duration === 'number') {
        duration = formatDuration(duration);
    }
    
    // Kalau string tapi bukan format mm:ss (misal "261" detik atau "261000" ms)
    if (typeof duration === 'string') {
        const trimmed = duration.trim();
        // Sudah format mm:ss atau hh:mm:ss
        if (/^\d{1,2}:\d{2}$/.test(trimmed) || /^\d{1,2}:\d{2}:\d{2}$/.test(trimmed)) {
            duration = trimmed;
        } else {
            // Coba parse sebagai angka
            const num = parseInt(trimmed, 10);
            if (!isNaN(num) && num > 0) {
                duration = formatDuration(num);
            } else {
                duration = '0:00';
            }
        }
    }
    
    let download = raw.download || raw.url || raw.link || raw.audio || raw.audio_url || raw.file || raw.direct || raw.downloadUrl || raw.download_url || '';
    if (!download && raw.formats && Array.isArray(raw.formats) && raw.formats[0]) {
        download = raw.formats[0].url || raw.formats[0].download || '';
    }
    
    return {
        title: raw.title || raw.name || raw.trackName || raw.track || 'Unknown',
        artist: raw.artist || raw.artists || raw.artistName || raw.artist_name || 'Unknown',
        album: raw.album || raw.collectionName || raw.albumName || raw.album_name || '-',
        image: image,
        duration: duration,
        download: download
    };
}

// --- ANIMASI BRAND YUKI STORE (EFEK SAPU OMBAK & FALL FROM TOP) ---
function attachYukiWaveAnimation(containerId, textId) {
    const brandContainer = document.getElementById(containerId);
    const brandText = document.getElementById(textId);
    const brandIcon = brandContainer ? brandContainer.querySelector('.brand-icon') : null;

    if (!brandContainer || !brandText) return;

    let isAnimating = false;

    // Pecah teks YUKI STORE menjadi span per huruf secara otomatis
    const textContent = brandText.textContent.trim();
    brandText.innerHTML = '';
    
    const letterSpans = [];
    [...textContent].forEach((char) => {
        const span = document.createElement('span');
        span.className = 'yuki-wave-letter';
        // Menjaga spasi agar tidak runtuh
        if (char === ' ') {
            span.innerHTML = '&nbsp;';
        } else {
            span.textContent = char;
        }
        brandText.appendChild(span);
        letterSpans.push(span);
    });

    brandContainer.addEventListener('click', () => {
        if (isAnimating) return; // Mencegah spam klik berlebihan
        isAnimating = true;

        // Trigger animasi bounce pada icon
        if (brandIcon) {
            brandIcon.classList.remove('brand-icon-active');
            void brandIcon.offsetWidth;
            brandIcon.classList.add('brand-icon-active');
        }

        // 1. Fase Sapu Ombak (Hilang ke bawah berurutan)
        letterSpans.forEach((span, index) => {
            setTimeout(() => {
                span.className = 'yuki-wave-letter yuki-wave-out';
            }, index * 35); // Delay 35ms per huruf untuk efek ombak
        });

        // Total durasi fase 1
        const waveOutDuration = (letterSpans.length * 35) + 300;

        // 2. Fase Jatuh dari Atas (Re-appear dari atas secara berurutan)
        setTimeout(() => {
            letterSpans.forEach((span, index) => {
                setTimeout(() => {
                    span.className = 'yuki-wave-letter yuki-wave-in';
                }, index * 40); // Delay muncul berurutan dari kiri ke kanan
            });

            // Clean up class setelah semua animasi selesai
            const totalDuration = (letterSpans.length * 40) + 500;
            setTimeout(() => {
                letterSpans.forEach(span => {
                    span.className = 'yuki-wave-letter';
                });
                if (brandIcon) brandIcon.classList.remove('brand-icon-active');
                isAnimating = false;
            }, totalDuration);

        }, waveOutDuration);
    });
}

// Fungsi Panggil Utama
function initYukiBrandAnimation() {
    // Jalankan untuk Mobile Header
    attachYukiWaveAnimation('mobile-brand-click', 'yuki-mobile-text');
    // Jalankan untuk Sidebar Desktop
    attachYukiWaveAnimation('sidebar-brand-click', 'yuki-brand-text');
}

// Jalankan saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    initYukiBrandAnimation();
});

// --- THEME SWITCHER LOGIC ---
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const htmlEl = document.documentElement;

    // Ambil tema tersimpan (default 'dark')
    const savedTheme = localStorage.getItem('yuki_theme') || 'dark';

    function applyTheme(theme) {
        if (theme === 'dark') {
            htmlEl.classList.add('dark');
            htmlEl.setAttribute('data-theme', 'dark');
        } else {
            htmlEl.classList.remove('dark');
            htmlEl.setAttribute('data-theme', 'light');
        }
        localStorage.setItem('yuki_theme', theme);
    }

    // Jalankan pertama kali
    applyTheme(savedTheme);

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            const isDark = htmlEl.classList.contains('dark') || htmlEl.getAttribute('data-theme') === 'dark';
            const newTheme = isDark ? 'light' : 'dark';

            // Cukup ubah class/attribute HTML, CSS yang akan mengeksekusi animasi
            applyTheme(newTheme);
        });
    }
}


// --- 7. SIDEBAR MOBILE ---
function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');

    function openSidebar() {
        if (sidebar) sidebar.classList.add('open');
        if (overlay) overlay.classList.remove('hidden');
        if (menuToggle) menuToggle.classList.add('open'); // Menggunakan kelas 'open' untuk animasi garis
    }

    function closeSidebar() {
        if (sidebar) sidebar.classList.remove('open');
        if (overlay) overlay.classList.add('hidden');
        if (menuToggle) menuToggle.classList.remove('open'); // Menghapus kelas 'open'
    }

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            if (sidebar && sidebar.classList.contains('open')) {
                closeSidebar();
            } else {
                openSidebar();
            }
        });
    }

    if (overlay) {
        overlay.addEventListener('click', closeSidebar);
    }

    // Swipe to close sidebar
    let touchStartX = 0;
    let touchEndX = 0;

    if (sidebar) {
        sidebar.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        sidebar.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            if (touchStartX - touchEndX > 80) { // Swipe left > 80px
                closeSidebar();
            }
        }, { passive: true });
    }

    // Swipe from edge to open
    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        if (touchEndX - touchStartX > 80 && touchStartX < 30) { // Swipe right from edge
            openSidebar();
        }
    }, { passive: true });
}

// --- 8. PRODUCT RENDERING ---
function renderPanelProducts() {
    const grid = document.getElementById('panel-grid');
    if (!grid) return;
    grid.innerHTML = panelProducts.map(product => {
        const isPopular = product.ram === 'UNLIMITED' || product.ram === '10GB';
        return `
            <div class="glass-card group p-5 relative">
                ${isPopular ? `<div class="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-gradient-to-r from-amber-400 to-orange-500 text-white text-[10px] font-bold shadow-md">POPULAR</div>` : ''}
                <div class="flex items-center gap-3 mb-3">
                    <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center shadow-md shadow-blue-100">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white"><rect width="20" height="8" x="2" y="2" rx="2" ry="2"/><rect width="20" height="8" x="2" y="14" rx="2" ry="2"/><line x1="6" x2="6.01" y1="6" y2="6"/><line x1="6" x2="6.01" y1="18" y2="18"/></svg>
                    </div>
                    <div>
                        <h3 class="font-bold text-[var(--text-primary)] text-sm">${product.name}</h3>
                        <p class="text-[10px] text-[var(--text-muted)]">${product.specs}</p>
                    </div>
                </div>
                <div class="flex items-end justify-between mb-4">
                    <div><p class="text-[10px] text-[var(--text-muted)] mb-0.5">Harga</p><p class="text-lg font-bold text-blue-600">${formatRupiah(product.price)}</p></div>
                    <div class="text-right"><p class="text-[10px] text-[var(--text-muted)] mb-0.5">RAM</p><p class="text-sm font-semibold text-[var(--text-secondary)]">${product.ram}</p></div>
                </div>
                <button onclick="openModal('${product.name}', ${product.price})" class="btn-primary w-full text-xs">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="8" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/></svg>
                    Beli Sekarang
                </button>
            </div>
        `;
    }).join('');
    initIcons();
}

// --- 9. MODAL & INVOICE ---
function openModal(productName, price) {
    currentModalProduct = { name: productName, price: price };
    const modal = document.getElementById('invoice-modal');
    const nameEl = document.getElementById('modal-product-name');
    const priceEl = document.getElementById('modal-product-price');
    if (nameEl) nameEl.textContent = productName;
    if (priceEl) priceEl.textContent = formatRupiah(price);
    if (modal) {
        modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    const form = document.getElementById('invoice-form');
    if (form) form.reset();
    const fileLabel = document.getElementById('file-label');
    if (fileLabel) fileLabel.textContent = 'Klik untuk upload bukti transfer';
    const preview = document.getElementById('file-preview');
    if (preview) preview.classList.add('hidden');
    setTimeout(initIcons, 50);
}

function closeModal() {
    const modal = document.getElementById('invoice-modal');
    if (modal) modal.classList.remove('active');
    document.body.style.overflow = '';
}

function handleFileSelect(input) {
    const file = input.files[0];
    const label = document.getElementById('file-label');
    const preview = document.getElementById('file-preview');
    if (file) {
        if (label) label.textContent = file.name;
        const reader = new FileReader();
        reader.onload = (e) => {
            if (preview) {
                preview.src = e.target.result;
                preview.classList.remove('hidden');
            }
        };
        reader.readAsDataURL(file);
    } else {
        if (label) label.textContent = 'Klik untuk upload bukti transfer';
        if (preview) preview.classList.add('hidden');
    }
}

// --- 10. CDN UPLOAD ---
async function uploadToMyCDNYuki(file) {
    return new Promise((resolve) => {
        if (!file) return resolve(null);
        const reader = new FileReader();
        reader.onload = async () => {
            try {
                const base64Content = reader.result.split(',')[1];
                const timestamp = Date.now();
                const randomStr = Math.random().toString(36).substring(2, 8);
                const fileExt = file.name.split('.').pop() || 'jpg';
                const fileName = `Yuki${timestamp}_${randomStr}.${fileExt}`;
                const response = await fetch('/api/upload', {
                    method: 'POST',
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ fileName, base64Content })
                });
                if (!response.ok) throw new Error('Server error: ' + response.status);
                const resData = await response.json();
                resolve(resData.download_url);
            } catch (e) {
                console.error('[Proxy API] Gagal:', e.message);
                resolve(null);
            }
        };
        reader.onerror = () => resolve(null);
        reader.readAsDataURL(file);
    });
}

// --- 11. INVOICE FORM ---
function initInvoiceForm() {
    const form = document.getElementById('invoice-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const buyerName = document.getElementById('buyer-name').value.trim();
        const buyerWa = document.getElementById('buyer-wa').value.trim();
        const proofFile = document.getElementById('buyer-proof').files[0];
        if (!buyerName) { showToast('Error', 'Nama pembeli wajib diisi!', 'error'); return; }
        if (!buyerWa) { showToast('Error', 'Nomor WhatsApp wajib diisi!', 'error'); return; }
        if (!proofFile) { showToast('Error', 'Silakan upload bukti transfer!', 'error'); return; }
        if (proofFile.size > 5 * 1024 * 1024) {
            showToast('Error', 'Ukuran gambar terlalu besar! Maksimal 5MB.', 'error');
            return;
        }
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn ? submitBtn.innerHTML : 'Kirim Bukti Pembayaran';
        if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '⏳ Memproses...'; }
        showToast('Proses', 'Sedang mengunggah bukti transfer...', 'success');
        let cdnLink = null;
        let uploadError = null;
        try { cdnLink = await uploadToMyCDNYuki(proofFile); }
        catch (cdnError) { uploadError = cdnError.message; }
        let textMessage = '🛒 *ORDER BARU - YUKI STORE*\n\n' +
                          '📦 *Produk:* ' + currentModalProduct.name + '\n' +
                          '💰 *Harga:* ' + formatRupiah(currentModalProduct.price) + '\n' +
                          '👤 *Nama:* ' + buyerName + '\n' +
                          '📱 *WhatsApp:* ' + buyerWa + '\n\n';
        if (cdnLink) {
            textMessage += '🖼️ *BUKTI TRANSFER:*\n' + cdnLink + '\n\n✅ *Bukti berhasil dihost di CDN.*';
        } else {
            textMessage += '⚠️ *BUKTI TRANSFER:*\n_(Upload otomatis gagal: ' + (uploadError || 'Network/Auth') + ')_\nMohon lampirkan bukti transfer langsung di chat ini ya kak!';
        }
        textMessage += '\n\nMohon segera diproses ya kak! 🙏';
        const phone = '6288246387665';
        const encodedText = encodeURIComponent(textMessage);
        const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
        if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalBtnText; }
        closeModal();
        if (isMobile) {
            const deepLink = `whatsapp://send?phone=${phone}&text=${encodedText}`;
            window.location.href = deepLink;
            setTimeout(() => {
                if (document.hidden) return;
                window.location.href = `https://api.whatsapp.com/send?phone=${phone}&text=${encodedText}`;
            }, 2000);
        } else {
            window.open(`https://web.whatsapp.com/send?phone=${phone}&text=${encodedText}`, '_blank');
        }
    });
}

function showToast(title, message, type = 'success') {
    const toast = document.getElementById('toast');
    const toastTitle = document.getElementById('toast-title');
    const toastMessage = document.getElementById('toast-message');
    const toastIcon = document.getElementById('toast-icon');
    if (!toast) return;
    toastTitle.textContent = title;
    toastMessage.textContent = message;
    if (type === 'error') {
        toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-500"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg>';
        toastIcon.className = 'w-8 h-8 rounded-full bg-red-50 flex items-center justify-center flex-shrink-0';
    } else {
        toastIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-emerald-500"><polyline points="20 6 9 17 4 12"/></svg>';
        toastIcon.className = 'w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0';
    }
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 4000);
}

// --- 12. SPOTIFY: SEARCH & LYRICS ---
function initSpotify() {
    const form = document.getElementById('spotify-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const q = document.getElementById('spotify-query').value.trim();
        if (!q) return;
        await searchSpotify(q);
    });

    // Download by URL form → Show info modal first
    const dlForm = document.getElementById('spotify-dl-form');
    if (dlForm) {
        dlForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const url = document.getElementById('spotify-url').value.trim();
            if (!url) return;
            if (!url.includes('spotify.com')) {
                showToast('Error', 'URL harus dari Spotify!', 'error');
                return;
            }
            const submitBtn = dlForm.querySelector('button[type="submit"]');
            const originalText = submitBtn ? submitBtn.innerHTML : 'Unduh';
            if (submitBtn) { submitBtn.disabled = true; submitBtn.innerHTML = '⏳'; }
            showToast('Proses', 'Mengambil info lagu...', 'success');

            try {
                const res = await fetch(`${API_PROXY.spotifyDownload}?url=${encodeURIComponent(url)}`);
                const data = await res.json();

                if (!data.status || !data.result) {
                    showToast('Error', 'Gagal mengambil info lagu.', 'error');
                    return;
                }

                // Show info modal with download button
                const result = data.result;
                showDownloadInfoModal(result, url);

            } catch (e) {
                console.error('[DL Form] Error:', e);
                showToast('Error', 'Gagal: ' + e.message, 'error');
            } finally {
                if (submitBtn) { submitBtn.disabled = false; submitBtn.innerHTML = originalText; }
            }
        });
    }
}

async function searchSpotify(query) {
    const loading = document.getElementById('spotify-loading');
    const results = document.getElementById('spotify-results');
    const empty = document.getElementById('spotify-empty');
    if (loading) loading.classList.remove('hidden');
    if (results) results.innerHTML = '';
    if (empty) empty.classList.add('hidden');

    let tracks = [];

    try {
        console.log('[Spotify] Searching via proxy:', query);
        const res = await fetch(`${API_PROXY.spotifySearch}?q=${encodeURIComponent(query)}`);
        console.log('[Spotify] Proxy status:', res.status);

        if (!res.ok) {
            const errText = await res.text();
            console.error('[Spotify] Proxy error:', errText.slice(0, 200));
            throw new Error('Proxy HTTP ' + res.status);
        }

        const data = await res.json();
        let rawTracks = data?.data || data?.result || data?.results || (Array.isArray(data) ? data : []);
        if (!Array.isArray(rawTracks) && data?.data?.tracks) rawTracks = data.data.tracks;
        if (!Array.isArray(rawTracks) && data?.result?.tracks) rawTracks = data.result.tracks;

        console.log('[Spotify] Raw tracks count:', rawTracks.length);

        if (rawTracks.length) {
            tracks = rawTracks.slice(0, 5).map((item, idx) => {
                if (!item || typeof item !== 'object') return null;
                const title = item.title || item.name || item.trackName || item.track || 'Unknown';
                const artist = item.artist || item.artists || item.artistName || item.artist_name || 'Unknown';
                const album = item.album || item.collectionName || item.albumName || item.album_name || '-';
                let image = item.image || item.thumbnail || item.cover || item.artworkUrl || item.artwork || '';
                if (!image && item.album && typeof item.album === 'object') image = item.album.cover || item.album.image || item.album.thumbnail || '';
                let thumb = item.thumbnail || item.image || item.cover || item.artworkUrl || item.artwork || '';
                if (!thumb && item.album && typeof item.album === 'object') thumb = item.album.thumbnail || item.album.image || item.album.cover || '';
                let trackUrl = item.url || item.external_url || item.spotify_url || item.link || '';
                if (!trackUrl && item.external_urls) trackUrl = item.external_urls.spotify || '';
                let durRaw = item.duration_ms || item.durationMs || item.duration || item.trackDuration || 0;
                let durationStr = '0:00';
                if (typeof durRaw === 'string' && durRaw.includes(':')) durationStr = durRaw;
                else durationStr = formatDuration(durRaw);
                const genre = item.genre || item.primaryGenreName || 'Music';
                console.log(`[Spotify] Track ${idx}: "${title}" | dur: ${durationStr} | trackUrl: ${trackUrl ? 'YES' : 'NO'}`);
                return { title, artist, album, image, thumb, trackUrl, duration: durationStr, durationMs: typeof durRaw === 'number' ? durRaw : 0, genre };
            }).filter(Boolean);
        }
    } catch (e) { 
        console.error('[Spotify] Search failed:', e.message);
        if (loading) loading.classList.add('hidden');
        if (results) results.innerHTML = errorHTML('Gagal mencari lagu: ' + e.message);
        return;
    }

    if (loading) loading.classList.add('hidden');
    if (!tracks.length) {
        if (results) results.innerHTML = errorHTML('Tidak ada hasil untuk "' + query + '"');
        return;
    }

    if (results) {
        results.innerHTML = `<div class="track-list">` + tracks.map((track) => {
            const tjson = encodeURIComponent(JSON.stringify(track));
            return `
                <div class="track-row" data-track='${tjson}'>
                    <img class="track-thumb" src="${track.thumb || track.image || ''}" alt="" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300/e2e8f0/94a3b8?text=Music'">
                    <div class="track-info">
                        <div class="track-title" title="${track.title}">${track.title}</div>
                        <div class="track-artist">${track.artist}</div>
                        <div class="track-meta-row">
                            <span class="track-meta">${IC_CLOCK} ${track.duration}</span>
                            <span class="track-meta">${IC_DISC} ${track.album}</span>
                        </div>
                    </div>
                    <div class="track-actions">
                        <button class="btn-play-sm" onclick="event.stopPropagation(); fetchAndPlayTrack('${tjson}')" title="Putar">
                            ${IC_PLAY}
                        </button>
                        <button class="btn-lyric-sm" onclick="event.stopPropagation(); openLyricsModal('${tjson}')" title="Lihat Lirik">
                            ${IC_LYRICS} Lirik
                        </button>
                        <button class="btn-copy-sm" onclick="event.stopPropagation(); copySpotifyLink('${track.trackUrl}')" title="Salin Link Spotify">
                            ${IC_EXTERNAL} Salin Link
                        </button>
                        <button class="btn-dl-sm" onclick="event.stopPropagation(); openTrackDetailModal('${tjson}')" title="Detail & Download">
                            ${IC_INFO} Info
                        </button>
                    </div>
                </div>
            `;
        }).join('') + `</div>`;
    }

}

// --- 12b. LYRICS MODAL ---
async function openLyricsModal(trackJson) {
    let track;
    try { track = JSON.parse(decodeURIComponent(trackJson)); }
    catch (e) { return; }

    let modal = document.getElementById('lyrics-modal');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'lyrics-modal';
        modal.className = 'modal-overlay lyrics-modal';
        modal.innerHTML = `
            <div class="modal-backdrop" onclick="closeLyricsModal()"></div>
            <div class="modal-content">
                <div class="lyrics-header">
                    <img id="lyrics-cover" class="lyrics-cover" src="" alt="Cover">
                    <div>
                        <div id="lyrics-title" class="lyrics-title"></div>
                        <div id="lyrics-artist" class="lyrics-artist"></div>
                    </div>
                    <button onclick="closeLyricsModal()" style="margin-left:auto;background:none;border:none;cursor:pointer;color:var(--text-muted);">${IC_CLOSE}</button>
                </div>
                <div id="lyrics-body" class="lyrics-content">Memuat lirik...</div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('lyrics-cover').src = track.thumb || track.image || '';
    document.getElementById('lyrics-title').textContent = track.title || 'Unknown';
    document.getElementById('lyrics-artist').textContent = track.artist || 'Unknown';
    document.getElementById('lyrics-body').textContent = 'Memuat lirik...';
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    try {
        const query = encodeURIComponent(track.title + ' ' + track.artist);
        console.log('[Lyrics] Requesting:', track.title, '-', track.artist);
        const res = await fetch(`${API_PROXY.spotifyLyrics}?title=${query}`);
        console.log('[Lyrics] Proxy status:', res.status);

        if (res.ok) {
            const data = await res.json();
            console.log('[Lyrics] Response keys:', Object.keys(data));

            let cleanLyrics = '';
            if (data?.result?.plainLyrics && typeof data.result.plainLyrics === 'string') {
                cleanLyrics = data.result.plainLyrics.trim();
            } else if (data?.result && typeof data.result === 'string') {
                cleanLyrics = data.result.trim();
            } else if (data?.plainLyrics && typeof data.plainLyrics === 'string') {
                cleanLyrics = data.plainLyrics.trim();
            } else if (data?.lyrics && typeof data.lyrics === 'string') {
                cleanLyrics = data.lyrics.trim();
            }

            // Extract from lyricsfile YAML if present
            if (!cleanLyrics && data?.result?.lyricsfile && typeof data.result.lyricsfile === 'string') {
                const lf = data.result.lyricsfile;
                const lines = lf.split('\n');
                let inPlain = false;
                const plainLines = [];
                for (const line of lines) {
                    if (line.trim() === 'plain: |-' || line.trim() === 'plain: |') {
                        inPlain = true;
                        continue;
                    }
                    if (inPlain) {
                        if (line.match(/^\w+:/)) break;
                        plainLines.push(line);
                    }
                }
                if (plainLines.length) cleanLyrics = plainLines.join('\n').trim();
            }

            // Last resort: find any long string in result object
            if (!cleanLyrics && data?.result && typeof data.result === 'object') {
                for (const key in data.result) {
                    const val = data.result[key];
                    if (typeof val === 'string' && val.length > 100 && !val.includes('version:') && !val.includes('metadata:')) {
                        cleanLyrics = val.trim();
                        break;
                    }
                }
            }

            if (cleanLyrics) {
                document.getElementById('lyrics-body').textContent = cleanLyrics;
            } else {
                document.getElementById('lyrics-body').textContent = 'Lirik tidak ditemukan untuk lagu ini.';
            }
        } else {
            const errText = await res.text();
            console.error('[Lyrics] Proxy error:', errText.slice(0, 300));
            document.getElementById('lyrics-body').textContent = 'Gagal memuat lirik. Status: ' + res.status;
        }
    } catch (e) {
        console.error('[Lyrics] Error:', e.message);
        document.getElementById('lyrics-body').textContent = 'Gagal memuat lirik. Error: ' + e.message;
    }
}

function closeLyricsModal() {
    const modal = document.getElementById('lyrics-modal');
    if (modal) modal.classList.remove('active');
    if (!document.getElementById('invoice-modal')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// --- 12c. TRACK DETAIL ---
async function fetchAndPlayTrack(enc) {
    let track;
    try { track = JSON.parse(decodeURIComponent(enc)); }
    catch (e) { console.error('[Play] Parse error:', e); return; }

    if (!track.trackUrl) {
        showToast('Error', 'URL Spotify tidak tersedia untuk lagu ini.', 'error');
        return;
    }

    showToast('Proses', 'Mengambil audio...', 'success');
    console.log('[Play] Fetching download for trackUrl:', track.trackUrl);

    try {
        const res = await fetch(`${API_PROXY.spotifyDownload}?url=${encodeURIComponent(track.trackUrl)}`);
        console.log('[Play] Download proxy status:', res.status);

        if (!res.ok) {
            const err = await res.text();
            console.error('[Play] Download error:', err.slice(0, 300));
            showToast('Error', 'Gagal mengambil audio. Status: ' + res.status, 'error');
            return;
        }

        const data = await res.json();
        console.log('[Play] Full response:', JSON.stringify(data, null, 2).substring(0, 800));
        console.log('[Play] data.status:', data.status);
        console.log('[Play] data.result:', data.result ? 'EXISTS' : 'MISSING');

        if (!data.status || !data.result) {
            console.error('[Play] Invalid response structure');
            showToast('Error', 'Response server tidak valid.', 'error');
            return;
        }

        // Try multiple possible paths for download URL
        let downloadUrl = data.result.download || data.result.url || data.result.link || data.result.audio || data.result.audio_url || data.result.file || '';
        console.log('[Play] downloadUrl raw:', downloadUrl);

        if (!downloadUrl || typeof downloadUrl !== 'string' || !downloadUrl.startsWith('http')) {
            console.error('[Play] No valid download URL. Available keys:', Object.keys(data.result));
            showToast('Error', 'Link audio tidak ditemukan di response.', 'error');
            return;
        }

        console.log('[Play] ✅ Got audio URL:', downloadUrl.substring(0, 100));
        playSpotify(downloadUrl, data.result.title || track.title, data.result.artist || track.artist, data.result.image || track.image);

    } catch (e) {
        console.error('[Play] Exception:', e.message, e.stack);
        showToast('Error', 'Gagal memutar: ' + e.message, 'error');
    }
}

async function openTrackDetailModal(enc) {
    let track;
    try { track = JSON.parse(decodeURIComponent(enc)); }
    catch (e) { console.error(e); return; }

    currentTrackData = track;

    let modal = document.getElementById('track-detail');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'track-detail';
        modal.className = 'td-overlay';
        modal.innerHTML = `
            <div class="td-backdrop" onclick="closeTrackDetail()"></div>
            <div class="td-card">
                <button class="td-close" onclick="closeTrackDetail()">${IC_CLOSE}</button>
                <div class="td-cover-wrap">
                    <img id="td-cover" class="td-cover" src="" alt="Cover" onerror="this.style.display='none'">
                    <div class="td-cover-overlay"></div>
                </div>
                <div class="td-body">
                    <div id="td-title" class="td-title"></div>
                    <div id="td-artist" class="td-artist"></div>
                    <div class="td-details">
                        <div class="td-detail-item">
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div class="td-detail-label">Durasi</div>
                                <div id="td-dur" class="td-detail-value" style="display:flex;align-items:center;gap:4px;">${IC_CLOCK}<span></span></div>
                            </div>
                        </div>
                        <div class="td-detail-item">
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div class="td-detail-label">Album</div>
                                <div id="td-album" class="td-detail-value" style="display:flex;align-items:center;gap:4px;">${IC_DISC}<span></span></div>
                            </div>
                        </div>
                        <div class="td-detail-item">
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div class="td-detail-label">Genre</div>
                                <div id="td-genre" class="td-detail-value" style="display:flex;align-items:center;gap:4px;">${IC_MUSIC}<span></span></div>
                            </div>
                        </div>
                        <div class="td-detail-item">
                            <div style="display:flex;flex-direction:column;gap:2px;">
                                <div class="td-detail-label">Sumber</div>
                                <div class="td-detail-value" style="display:flex;align-items:center;gap:4px;">${SPOTIFY_LOGO}<span>Spotify</span></div>
                            </div>
                        </div>
                    </div>
                    <div class="td-playbar">
                        <button id="td-btn-play" class="td-btn-play" onclick="playFromDetail()">
                            <span id="td-icon">${IC_PLAY}</span>
                            <span id="td-text">Putar</span>
                        </button>
                        <button id="td-btn-dl" class="td-btn-spotify" onclick="downloadFromDetail()">
                            ${IC_DOWNLOAD} Download
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }

    document.getElementById('td-cover').src = track.image || '';
    document.getElementById('td-title').textContent = track.title || 'Unknown Title';
    document.getElementById('td-artist').textContent = track.artist || 'Unknown Artist';
    document.getElementById('td-dur').querySelector('span').textContent = track.duration || '0:00';
    document.getElementById('td-album').querySelector('span').textContent = track.album || '-';
    document.getElementById('td-genre').querySelector('span').textContent = track.genre || 'Music';

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTrackDetail() {
    const modal = document.getElementById('track-detail');
    if (modal) modal.classList.remove('active');
    if (!document.getElementById('invoice-modal')?.classList.contains('active') && !document.getElementById('lyrics-modal')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

async function playFromDetail() {
    if (!currentTrackData) return;
    await fetchAndPlayTrack(encodeURIComponent(JSON.stringify(currentTrackData)));
}

async function downloadFromDetail() {
    if (!currentTrackData || !currentTrackData.trackUrl) {
        showToast('Error', 'URL Spotify tidak tersedia.', 'error');
        return;
    }

    const btn = document.getElementById('td-btn-dl');
    const originalText = btn.innerHTML;
    btn.innerHTML = '⏳ Mengambil...';
    btn.disabled = true;

    try {
        console.log('[Download] Fetching for:', currentTrackData.trackUrl);
        const res = await fetch(`${API_PROXY.spotifyDownload}?url=${encodeURIComponent(currentTrackData.trackUrl)}`);
        const data = await res.json();
        console.log('[Download] Response:', JSON.stringify(data).substring(0, 500));

        if (data.status && data.result && data.result.download) {
            // Create a temporary link to force download
            const a = document.createElement('a');
            a.href = data.result.download;
            a.target = '_blank';
            a.download = (data.result.title || currentTrackData.title || 'lagu') + '.mp3';
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
            showToast('Sukses', 'Download ' + (data.result.title || '') + ' dimulai!', 'success');
        } else {
            console.error('[Download] No download URL. Keys:', data.result ? Object.keys(data.result) : 'no result');
            showToast('Error', 'Gagal mendapatkan link download.', 'error');
        }
    } catch (e) {
        console.error('[Download] Error:', e);
        showToast('Error', 'Gagal download: ' + e.message, 'error');
    } finally {
        btn.innerHTML = originalText;
        btn.disabled = false;
    }
}

function errorHTML(msg) {
    return `<div class="text-center py-10"><div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></div><p class="text-sm text-[var(--text-muted)]">${msg}</p></div>`;
}

// --- 13. PINTEREST ---
function initPinterest() {
    const form = document.getElementById('pinterest-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const q = document.getElementById('pin-query').value.trim();
        if (!q) return;
        await searchPinterest(q);
    });
}

async function searchPinterest(query) {
    const loading = document.getElementById('pin-loading');
    const results = document.getElementById('pin-results');
    const empty = document.getElementById('pin-empty');
    if (loading) loading.classList.remove('hidden');
    if (results) results.innerHTML = '';
    if (empty) empty.classList.add('hidden');

    try {
        console.log('[Pinterest] Searching via proxy:', query);
        const res = await fetch(`${API_PROXY.pinterest}?q=${encodeURIComponent(query)}`);
        console.log('[Pinterest] Proxy status:', res.status);

        if (!res.ok) {
            const errText = await res.text();
            console.error('[Pinterest] Proxy error:', errText.slice(0, 300));
            throw new Error('Proxy HTTP ' + res.status);
        }

        const data = await res.json();
        let rawResult = data?.result || data?.data || data;

        if (!Array.isArray(rawResult) && data?.result?.images) rawResult = data.result.images;
        if (!Array.isArray(rawResult) && data?.data?.images) rawResult = data.data.images;

        console.log('[Pinterest] Result type:', typeof rawResult, 'isArray:', Array.isArray(rawResult));

        let images = [];
        if (Array.isArray(rawResult)) {
            images = rawResult
                .map(v => {
                    if (typeof v === 'string' && v.startsWith('http')) return v;
                    if (v && typeof v === 'object' && v.url) return v.url;
                    if (v && typeof v === 'object' && v.image) return v.image;
                    if (v && typeof v === 'object' && v.src) return v.src;
                    return null;
                })
                .filter(Boolean)
                .slice(0, 20);
        }

        console.log('[Pinterest] Parsed images:', images.length);

        if (loading) loading.classList.add('hidden');

        if (!images.length) {
            if (results) results.innerHTML = `<div class="text-center py-10"><p class="text-sm text-[var(--text-muted)]">Tidak ada hasil untuk "${query}"</p></div>`;
            return;
        }

        if (results) {
            results.innerHTML = `<div class="pin-grid">` + images.map((img, i) => `
                <div class="pin-card">
                    <img src="${img}" alt="Pinterest ${i+1}" loading="lazy" onerror="this.style.display='none'">
                    <div class="pin-card-overlay">
                        <button class="pin-btn" onclick="event.stopPropagation(); window.open('${img}', '_blank')">
                            ${PINTEREST_LOGO}
                            <span>Unduh / Buka</span>
                        </button>
                    </div>
                </div>
            `).join('') + `</div>`;
        }
    } catch (e) {
        console.error('[Pinterest] Error:', e.message);
        if (loading) loading.classList.add('hidden');
        if (results) results.innerHTML = errorHTML('Gagal memuat Pinterest: ' + e.message);
    }
}

// --- 14. AUDIO & VISUALIZER ---
function initVisualizer() {
    const player = document.getElementById('audio-player');
    if (!player) return;
    let wrap = document.getElementById('viz-wrap');
    if (!wrap) {
        wrap = document.createElement('div');
        wrap.id = 'viz-wrap';
        wrap.className = 'viz-wrap';
        for (let i = 0; i < 32; i++) {
            const bar = document.createElement('div');
            bar.className = 'viz-bar';
            bar.style.height = '2px';
            wrap.appendChild(bar);
        }
        const closeBtn = document.getElementById('player-close');
        if (closeBtn && closeBtn.parentNode) {
            closeBtn.parentNode.insertBefore(wrap, closeBtn);
        } else {
            player.appendChild(wrap);
        }
    }
}

function setupAudioContext(audio) {
    if (!audioCtx) {
        audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (!analyser) {
        analyser = audioCtx.createAnalyser();
        analyser.fftSize = 256;
        analyser.smoothingTimeConstant = 0.78;
        analyser.minDecibels = -85;
        analyser.maxDecibels = -25;
    }
    if (!source) {
        source = audioCtx.createMediaElementSource(audio);
        source.connect(analyser);
        analyser.connect(audioCtx.destination);
    }
    dataArray = new Uint8Array(analyser.frequencyBinCount);
}

function startVisualizer() {
    if (vizFrameId) cancelAnimationFrame(vizFrameId);
    const bars = document.querySelectorAll('.viz-bar');
    if (!bars.length || !analyser) return;
    function render() {
        if (!isPlaying) {
            bars.forEach(b => { b.style.height = '2px'; b.className = 'viz-bar'; });
            return;
        }
        analyser.getByteFrequencyData(dataArray);
        const binCount = dataArray.length;
        const bassBins = dataArray.slice(0, Math.floor(binCount * 0.08));
        const lowMidBins = dataArray.slice(Math.floor(binCount * 0.08), Math.floor(binCount * 0.18));
        const midBins = dataArray.slice(Math.floor(binCount * 0.18), Math.floor(binCount * 0.40));
        const highBins = dataArray.slice(Math.floor(binCount * 0.40), Math.floor(binCount * 0.70));
        const bassAvg = bassBins.reduce((a, b) => a + b, 0) / bassBins.length / 255;
        const lowMidAvg = lowMidBins.reduce((a, b) => a + b, 0) / lowMidBins.length / 255;
        kickEnergy = Math.max(bassAvg, kickEnergy * kickDecay);
        const kickIntensity = kickEnergy;
        bars.forEach((bar, i) => {
            let value, isKick = false, isSnare = false;
            const ratio = i / 32;
            if (ratio < 0.20) {
                const idx = Math.floor(ratio / 0.20 * bassBins.length);
                value = bassBins[Math.min(idx, bassBins.length - 1)] || 0;
                if (kickIntensity > 0.55 && ratio < 0.10) isKick = true;
            } else if (ratio < 0.40) {
                const idx = Math.floor((ratio - 0.20) / 0.20 * lowMidBins.length);
                value = lowMidBins[Math.min(idx, lowMidBins.length - 1)] || 0;
                if (lowMidAvg > 0.50) isSnare = true;
            } else if (ratio < 0.65) {
                const idx = Math.floor((ratio - 0.40) / 0.25 * midBins.length);
                value = midBins[Math.min(idx, midBins.length - 1)] || 0;
            } else {
                const idx = Math.floor((ratio - 0.65) / 0.35 * highBins.length);
                value = highBins[Math.min(idx, highBins.length - 1)] || 0;
            }
            const percent = (value || 0) / 255;
            let baseHeight = 2;
            if (ratio < 0.20) baseHeight = 2 + percent * 42;
            else if (ratio < 0.40) baseHeight = 2 + percent * 34;
            else if (ratio < 0.65) baseHeight = 2 + percent * 26;
            else baseHeight = 2 + percent * 18;
            bar.style.height = baseHeight + 'px';
            bar.className = 'viz-bar';
            if (isKick) bar.classList.add('kick');
            else if (isSnare) bar.classList.add('snare');
        });
        vizFrameId = requestAnimationFrame(render);
    }
    render();
}

function stopVisualizer() {
    if (vizFrameId) cancelAnimationFrame(vizFrameId);
    kickEnergy = 0;
    document.querySelectorAll('.viz-bar').forEach(b => {
        b.style.height = '2px';
        b.className = 'viz-bar';
    });
}

function pauseAudio() {
    const audio = document.getElementById('audio-element');
    if (audio) audio.pause();
    isPlaying = false;
    stopVisualizer();
    const player = document.getElementById('audio-player');
    if (player) player.classList.add('paused');
    const btn = document.getElementById('player-play');
    if (btn) {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
        btn.classList.remove('player-pulse');
    }
    
    document.querySelectorAll('.track-row .btn-play-sm').forEach(btn => btn.innerHTML = IC_PLAY);
}

async function playSpotify(url, title, artist, cover) {
    console.log('[Play] playSpotify called with URL:', url ? url.substring(0, 80) : 'EMPTY');

    if (!url) {
        showToast('Error', 'URL audio kosong.', 'error');
        return;
    }
    if (!url.startsWith('http')) {
        showToast('Error', 'URL audio tidak valid.', 'error');
        return;
    }

    const player = document.getElementById('audio-player');
    const audio = document.getElementById('audio-element');
    const playBtn = document.getElementById('player-play');
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const coverEl = document.getElementById('player-cover');

    if (!audio) {
        showToast('Error', 'Audio player tidak ditemukan.', 'error');
        return;
    }

    // Reset error flag
    audioErrorFired = false;

    currentAudioUrl = url;
    if (titleEl) titleEl.textContent = title || 'Unknown';
    if (artistEl) artistEl.textContent = artist || 'Unknown';
    if (coverEl) { coverEl.src = cover || ''; coverEl.classList.remove('hidden'); }

    showToast('Proses', 'Memuat audio...', 'success');

    // Try to fetch audio as blob first (handles redirects and CORS better)
    try {
        console.log('[Play] Fetching audio blob...');
        const response = await fetch(url, { 
            method: 'GET',
            headers: { 'Accept': 'audio/*,*/*' }
        });

        if (!response.ok) {
            throw new Error('HTTP ' + response.status);
        }

        const blob = await response.blob();
        console.log('[Play] Blob received:', blob.type, blob.size, 'bytes');

        if (blob.size === 0) {
            throw new Error('File audio kosong');
        }

        const blobUrl = URL.createObjectURL(blob);
        console.log('[Play] Blob URL created');

        audio.src = blobUrl;
        audio.load();

    } catch (fetchErr) {
        console.warn('[Play] Blob fetch failed:', fetchErr.message, '- falling back to direct URL');
        // Fallback: try direct URL (might work with some URLs)
        audio.crossOrigin = 'anonymous';
        audio.src = url;
        audio.load();
    }

    initVisualizer();

    console.log('[Play] Calling audio.play()...');
    const playPromise = audio.play();

    if (playPromise !== undefined) {
        playPromise.then(() => {
            console.log('[Play] ✅ Playback started');
            isPlaying = true;
            if (player) {
                player.classList.add('show');
                player.classList.remove('paused');
            }
            if (playBtn) {
                playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
                playBtn.classList.add('player-pulse');
            }
            try {
                setupAudioContext(audio);
                startVisualizer();
            } catch (e) { console.log('[Play] Visualizer error:', e); }
        }).catch((err) => {
            console.error('[Play] ❌ Playback failed:', err.name, err.message);
            if (!audioErrorFired) {
                audioErrorFired = true;
                showToast('Error', 'Gagal memutar audio. Coba download saja.', 'error');
            }
            if (player) player.classList.remove('show');
        });
    }

    if (playBtn) {
        playBtn.onclick = () => {
            if (!audio) return;
            if (isPlaying) {
                audio.pause();
                isPlaying = false;
                player.classList.add('paused');
                playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="6 3 20 12 6 21 6 3"/></svg>';
                playBtn.classList.remove('player-pulse');
                stopVisualizer();
            } else {
                audio.play().then(() => {
                    isPlaying = true;
                    player.classList.remove('paused');
                    playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
                    playBtn.classList.add('player-pulse');
                    try {
                        if (audioCtx?.state === 'suspended') audioCtx.resume();
                        startVisualizer();
                    } catch (e) {}
                }).catch((err) => {
                    if (!audioErrorFired) {
                        audioErrorFired = true;
                        showToast('Error', 'Gagal resume: ' + err.message, 'error');
                    }
                });
            }
        };
    }

    audio.onended = () => {
        console.log('[Audio] Playback ended');
        isPlaying = false;
        if (player) {
            player.classList.remove('show');
            player.classList.add('paused');
        }
        if (playBtn) playBtn.classList.remove('player-pulse');
        stopVisualizer();
    };

    audio.onerror = (e) => {
        if (audioErrorFired) return; // Prevent spam
        audioErrorFired = true;
        console.error('[Audio] ❌ Error code:', audio.error?.code, 'message:', audio.error?.message);
        let errMsg = 'Format audio tidak didukung browser';
        if (audio.error) {
            switch(audio.error.code) {
                case 1: errMsg = 'Aborted'; break;
                case 2: errMsg = 'Network error'; break;
                case 3: errMsg = 'Decode error - format tidak didukung'; break;
                case 4: errMsg = 'Source not supported - coba download saja'; break;
            }
        }
        showToast('Error', 'Audio: ' + errMsg, 'error');
        closePlayer();
    };

    initIcons();
}

function closePlayer() {
    const player = document.getElementById('audio-player');
    const audio = document.getElementById('audio-element');
    if (audio) { audio.pause(); audio.src = ''; }
    isPlaying = false;
    currentAudioUrl = '';
    stopVisualizer();
    if (player) { player.classList.remove('show'); player.classList.add('paused'); }
    const btn = document.getElementById('player-play');
    if (btn) btn.classList.remove('player-pulse');
    
    document.querySelectorAll('.track-row .btn-play-sm').forEach(btn => btn.innerHTML = IC_PLAY);
}

function showDownloadInfoModal(result, spotifyUrl) {
    const old = document.getElementById('dl-info-modal');
    if (old) old.remove();
    
    // Normalisasi hasil dari API terlebih dahulu
    const norm = normalizeDownloadResult(result);
    const cached = spotifyUrl ? trackDataMap.get(spotifyUrl) : null;
    const key = result.title && result.artist ? (result.title + '|' + result.artist).toLowerCase() : '';
    const cachedByKey = key ? trackDataMap.get(key) : null;
    const track = cached || cachedByKey || {};
    
    let rawDuration = result.duration || result.duration_ms || norm.duration || track.duration || '0:00';

    let merged = {
        title: result.title || norm.title || track.title || 'Unknown',
        artist: result.artist || norm.artist || track.artist || 'Unknown',
        album: result.album || norm.album || track.album || '-',
        image: result.image || norm.image || track.image || track.thumb || '',
        duration: formatDuration(rawDuration),
        download: result.download || norm.download || ''
    };

    const modal = document.createElement('div');
    modal.id = 'dl-info-modal';
    modal.className = 'modal-overlay';
    modal.style.zIndex = '110';
    modal.innerHTML = `
        <div class="modal-backdrop" onclick="closeDownloadInfoModal()"></div>
        <div class="modal-content" style="max-width:420px;">
            <div class="sticky top-0 bg-[var(--modal-bg)] backdrop-blur-md border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
                <div class="flex items-center gap-2">
                    <span>${SPOTIFY_LOGO}</span>
                    <h3 class="font-bold text-[var(--text-primary)]">Info Lagu</h3>
                </div>
                <button onclick="closeDownloadInfoModal()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
                </button>
            </div>
            <div class="p-6 space-y-4">
                <div class="flex flex-col items-center text-center gap-3">
                    <div class="w-32 h-32 rounded-2xl bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center shadow-lg overflow-hidden relative">
                        <img id="dl-info-cover" src="${merged.image}" alt="Cover" class="w-full h-full object-cover absolute inset-0" style="${merged.image ? '' : 'display:none;'}" onerror="this.style.display='none';document.getElementById('dl-info-fallback').style.display='flex';">
                        <div id="dl-info-fallback" class="w-full h-full flex items-center justify-center" style="${merged.image ? 'display:none;' : ''}">
                            <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" class="text-slate-500"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-[var(--text-primary)] text-lg">${merged.title}</h4>
                        <p class="text-sm text-[var(--text-secondary)]">${merged.artist}</p>
                        <p class="text-xs text-[var(--text-muted)] mt-1">${merged.album}</p>
                    </div>
                </div>
                <div class="grid grid-cols-2 gap-3">
                    <div class="bg-[var(--input-bg)] rounded-xl p-3 border border-[var(--border-color)]">
                        <p class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Durasi</p>
                        <p id="dl-info-duration" class="font-semibold text-[var(--text-primary)] text-sm">${merged.duration}</p>
                    </div>
                    <div class="bg-[var(--input-bg)] rounded-xl p-3 border border-[var(--border-color)]">
                        <p class="text-[10px] text-[var(--text-muted)] uppercase tracking-wider font-semibold">Format</p>
                        <p class="font-semibold text-[var(--text-primary)] text-sm">MP3</p>
                    </div>
                </div>
                <button id="dl-info-download-btn" class="btn-primary btn-emerald w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                    Download MP3
                </button>
                <button onclick="closeDownloadInfoModal()" class="w-full py-2.5 rounded-xl border border-[var(--border-color)] text-sm font-semibold text-[var(--text-secondary)] hover:bg-[var(--hover-bg)] transition-colors">
                    Tutup
                </button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);

    document.getElementById('dl-info-download-btn').onclick = () => {
        if (merged.download) {
            window.open(merged.download, '_blank');
            showToast('Sukses', 'Download dimulai!', 'success');
        } else {
            showToast('Error', 'Link download tidak tersedia.', 'error');
        }
    };

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Auto enrich jika durasi masih 0:00
    if (!merged.duration || merged.duration === '0:00') {
        (async () => {
            try {
                const searchQuery = encodeURIComponent(merged.title + ' ' + merged.artist);
                const searchRes = await fetch(`${API_PROXY.spotifySearch}?q=${searchQuery}`);
                const searchData = await searchRes.json();
                
                let rawTracks = searchData?.data || searchData?.result || [];
                if (!Array.isArray(rawTracks) && searchData?.data?.tracks) rawTracks = searchData.data.tracks;
                if (!Array.isArray(rawTracks) && searchData?.result?.tracks) rawTracks = searchData.result.tracks;
                
                if (rawTracks.length > 0) {
                    const first = rawTracks[0];
                    let foundDur = first.duration || first.duration_ms || first.durationMs || first.length || first.trackDuration || first.time || '0:00';
                    let formatted = formatDuration(foundDur);
                    
                    if (formatted && formatted !== '0:00') {
                        const durEl = document.getElementById('dl-info-duration');
                        if (durEl) durEl.textContent = formatted;
                    }
                }
            } catch (e) {
                console.log('[Info Modal] Duration enrich failed:', e.message);
            }
        })();
    }
}

function closeDownloadInfoModal() {
    const modal = document.getElementById('dl-info-modal');
    if (modal) modal.classList.remove('active');
    if (!document.getElementById('invoice-modal')?.classList.contains('active') 
        && !document.getElementById('lyrics-modal')?.classList.contains('active')
        && !document.getElementById('track-detail')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

// --- 15. KEYBOARD ---
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(); closePlayer(); closeTrackDetail(); closeLyricsModal();
        }
    });
}

// --- 16. LOADER ---
function initLoader() {
    const loader = document.getElementById("proseka-loader");
    const progressBar = document.getElementById("loader-progress-bar");
    const percentageText = document.getElementById("loader-percentage");
    if (!loader || !progressBar || !percentageText) return;
    let progress = 0;
    const loadingInterval = setInterval(() => {
        progress += Math.floor(Math.random() * 11) + 5;
        if (progress >= 100) {
            progress = 100;
            clearInterval(loadingInterval);
            setTimeout(() => {
                loader.classList.add("opacity-0");
                loader.style.pointerEvents = "none";
                setTimeout(() => { loader.remove(); }, 500);
            }, 400);
        }
        progressBar.style.width = `${progress}%`;
        percentageText.innerText = `${progress}%`;
    }, 80);
}

// --- 17. INIT ---
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initIcons();
    initSidebar();
    initInvoiceForm();
    initKeyboard();
    initLoader();
    initYukiBrandAnimation();

    if (isPage('pterodactyl')) renderPanelProducts();
    if (isPage('spotify')) initSpotify();
    if (isPage('pinterest')) initPinterest();
});

window.addEventListener('load', () => {
    initIcons();
});
