<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Koleksi — The Artisan Parfum</title>
<meta name="description" content="165 wangian premium terinspirasi jenama dunia. Terokai koleksi lengkap kami.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23111'/><text x='32' y='46' text-anchor='middle' font-size='38' font-family='Georgia,serif' fill='%23fff'>a</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
<link rel="stylesheet" href="css/koleksi.css">
</head>
<body>

<?php include 'components/header.php'; ?>

<div class="page-wrap">

  <!-- Search Bar -->
  <div class="search-bar-wrapper" style="padding:20px 40px 0;display:flex;justify-content:flex-end;">
    <div class="search-bar">
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="text" id="search-input" placeholder="Cari wangian..." autocomplete="off">
      <button id="search-clear" style="display:none" onclick="clearSearch()">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>
  </div>

  <!-- PRODUCTS -->
  <section class="products-section">
    <div class="products-count" id="products-count"></div>
    <div class="products-grid" id="products-grid">
      <div class="grid-loading">
        <div class="spinner"></div>
        Memuatkan koleksi...
      </div>
    </div>
  </section>

</div>

<!-- PRODUCT MODAL (Bottom Sheet) -->
<div class="pm-overlay" id="pm-overlay" onclick="if(event.target===this) closeProductModal()">
  <div class="pm-sheet" id="pm-sheet">
    <button class="pm-close" onclick="closeProductModal()" aria-label="Tutup">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="pm-header">
      <div class="pm-header-bottle" id="pm-bottle-wrap"></div>
      <div class="pm-header-info">
        <p class="pm-insp" id="pm-insp-text"></p>
        <h2 class="pm-name" id="pm-name-text"></h2>
        <p class="pm-family" id="pm-family-text"></p>
        <div class="pm-prices">
          <span class="pm-price-from">Dari</span>
          <span class="pm-price-main" id="pm-price-main">RM —</span>
          <span class="pm-price-old" id="pm-price-old"></span>
        </div>
        <div class="pm-stock-info" id="pm-stock-info">
          <span class="pm-stock-dot" id="pm-stock-dot"></span>
          <span id="pm-stock-text"></span>
        </div>
      </div>
    </div>
    <div class="pm-section" id="pm-scents-section">
      <div class="pm-section-label">Pilih Wangian</div>
      <div class="scent-variations" id="pm-scents-wrap"></div>
    </div>
    <div class="pm-section">
      <div class="pm-section-label">Saiz & Harga</div>
      <div class="size-options">
        <button class="size-btn" id="size-10" onclick="selectSize('10ml')">
          <span class="ml">10ml</span>
          <span class="price-now" id="sz-price-10">RM —</span>
          <span class="price-was" id="sz-was-10"></span>
        </button>
        <button class="size-btn" id="size-30" onclick="selectSize('30ml')">
          <span class="ml">30ml</span>
          <span class="price-now" id="sz-price-30">RM —</span>
          <span class="price-was" id="sz-was-30"></span>
        </button>
        <button class="size-btn" id="size-60" onclick="selectSize('60ml')">
          <span class="ml">60ml</span>
          <span class="price-now" id="sz-price-60">RM —</span>
          <span class="price-was" id="sz-was-60"></span>
        </button>
      </div>
    </div>
    <div class="pm-section">
      <div class="pm-section-label">Kuantiti</div>
      <div class="qty-row">
        <div class="qty-stepper">
          <button class="qty-step-btn" onclick="changeQty(-1)">−</button>
          <div class="qty-display" id="qty-display">1</div>
          <button class="qty-step-btn" onclick="changeQty(1)">+</button>
        </div>
        <span class="qty-hint" id="qty-stock-hint"></span>
      </div>
    </div>
  </div>
</div>

<!-- STICKY ADD TO CART FOOTER -->
<div class="pm-footer" id="pm-footer" style="display:none">
  <div class="pm-total-display">
    <div class="pm-total-label">Jumlah</div>
    <div class="pm-total-value" id="pm-total-display">RM —</div>
  </div>
  <button class="btn-add-to-cart-main" id="pm-add-btn" onclick="modalAddToCart()">
    + Tambah ke Troli
  </button>
</div>

<?php include 'components/footer.php'; ?>

<script src="js/config.js"></script>
<script src="js/koleksi.js"></script>
</body>
</html>
