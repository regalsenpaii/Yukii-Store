/* =========================================================================
   YUKI STORE v4.0 - FULL INTEGRATED SCRIPT
   Dark Mode, Spotify (Nexray + Clutch), Pinterest (Clutch), Lyrics in Album
   ========================================================================= */

// --- 1. CORE & API CONFIGURATION ---
const API_CONFIG = (() => {
    const clutchBase = atob('aHR0cHM6Ly9hcGkuY2x1dGNoLndlYi5pZA==');
    const clutchKey  = atob('YWxpcGFpYXBpa2V5YmFydQ==');
    const nexrayBase = atob('aHR0cHM6Ly9hcGkubmV4cmF5LndlYi5pZA==');
    return { clutchBase, clutchKey, nexrayBase };
})();

// --- 2. SVG LOGOS & ICONS ---
const SPOTIFY_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 168 168" width="18" height="18"><path fill="#1DB954" d="M84 0C37.8 0 0 37.8 0 84s37.8 84 84 84 84-37.8 84-84S130.2 0 84 0zm38.5 121.2c-1.5 2.5-4.7 3.2-7.1 1.7-19.5-11.9-44.1-14.6-73-8-2.8.6-5.6-1.1-6.2-3.9-.6-2.8 1.1-5.6 3.9-6.2 31.6-7.2 58.7-4.1 80.3 9.2 2.4 1.4 3.1 4.6 1.7 7.1zm10.3-22.9c-1.9 3-5.9 4-8.9 2.1-22.3-13.7-56.3-17.7-82.7-9.7-3.4 1-7-1-8-4.4s1-7 4.4-8c30.2-9.2 67.7-4.7 92.9 11.1 3.1 1.8 4.1 5.8 2.2 8.9zm.9-23.8c-26.8-15.9-71-17.4-96.5-9.6-4.1 1.2-8.4-1.1-9.6-5.2-1.2-4.1 1.1-8.4 5.2-9.6 29.3-8.9 78.1-7.2 108.7 11.1 3.7 2.2 4.9 6.9 2.7 10.6-2.2 3.6-6.9 4.9-10.5 2.7z"/></svg>`;
const PINTEREST_LOGO = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="18" height="18"><path fill="#E60023" d="M12 0C5.4 0 0 5.4 0 12c0 5.1 3.2 9.5 7.6 11.2-.1-1-.3-2.6.1-3.7.3-.8 1.7-5.4 1.7-5.4s-.4-.9-.4-2.1c0-2 1.2-3.5 2.6-3.5 1.2 0 1.8.9 1.8 2 0 1.2-.8 3-1.2 4.7-.3 1.4.7 2.5 2 2.5 2.4 0 4.2-2.5 4.2-6.1 0-3.2-2.3-5.4-5.5-5.4-3.8 0-6 2.8-6 5.7 0 1.1.4 2.3.9 3 .1.2.2.3.1.5l-.3 1.1c0 .2-.1.2-.3.1-1.2-.5-2-2.3-2-3.7 0-3 2.5-6.6 7.5-6.6 4 0 7.1 2.9 7.1 6.7 0 4.1-2.6 7.4-6.1 7.4-1.2 0-2.3-.6-2.7-1.3l-.7 2.8c-.3 1.1-1 2.5-1.5 3.3C9.5 23.8 10.7 24 12 24c6.6 0 12-5.4 12-12S18.6 0 12 0z"/></svg>`;

const IC_PLAY = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="0"><polygon points="5 3 19 12 5 21 5 3"/></svg>`;
const IC_PAUSE = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white" stroke="white" stroke-width="0"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>`;
const IC_CLOSE = `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>`;
const IC_INFO = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="16" y2="12"/><line x1="12" x2="12.01" y1="8" y2="8"/></svg>`;
const IC_CLOCK = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`;
const IC_MUSIC = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;
const IC_DISC = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="3"/></svg>`;
const IC_EXTERNAL = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>`;
const IC_DOWNLOAD = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>`;
const IC_LYRICS = `<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`;

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
let currentPage = 'dashboard';
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

// --- 5. UTILITIES ---
function formatRupiah(price) {
    return 'Rp ' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

function formatDuration(ms) {
    if (!ms || ms <= 0) return '0:00';
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    const sec = s % 60;
    return m + ':' + (sec < 10 ? '0' : '') + sec;
}

function initIcons() {
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function errorHTML(msg) {
    return `<div class="text-center py-10"><div class="w-12 h-12 rounded-xl bg-red-50 flex items-center justify-center mx-auto mb-3"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-red-400"><circle cx="12" cy="12" r="10"/><line x1="12" x2="12" y1="8" y2="12"/><line x1="12" x2="12.01" y1="16" y2="16"/></svg></div><p class="text-sm text-slate-400">${msg}</p></div>`;
}

