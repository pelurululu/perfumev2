<!-- ANNOUNCEMENT BAR -->
<div id="ann">
  <span class="ann-txt">
    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor" style="vertical-align:middle;margin-right:4px"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
    Promosi Terhad — Berakhir Dalam
  </span>
  <div class="ann-cd">
    <b id="cdH">23</b><span class="ann-sep">:</span><b id="cdM">59</b><span class="ann-sep">:</span><b id="cdS">47</b>
  </div>
  <span class="ann-txt">· Harga Promo Aktif</span>
  <button id="ann-close" aria-label="Tutup">
    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
</div>

<!-- NAV -->
<nav id="main-nav">
  <a href="index.php" class="nav-logo">the artisan</a>
  <div class="nav-center">
    <ul class="nav-center-links">
      <li><a href="koleksi.php?gender=m" id="nav-men">Men</a></li>
      <li><a href="koleksi.php?gender=w" id="nav-women">Women</a></li>
      <li><a href="koleksi.php?gender=u" id="nav-unisex">Unisex</a></li>
    </ul>
  </div>
  <div class="nav-right">
    <button class="nav-icon" id="nav-search-btn" aria-label="Cari">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    </button>
    <button class="nav-icon" id="nav-cart-btn" aria-label="Troli" style="position:relative">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 01-8 0"/></svg>
      <i class="nav-cart-badge" id="nav-badge">0</i>
    </button>
    <button class="hamburger" id="hamburger" aria-label="Menu" aria-expanded="false">
      <span></span><span></span><span></span>
    </button>
  </div>
</nav>

<!-- SEARCH BAR -->
<div class="nav-search-bar" id="nav-search-bar">
  <div class="nav-search-inner">
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
    <input type="text" id="nav-search-input" placeholder="Cari wangian..." autocomplete="off">
    <button onclick="closeNavSearch()" aria-label="Tutup">
      <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
</div>

<!-- MEGA MENU -->
<div class="mega-overlay" id="mega-overlay">
  <div class="mega-inner">
    <div class="mega-tabs">
      <button class="mega-tab active" id="mtab-m" onclick="switchMegaTab('m')">Men</button>
      <button class="mega-tab" id="mtab-w" onclick="switchMegaTab('w')">Women</button>
      <button class="mega-tab" id="mtab-u" onclick="switchMegaTab('u')">Unisex</button>
    </div>
    <div class="mega-search-wrap">
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input class="mega-search-input" placeholder="Cari wangian..." id="mega-search-input"
        onkeydown="if(event.key==='Enter'){ const q=this.value.trim(); if(q) window.location.href='koleksi.php?q='+encodeURIComponent(q); }">
    </div>
    <div class="mega-grid" id="mgrid-m"></div>
    <div class="mega-grid hidden" id="mgrid-w"></div>
    <div class="mega-grid hidden" id="mgrid-u"></div>
    <div class="mega-footer-links">
      <a href="tentang.php" onclick="closeMegaMenu()">Tentang Kami</a>
      <a href="faq.php" onclick="closeMegaMenu()">FAQ</a>
      <a href="#shipping" onclick="closeMegaMenu()">Penghantaran</a>
      <a href="https://wa.me/601159003985" target="_blank">WhatsApp</a>
    </div>
  </div>
</div>
