const SEWA_BOT_HTML = `<aside id="sidebar" class="overflow-x-hidden overflow-y-hidden max-w-full">
  <div class="sidebar-brand">
    <div id="sidebar-brand-click" class="flex items-center gap-3 cursor-pointer select-none group relative p-1.5 rounded-xl transition-all duration-300 hover:bg-[var(--hover-bg)]">
      <div class="brand-icon transition-transform duration-300 group-hover:scale-110">
        <i data-lucide="sparkles" class="w-5 h-5 text-white relative z-10"></i>
      </div>
      <div class="relative overflow-hidden py-1">
        <h1 id="yuki-brand-text" class="font-bold text-[var(--text-primary)] text-sm tracking-wide">YUKI STORE</h1>
        <p class="text-[10px] text-[var(--text-muted)] font-semibold tracking-widest">DASHBOARD v1.0</p>
      </div>
    </div>
  </div>
  <nav class="sidebar-nav">
    <a href="?page=index" class="nav-item"><i data-lucide="layout-dashboard" class="nav-icon"></i><span>Dashboard</span></a>
    <a href="?page=pterodactyl" class="nav-item"><i data-lucide="server" class="nav-icon"></i><span>Panel Pterodactyl</span></a>
    <a href="?page=sewa-bot" class="nav-item active"><i data-lucide="bot" class="nav-icon"></i><span>Sewa Bot & Prem</span></a>
    <a href="?page=script-yuki" class="nav-item"><i data-lucide="code" class="nav-icon"></i><span>Script Yuki AI</span></a>
    <a href="?page=spotify" class="nav-item"><i data-lucide="music" class="nav-icon"></i><span>Spotify Finder</span></a>
    <a href="?page=music-player" class="nav-item"><i data-lucide="headphones" class="nav-icon"></i><span>Music Player</span></a>
    <a href="?page=pinterest" class="nav-item"><i data-lucide="image" class="nav-icon"></i><span>Pinterest Search</span></a>
  </nav>
  <div class="sidebar-footer space-y-4">
    <div class="flex items-center justify-between p-3 rounded-xl bg-[var(--card-bg)] border border-[var(--border-color)]">
      <span class="text-xs font-semibold text-[var(--text-primary)]">Mode Tampilan</span>
      <button id="theme-toggle" type="button" class="theme-toggle-btn">
        <i data-lucide="sun" class="sun-icon text-amber-500"></i>
        <i data-lucide="moon" class="moon-icon text-blue-400"></i>
      </button>
    </div>
    <div class="uptime-card">
      <div class="flex items-center gap-2 mb-1">
        <span class="status-pulse"></span>
        <span class="text-[11px] font-semibold text-emerald-700">Server Uptime</span>
      </div>
      <p class="text-xl font-bold text-emerald-600">99.9%</p>
      <p class="text-[10px] text-emerald-500 mt-0.5">Semua sistem berjalan lancar</p>
    </div>
  </div>
</aside>

<div id="mobile-overlay" class="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 hidden lg:hidden"></div>

<div class="mobile-header">
  <div id="mobile-brand-click" class="flex items-center gap-2 cursor-pointer select-none py-1 px-1.5 rounded-xl transition-all duration-300 hover:bg-[var(--hover-bg)]">
    <div class="brand-icon w-8 h-8 rounded-xl bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center">
      <i data-lucide="sparkles" class="w-4 h-4 text-white"></i>
    </div>
    <div class="relative overflow-hidden py-1">
      <span id="yuki-mobile-text" class="font-bold text-[var(--text-primary)] text-sm block">YUKI STORE</span>
    </div>
  </div>
  <button id="menu-toggle" class="p-2.5 rounded-xl hover:bg-[var(--hover-bg)] transition-all duration-300 flex flex-col justify-center items-center gap-1 w-10 h-10">
    <span class="w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all bar-1"></span>
    <span class="w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all bar-2"></span>
    <span class="w-5 h-0.5 bg-[var(--text-primary)] rounded-full transition-all bar-3"></span>
  </button>
</div>

<main id="main-content">
  <div class="page-container">
    <section class="mb-8">
      <div class="hero-banner relative overflow-hidden rounded-2xl sm:rounded-3xl">
        <img src="https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=1200&auto=format&fit=crop" class="absolute inset-0 w-full h-full object-cover z-0" alt="Bot">
        <div class="hero-overlay absolute inset-0 z-10"></div>
        <div class="hero-content relative z-20 p-6 sm:p-10 flex flex-col justify-center h-full min-h-[180px]">
          <h2 class="text-white text-2xl sm:text-3xl font-bold mb-2">Sewa Bot Grup WhatsApp</h2>
          <p class="text-white/80 text-sm max-w-xl">Bot akan otomatis bergabung ke grup setelah pembayaran dikonfirmasi.</p>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <div class="section-header">
        <div class="section-icon bg-emerald-50"><i data-lucide="bot" class="w-5 h-5 text-emerald-500"></i></div>
        <div>
          <h2 class="text-xl font-bold text-[var(--text-primary)]">Form Sewa Bot</h2>
          <p class="text-sm text-[var(--text-muted)]">Isi data berikut untuk menyewa bot ke grup Anda</p>
        </div>
      </div>

      <div class="glass-card glass-card-green p-6 max-w-2xl mx-auto">
        <form id="sewa-form" class="space-y-5">
          <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Nama Lengkap</label>
              <input type="text" id="sewa-nama" placeholder="Masukkan nama" class="form-input" required>
            </div>
            <div>
              <label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Nomor WhatsApp</label>
              <input type="tel" id="sewa-nomor" placeholder="08xx atau 628xx" class="form-input" required>
            </div>
          </div>
          <div>
            <label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Link Grup WhatsApp</label>
            <input type="url" id="sewa-link" placeholder="https://chat.whatsapp.com/xxxxx" class="form-input" required>
            <p class="text-[10px] text-[var(--text-muted)] mt-1">Pastikan bot tidak diblokir dari grup tersebut.</p>
          </div>
          <div>
            <label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Durasi Sewa</label>
            <div class="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <label class="cursor-pointer">
                <input type="radio" name="sewa-durasi" value="1" class="peer hidden" checked>
                <div class="rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] p-3 text-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600">
                  <div class="text-sm font-bold">1 Bulan</div>
                  <div class="text-xs font-semibold mt-1">Rp 10.000</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="sewa-durasi" value="3" class="peer hidden">
                <div class="rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] p-3 text-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600">
                  <div class="text-sm font-bold">3 Bulan</div>
                  <div class="text-xs font-semibold mt-1">Rp 25.000</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="sewa-durasi" value="6" class="peer hidden">
                <div class="rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] p-3 text-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600">
                  <div class="text-sm font-bold">6 Bulan</div>
                  <div class="text-xs font-semibold mt-1">Rp 45.000</div>
                </div>
              </label>
              <label class="cursor-pointer">
                <input type="radio" name="sewa-durasi" value="12" class="peer hidden">
                <div class="rounded-xl border border-[var(--border-color)] bg-[var(--input-bg)] p-3 text-center transition-all peer-checked:border-blue-500 peer-checked:bg-blue-50 peer-checked:text-blue-600">
                  <div class="text-sm font-bold">12 Bulan</div>
                  <div class="text-xs font-semibold mt-1">Rp 80.000</div>
                </div>
              </label>
            </div>
          </div>
          <button type="submit" id="sewa-submit" class="btn-primary btn-emerald w-full">
            <i data-lucide="qr-code" class="w-4 h-4"></i> Buat Pembayaran QRIS
          </button>
        </form>

        <!-- QRIS DISPLAY -->
        <div id="sewa-qris-area" class="hidden mt-6 pt-6 border-t border-[var(--border-color)]">
          <div class="text-center">
            <p class="text-xs text-[var(--text-muted)] mb-2">Scan QRIS berikut untuk membayar</p>
            
            <!-- QR Image -->
            <div id="sewa-qr-wrap" class="inline-block p-3 bg-white rounded-xl border border-[var(--border-color)] shadow-sm hidden">
              <img id="sewa-qris-img" src="" alt="QRIS" class="w-56 h-auto rounded-lg">
            </div>
            
            <!-- Fallback kalau QR tidak ada -->
            <div id="sewa-qr-fallback" class="hidden text-center p-4 bg-amber-50 rounded-xl border border-amber-100">
              <i data-lucide="alert-circle" class="w-6 h-6 text-amber-500 mx-auto mb-1"></i>
              <p class="text-xs text-amber-700 font-medium">QR tidak tersedia otomatis.</p>
              <p class="text-[10px] text-amber-600 mt-0.5">Silakan cek status manual dengan tombol di bawah.</p>
            </div>

            <div class="mt-3 space-y-1">
              <p class="text-sm font-bold text-[var(--text-primary)]">Total Bayar: <span id="sewa-total" class="text-blue-600">-</span></p>
              <p class="text-[10px] text-[var(--text-muted)]">ID: <span id="sewa-deposit-id" class="font-mono">-</span></p>
            </div>
            
            <!-- Countdown -->
            <div class="mt-3 flex items-center justify-center gap-2 text-xs text-amber-600 bg-amber-50 rounded-lg py-2 px-4 border border-amber-100">
              <i data-lucide="clock" class="w-3.5 h-3.5"></i>
              <span>Batas waktu: <span id="sewa-countdown">05:00</span></span>
            </div>

            <!-- TOMBOL SAYA SUDAH BAYAR -->
            <div class="mt-4">
              <button id="sewa-check-btn" onclick="checkSewaStatusManual()" class="btn-primary w-full">
                <i data-lucide="refresh-cw" class="w-4 h-4"></i> Saya Sudah Bayar — Cek Status
              </button>
              <p class="text-[10px] text-[var(--text-muted)] mt-1.5">Klik tombol di atas setelah kamu membayar.</p>
            </div>
          </div>
        </div>

        <!-- CHECKING STATE -->
        <div id="sewa-checking-area" class="hidden mt-6 pt-6 border-t border-[var(--border-color)]">
          <div class="text-center py-4">
            <svg class="animate-spin w-6 h-6 mx-auto text-blue-500 mb-2" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10" stroke-opacity="0.25"/><path d="M12 2 a10 10 0 0 1 10 10" fill="none"/></svg>
            <p class="text-sm text-[var(--text-secondary)]">Memeriksa status pembayaran...</p>
          </div>
        </div>

        <div id="sewa-success-area" class="hidden mt-6 pt-6 border-t border-[var(--border-color)]">
          <div class="text-center">
            <div class="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mx-auto mb-3">
              <i data-lucide="check-circle" class="w-7 h-7 text-emerald-500"></i>
            </div>
            <h3 class="font-bold text-[var(--text-primary)] mb-1">Pembayaran Berhasil!</h3>
            <p class="text-sm text-[var(--text-secondary)]">Bot Yuki AI akan segera bergabung ke grup Anda.</p>
            <p class="text-[10px] text-[var(--text-muted)] mt-2">Notifikasi akan dikirim ke WhatsApp Anda.</p>
          </div>
        </div>
      </div>
    </section>

    <section class="mb-10">
      <div class="section-header">
        <div class="section-icon bg-amber-50"><i data-lucide="crown" class="w-5 h-5 text-amber-500"></i></div>
        <div>
          <h2 class="text-xl font-bold text-[var(--text-primary)]">Premium User</h2>
          <p class="text-sm text-[var(--text-muted)]">Akses fitur premium bot Yuki AI</p>
        </div>
      </div>
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div class="glass-card p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center"><i data-lucide="crown" class="w-5 h-5 text-white"></i></div>
            <div><h3 class="font-bold text-[var(--text-primary)] text-sm">Premium Bulanan</h3><p class="text-[10px] text-[var(--text-muted)]">Akses semua fitur premium</p></div>
          </div>
          <p class="text-lg font-bold text-amber-600 mb-4">Rp 5.000</p>
          <button onclick="openModal('Premium User Bot Yuki - Bulanan', 5000)" class="btn-primary btn-amber w-full text-xs">Beli Sekarang</button>
        </div>
        <div class="glass-card p-6">
          <div class="flex items-center gap-3 mb-4">
            <div class="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-emerald-600 flex items-center justify-center"><i data-lucide="crown" class="w-5 h-5 text-white"></i></div>
            <div><h3 class="font-bold text-[var(--text-primary)] text-sm">Premium Permanen</h3><p class="text-[10px] text-[var(--text-muted)]">Sekali bayar, akses selamanya</p></div>
          </div>
          <p class="text-lg font-bold text-emerald-600 mb-4">Rp 50.000</p>
          <button onclick="openModal('Premium User Bot Yuki - Permanen', 50000)" class="btn-primary btn-emerald w-full text-xs">Beli Sekarang</button>
        </div>
      </div>
    </section>

    <footer class="text-center py-8 border-t border-[var(--border-color)]">
      <div class="flex items-center justify-center gap-2 mb-2">
        <div class="w-7 h-7 rounded-lg bg-gradient-to-br from-blue-500 to-emerald-400 flex items-center justify-center"><i data-lucide="sparkles" class="w-3.5 h-3.5 text-white"></i></div>
        <span class="font-bold text-[var(--text-primary)] text-sm">YUKI STORE</span>
      </div>
      <p class="text-xs text-[var(--text-muted)]">Powered by Regal &copy; 2026</p>
    </footer>
  </div>
</main>

<div id="invoice-modal" class="modal-overlay">
  <div class="modal-backdrop" onclick="closeModal()"></div>
  <div class="modal-content">
    <div class="sticky top-0 bg-[var(--modal-bg)] backdrop-blur-md border-b border-[var(--border-color)] px-6 py-4 flex items-center justify-between z-10 rounded-t-3xl">
      <div class="flex items-center gap-2"><i data-lucide="receipt" class="w-5 h-5 text-blue-500"></i><h3 class="font-bold text-[var(--text-primary)]">Invoice Pembayaran</h3></div>
      <button onclick="closeModal()" class="p-1.5 rounded-lg hover:bg-slate-100 transition-colors"><i data-lucide="x" class="w-5 h-5 text-[var(--text-muted)]"></i></button>
    </div>
    <div class="p-6 space-y-5">
      <div class="bg-[var(--input-bg)] rounded-xl p-4 border border-[var(--border-color)]">
        <p class="text-xs text-[var(--text-muted)] mb-1">Produk</p>
        <p id="modal-product-name" class="font-semibold text-[var(--text-primary)] text-sm">-</p>
        <div class="flex items-center justify-between mt-2 pt-2 border-t border-[var(--border-color)]">
          <span class="text-xs text-[var(--text-muted)]">Total Harga</span>
          <span id="modal-product-price" class="text-lg font-bold text-blue-600">-</span>
        </div>
      </div>
      <div class="text-center">
        <p class="text-xs text-[var(--text-muted)] mb-2">Scan QRIS untuk pembayaran</p>
        <div class="inline-block p-3 bg-[var(--input-bg)] rounded-xl border border-[var(--border-color)] shadow-sm">
          <img src="https://yuki-regal.vercel.app/Yuki1781204427360.jpg" alt="QRIS" class="w-48 h-auto rounded-lg" onerror="this.src='https://via.placeholder.com/200x200/e2e8f0/64748b?text=QRIS'">
        </div>
      </div>
      <div class="grid grid-cols-2 gap-3">
        <div class="bg-blue-50 rounded-xl p-3 border border-blue-100">
          <div class="flex items-center gap-1.5 mb-1"><i data-lucide="wallet" class="w-3.5 h-3.5 text-blue-500"></i><span class="text-xs font-semibold text-blue-700">GOPAY</span></div>
          <p class="text-sm font-mono text-blue-800">085166370226</p>
        </div>
        <div class="bg-emerald-50 rounded-xl p-3 border border-emerald-100">
          <div class="flex items-center gap-1.5 mb-1"><i data-lucide="wallet" class="w-3.5 h-3.5 text-emerald-500"></i><span class="text-xs font-semibold text-emerald-700">DANA</span></div>
          <p class="text-sm font-mono text-emerald-800">088705666357</p>
        </div>
      </div>
      <form id="invoice-form" class="space-y-4">
        <div><label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Nama Pembeli</label><input type="text" id="buyer-name" placeholder="Masukkan nama Anda" class="form-input" required></div>
        <div><label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Nomor WhatsApp</label><input type="tel" id="buyer-wa" placeholder="Contoh: 6281234567890" class="form-input" required></div>
        <div>
          <label class="block text-xs font-medium text-[var(--text-secondary)] mb-1.5">Upload Bukti Transfer</label>
          <input type="file" id="buyer-proof" accept="image/*" class="hidden" onchange="handleFileSelect(this)">
          <label for="buyer-proof" class="file-upload-zone">
            <i data-lucide="upload-cloud" class="w-8 h-8 text-[var(--text-muted)] mx-auto mb-1"></i>
            <span id="file-label" class="text-xs text-[var(--text-muted)]">Klik untuk upload bukti transfer</span>
          </label>
          <img id="file-preview" class="hidden mt-2 w-full h-32 object-cover rounded-xl border border-[var(--border-color)]" alt="Preview">
        </div>
        <button type="submit" class="btn-primary w-full"><i data-lucide="send" class="w-4 h-4"></i>Kirim Bukti Pembayaran</button>
      </form>
    </div>
  </div>
</div>

<div id="toast">
  <div class="toast-box">
    <div id="toast-icon" class="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center flex-shrink-0"><i data-lucide="check" class="w-4 h-4 text-emerald-500"></i></div>
    <div>
      <p id="toast-title" class="text-sm font-semibold text-[var(--text-primary)]">Berhasil</p>
      <p id="toast-message" class="text-xs text-[var(--text-muted)]">Operasi berhasil</p>
    </div>
  </div>
</div>`;

if (typeof YUKI !== 'undefined' && YUKI.registerPage) {
    YUKI.registerPage('sewa-bot', SEWA_BOT_HTML);
}
console.log('✅ YUKI STORE - Sewa Bot page registered');