// --- 6. THEME TOGGLE ---
function initTheme() {
    const toggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    const saved = localStorage.getItem('yuki-theme');

    if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        html.setAttribute('data-theme', 'dark');
        if (toggle) toggle.classList.add('active');
    }

    if (toggle) {
        toggle.addEventListener('click', () => {
            if (html.getAttribute('data-theme') === 'dark') {
                html.removeAttribute('data-theme');
                localStorage.setItem('yuki-theme', 'light');
                toggle.classList.remove('active');
            } else {
                html.setAttribute('data-theme', 'dark');
                localStorage.setItem('yuki-theme', 'dark');
                toggle.classList.add('active');
            }
        });
    }
}

// --- 7. NAVIGATION SYSTEM ---
function navigateTo(page) {
    currentPage = page;
    document.querySelectorAll('.section-page').forEach(s => s.classList.remove('active'));
    const target = document.getElementById('page-' + page);
    if (target) target.classList.add('active');
    document.querySelectorAll('.nav-item').forEach(nav => nav.classList.remove('active'));
    const activeNav = document.querySelector('.nav-item[data-page="' + page + '"]');
    if (activeNav) activeNav.classList.add('active');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setTimeout(initIcons, 100);
}

function initNavigation() {
    document.querySelectorAll('.nav-item').forEach(item => {
        item.addEventListener('click', () => {
            const page = item.getAttribute('data-page');
            if (page) navigateTo(page);
        });
    });
}

function initSidebar() {
    const menuToggle = document.getElementById('menu-toggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('mobile-overlay');
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            sidebar.classList.toggle('open');
            overlay.classList.toggle('hidden');
        });
    }
    if (overlay) {
        overlay.addEventListener('click', () => {
            sidebar.classList.remove('open');
            overlay.classList.add('hidden');
        });
    }
}

// --- 8. PRODUCT RENDERING & CARD ACTIONS ---
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
                        <h3 class="font-bold text-slate-800 text-sm">${product.name}</h3>
                        <p class="text-[10px] text-slate-400">${product.specs}</p>
                    </div>
                </div>
                <div class="flex items-end justify-between mb-4">
                    <div><p class="text-[10px] text-slate-400 mb-0.5">Harga</p><p class="text-lg font-bold text-blue-600">${formatRupiah(product.price)}</p></div>
                    <div class="text-right"><p class="text-[10px] text-slate-400 mb-0.5">RAM</p><p class="text-sm font-semibold text-slate-600">${product.ram}</p></div>
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
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }
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

// --- 9. REGAL CDN GITHUB UPLOAD SYSTEM ---
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
                    body: JSON.stringify({ fileName: fileName, base64Content: base64Content })
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

// --- 10. INVOICE FORM HANDLING ---
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
            textMessage += '🖼️ *BUKTI TRANSFER:*\n' + cdnLink + '\n\n✅ *Bukti telah berhasil dihost di Regal Store CDN.*';
        } else {
            textMessage += '⚠️ *BUKTI TRANSFER:*\n_(Upload otomatis gagal: ' + (uploadError || 'Network/Auth Token') + ')_\nMohon lampirkan bukti transfer langsung di chat ini ya kak!';
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

// --- 11. SPOTIFY API HELPERS ---
async function fetchSpotifyDownload(spotifyUrl) {
    if (!spotifyUrl) return null;
    const apiUrl = `${API_CONFIG.clutchBase}/download/spotify?apikey=${API_CONFIG.clutchKey}&url=${encodeURIComponent(spotifyUrl)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Download API error');
    return await res.json();
}

async function fetchSpotifyLyrics(title, artist) {
    const apiUrl = `${API_CONFIG.clutchBase}/search/spotify-lirik?apikey=${API_CONFIG.clutchKey}&title=${encodeURIComponent(title + ' ' + artist)}`;
    const res = await fetch(apiUrl);
    if (!res.ok) throw new Error('Lyrics API error');
    const data = await res.json();
    if (data.status && data.result) {
        return data.result.plainLyrics || data.result.syncedLyrics || null;
    }
    return null;
}

// --- 12. MUSIC SEARCH & TRACK DETAIL ---
function openTrackDetail(track) {
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
                    </div>
                    <div class="td-playbar">
                        <button id="td-btn-play" class="td-btn-play" onclick="toggleDetailPlay()">
                            <span id="td-icon">${IC_PLAY}</span>
                            <span id="td-text">Putar</span>
                        </button>
                        <button id="td-btn-lyrics" class="td-btn-spotify" onclick="toggleLyrics()">
                            ${IC_LYRICS} Lirik
                        </button>
                        <button class="td-btn-spotify" onclick="downloadCurrentTrack()">
                            ${IC_DOWNLOAD} Download
                        </button>
                    </div>
                    <div id="td-lyrics-box" class="td-lyrics-box hidden">
                        <div class="td-lyrics-header">
                            <span class="td-lyrics-title">${IC_LYRICS} Lirik Lagu</span>
                            <button onclick="toggleLyrics()" class="td-lyrics-close">${IC_CLOSE}</button>
                        </div>
                        <div id="td-lyrics-content" class="td-lyrics-content">
                            <div class="td-lyrics-loading">Memuat lirik...</div>
                        </div>
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

    // Reset lyrics box
    const lyricsBox = document.getElementById('td-lyrics-box');
    if (lyricsBox) lyricsBox.classList.add('hidden');
    const lyricsContent = document.getElementById('td-lyrics-content');
    if (lyricsContent) lyricsContent.innerHTML = '<div class="td-lyrics-loading">Memuat lirik...</div>';

    updateDetailPlayState();
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeTrackDetail() {
    const modal = document.getElementById('track-detail');
    if (modal) modal.classList.remove('active');
    if (!document.getElementById('invoice-modal')?.classList.contains('active')) {
        document.body.style.overflow = '';
    }
}

function updateDetailPlayState() {
    const isThis = currentTrackData && isPlaying && currentAudioUrl === currentTrackData._audioUrl;
    const icon = document.getElementById('td-icon');
    const text = document.getElementById('td-text');
    if (icon) icon.innerHTML = isThis ? IC_PAUSE : IC_PLAY;
    if (text) text.textContent = isThis ? 'Jeda' : 'Putar';
}

async function toggleDetailPlay() {
    if (!currentTrackData) return;
    const isThis = isPlaying && currentAudioUrl === currentTrackData._audioUrl;
    if (isThis) {
        pauseAudio();
        updateDetailPlayState();
        return;
    }
    if (currentTrackData._audioUrl) {
        playAudio(currentTrackData._audioUrl, currentTrackData.title, currentTrackData.artist, currentTrackData.image);
        return;
    }
    const btn = document.getElementById('td-btn-play');
    if (btn) { btn.disabled = true; btn.innerHTML = `<span style="display:inline-block;width:14px;height:14px;border:2px solid rgba(255,255,255,0.3);border-top-color:#fff;border-radius:50%;animation:spin 0.8s linear infinite;"></span> <span>Loading...</span>`; }
    try {
        const data = await fetchSpotifyDownload(currentTrackData.spotifyUrl);
        if (data && data.result && data.result.download) {
            currentTrackData._audioUrl = data.result.download;
            currentTrackData.image = data.result.image || currentTrackData.image;
            document.getElementById('td-cover').src = currentTrackData.image;
            playAudio(data.result.download, data.result.title || currentTrackData.title, data.result.artist || currentTrackData.artist, data.result.image || currentTrackData.image);
        } else {
            showToast('Error', 'Gagal memuat lagu', 'error');
        }
    } catch (e) {
        showToast('Error', 'Gagal memuat lagu', 'error');
    } finally {
        updateDetailPlayState();
        if (btn) btn.disabled = false;
    }
}

async function toggleLyrics() {
    const box = document.getElementById('td-lyrics-box');
    const content = document.getElementById('td-lyrics-content');
    if (!box || !content) return;
    if (!box.classList.contains('hidden')) {
        box.classList.add('hidden');
        return;
    }
    box.classList.remove('hidden');
    if (currentTrackData._lyrics !== undefined) {
        content.textContent = currentTrackData._lyrics || 'Lirik tidak ditemukan.';
        return;
    }
    content.innerHTML = '<div class="td-lyrics-loading">Memuat lirik...</div>';
    try {
        const lyrics = await fetchSpotifyLyrics(currentTrackData.title, currentTrackData.artist);
        currentTrackData._lyrics = lyrics || 'Lirik tidak ditemukan.';
        content.textContent = currentTrackData._lyrics;
    } catch (e) {
        content.innerHTML = '<div class="td-lyrics-empty">Gagal memuat lirik.</div>';
    }
}

async function downloadCurrentTrack() {
    if (!currentTrackData) return;
    showToast('Proses', 'Mempersiapkan download...', 'success');
    try {
        const data = await fetchSpotifyDownload(currentTrackData.spotifyUrl);
        if (data && data.result && data.result.download) {
            const a = document.createElement('a');
            a.href = data.result.download;
            a.download = `${currentTrackData.title} - ${currentTrackData.artist}.mp3`;
            a.target = '_blank';
            document.body.appendChild(a);
            a.click();
            a.remove();
            showToast('Sukses', 'Download dimulai', 'success');
        } else {
            showToast('Error', 'Gagal mendownload', 'error');
        }
    } catch (e) {
        showToast('Error', 'Gagal mendownload', 'error');
    }
}

function openTrackDetailFromString(enc) {
    try { openTrackDetail(JSON.parse(decodeURIComponent(enc))); }
    catch (e) { console.error(e); }
}

async function quickPlayString(enc) {
    try {
        const t = JSON.parse(decodeURIComponent(enc));
        showToast('Proses', 'Mempersiapkan audio...', 'success');
        const data = await fetchSpotifyDownload(t.spotifyUrl);
        if (data && data.result && data.result.download) {
            t._audioUrl = data.result.download;
            playAudio(data.result.download, data.result.title || t.title, data.result.artist || t.artist, data.result.image || t.image);
        } else {
            showToast('Error', 'Audio tidak tersedia', 'error');
        }
    } catch (e) {
        showToast('Error', 'Gagal memuat audio', 'error');
    }
}

function initSpotify() {
    const h = document.getElementById('spotify-header');
    if (h) h.innerHTML = `${SPOTIFY_LOGO} <span style="margin-left:8px;font-weight:700;color:#0f172a;font-size:1.1rem;">Spotify Finder</span>`;
    const form = document.getElementById('spotify-form');
    if (!form) return;
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const q = document.getElementById('spotify-query').value.trim();
        if (!q) return;
        await searchSpotify(q);
    });
}

async function searchSpotify(query) {
    const loading = document.getElementById('spotify-loading');
    const results = document.getElementById('spotify-results');
    const empty = document.getElementById('spotify-empty');
    if (loading) loading.classList.remove('hidden');
    if (results) results.innerHTML = '';
    if (empty) empty.classList.add('hidden');

    try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 15000);
        const res = await fetch(`${API_CONFIG.nexrayBase}/search/spotify?q=${encodeURIComponent(query)}`, { signal: ctrl.signal });
        clearTimeout(tid);
        if (!res.ok) throw new Error('Network error');
        const data = await res.json();
        if (loading) loading.classList.add('hidden');

        if (!data.status || !data.result || !data.result.length) {
            if (results) results.innerHTML = errorHTML('Tidak ada hasil. Coba kata kunci lain.');
            return;
        }

        const tracks = data.result.map(item => ({
            title: item.title || 'Unknown',
            artist: item.artist || 'Unknown',
            album: item.album || '-',
            image: item.thumbnail || '',
            thumb: item.thumbnail || '',
            spotifyUrl: item.url || '',
            duration: item.duration || '0:00',
            durationMs: 0,
            genre: 'Music'
        }));

        if (results) {
            results.innerHTML = `<div class="track-list">` + tracks.map((track, i) => {
                const tjson = encodeURIComponent(JSON.stringify(track));
                return `
                    <div class="track-row" data-id="${track.spotifyUrl}" onclick="openTrackDetailFromString('${tjson}')">
                        <img class="track-thumb" src="${track.thumb || track.image || ''}" alt="" loading="lazy" onerror="this.src='https://via.placeholder.com/300x300/e2e8f0/94a3b8?text=Music'">
                        <div class="track-info">
                            <div class="track-title">${track.title}</div>
                            <div class="track-artist">${track.artist}</div>
                            <div class="track-meta-row">
                                <span class="track-meta">${IC_CLOCK} ${track.duration}</span>
                                <span class="track-meta">${IC_DISC} ${track.album}</span>
                            </div>
                        </div>
                        <div class="track-actions">
                            <button class="btn-play-sm" onclick="event.stopPropagation(); quickPlayString('${tjson}')" title="Putar">
                                ${IC_PLAY}
                            </button>
                            <button class="btn-info-sm" onclick="event.stopPropagation(); openTrackDetailFromString('${tjson}')" title="Detail">
                                ${IC_INFO}
                            </button>
                        </div>
                    </div>
                `;
            }).join('') + `</div>`;
        }
    } catch (e) {
        console.error('Spotify search error:', e);
        if (loading) loading.classList.add('hidden');
        if (results) results.innerHTML = errorHTML('Gagal mencari. Coba lagi nanti.');
    }
}

// --- 13. PINTEREST COMPONENT HANDLER ---
function initPinterest() {
    const h = document.getElementById('pinterest-header');
    if (h) h.innerHTML = `${PINTEREST_LOGO} <span style="margin-left:8px;font-weight:700;color:#0f172a;font-size:1.1rem;">Pinterest Search</span>`;
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

    const apiUrl = `${API_CONFIG.clutchBase}/search/pinterest?apikey=${API_CONFIG.clutchKey}&q=${encodeURIComponent(query)}`;
    let data = null, success = false;

    try {
        const ctrl = new AbortController();
        const tid = setTimeout(() => ctrl.abort(), 10000);
        const res = await fetch(apiUrl, { signal: ctrl.signal });
        clearTimeout(tid);
        if (res.ok) { data = await res.json(); success = true; }
    } catch (e) { console.log('Direct fetch fail'); }

    if (!success) {
        try {
            const ctrl = new AbortController();
            const tid = setTimeout(() => ctrl.abort(), 10000);
            const res = await fetch('https://api.allorigins.win/get?url=' + encodeURIComponent(apiUrl), { signal: ctrl.signal });
            clearTimeout(tid);
            if (res.ok) {
                const raw = await res.json();
                if (raw?.contents) { data = JSON.parse(raw.contents); success = true; }
            }
        } catch (e) { console.log('AllOrigins fail'); }
    }

    if (loading) loading.classList.add('hidden');

    if (!success || !data?.result?.length) {
        if (results) results.innerHTML = errorHTML('Gagal memuat Pinterest. Coba lagi.');
        return;
    }

    const images = data.result.filter(v => typeof v === 'string' && v.startsWith('http')).slice(0, 12);
    if (!images.length) {
        if (results) results.innerHTML = `<div class="text-center py-10"><p class="text-sm text-slate-400">Tidak ada hasil untuk "${query}"</p></div>`;
        return;
    }

    if (results) {
        results.innerHTML = `<div class="pin-grid">` + images.map((img, i) => `
            <div class="pin-card" onclick="window.open('${img}', '_blank')">
                <img src="${img}" alt="Pinterest ${i+1}" loading="lazy" onerror="this.style.display='none'">
                <div class="pin-card-overlay">
                    <div class="pin-btn">
                        ${PINTEREST_LOGO}
                        <span>Buka Gambar</span>
                    </div>
                </div>
            </div>
        `).join('') + `</div>`;
    }
}

// --- 14. AUDIO PLAYER & VISUALIZER ---
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
    updateDetailPlayState();
    document.querySelectorAll('.track-row .btn-play-sm').forEach(btn => btn.innerHTML = IC_PLAY);
}

function playAudio(url, title, artist, cover) {
    const player = document.getElementById('audio-player');
    const audio = document.getElementById('audio-element');
    const playBtn = document.getElementById('player-play');
    const titleEl = document.getElementById('player-title');
    const artistEl = document.getElementById('player-artist');
    const coverEl = document.getElementById('player-cover');

    currentAudioUrl = url || '';
    if (titleEl) titleEl.textContent = title || 'Unknown';
    if (artistEl) artistEl.textContent = artist || 'Unknown';
    if (coverEl) { coverEl.src = cover || ''; coverEl.classList.remove('hidden'); }

    if (audio) {
        audio.crossOrigin = 'anonymous';
        if (audio.src !== url) audio.src = url || '';
    }

    initVisualizer();

    if (audio && url) {
        audio.play().then(() => {
            isPlaying = true;
            if (player) player.classList.remove('paused');
            if (playBtn) {
                playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
                playBtn.classList.add('player-pulse');
            }
            document.querySelectorAll('.track-row').forEach(row => {
                const btn = row.querySelector('.btn-play-sm');
                if (row.getAttribute('data-id') === currentTrackData?.spotifyUrl) {
                    if (btn) btn.innerHTML = IC_PAUSE;
                } else {
                    if (btn) btn.innerHTML = IC_PLAY;
                }
            });
            try {
                setupAudioContext(audio);
                startVisualizer();
            } catch (e) { console.log('Visualizer error', e); }
        }).catch(() => {
            showToast('Info', 'Preview tidak tersedia', 'error');
        });
    }

    if (player) player.classList.add('show');

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
                document.querySelectorAll('.track-row .btn-play-sm').forEach(btn => btn.innerHTML = IC_PLAY);
            } else {
                audio.play();
                isPlaying = true;
                player.classList.remove('paused');
                playBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>';
                playBtn.classList.add('player-pulse');
                document.querySelectorAll('.track-row').forEach(row => {
                    const btn = row.querySelector('.btn-play-sm');
                    if (row.getAttribute('data-id') === currentTrackData?.spotifyUrl) {
                        if (btn) btn.innerHTML = IC_PAUSE;
                    }
                });
                try {
                    if (audioCtx?.state === 'suspended') audioCtx.resume();
                    startVisualizer();
                } catch (e) {}
            }
            updateDetailPlayState();
        };
    }

    if (audio) audio.onended = () => {
        closePlayer();
        updateDetailPlayState();
    };
    updateDetailPlayState();
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
    updateDetailPlayState();
    document.querySelectorAll('.track-row .btn-play-sm').forEach(btn => btn.innerHTML = IC_PLAY);
}

// --- 15. KEYBOARD & CORE EVENT LISTENERS ---
function initKeyboard() {
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') { closeModal(); closePlayer(); closeTrackDetail(); }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initIcons();
    initTheme();
    initSidebar();
    initNavigation();
    initInvoiceForm();
    initSpotify();
    initPinterest();
    initKeyboard();
    renderPanelProducts();
    navigateTo('dashboard');
});

window.addEventListener('load', () => {
    initIcons();
});
