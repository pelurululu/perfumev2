<!DOCTYPE html>
<html lang="ms">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>The Artisan Parfum</title>
<meta name="description" content="165 wangian premium terinspirasi jenama dunia. 10ml RM25 · 30ml RM49 · 60ml RM79.">
<link rel="icon" href="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'><rect width='64' height='64' fill='%23111'/><text x='32' y='46' text-anchor='middle' font-size='38' font-family='Georgia,serif' fill='%23fff'>a</text></svg>">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;1,300;1,400&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500&display=swap" rel="stylesheet">
<link rel="stylesheet" href="css/index.css">
<link rel="stylesheet" href="css/header.css">
<link rel="stylesheet" href="css/footer.css">
</head>
<body>

<?php include 'components/header.php'; ?>

<!-- HERO CAROUSEL -->
<section class="hero-carousel" id="top">
  <div class="hc-track" id="hc-track">
    <div class="hc-slide">
      <div class="hc-bg" style="background:linear-gradient(135deg,#1a1a2e 0%,#16213e 50%,#0f3460 100%)"></div>
      <div class="hc-content">
        <div class="hc-eyebrow">Koleksi Tandatangan</div>
        <h1 class="hc-title">Wangian yang<br><em>Bercerita</em></h1>
        <p class="hc-desc">165 wangian premium terinspirasi jenama dunia.</p>
        <a href="#collection" class="hc-btn" onclick="event.preventDefault(); document.getElementById('collection').scrollIntoView({behavior:'smooth'});">Terokai Koleksi</a>
      </div>
    </div>
    <div class="hc-slide">
      <div class="hc-bg" style="background:linear-gradient(135deg,#111 0%,#222 50%,#111 100%)"></div>
      <div class="hc-content">
        <div class="hc-eyebrow">Untuk Lelaki</div>
        <h1 class="hc-title">55 Wangian<br><em>Maskulin</em></h1>
        <p class="hc-desc">Dari woody smoky hingga fresh aquatic.</p>
        <a href="#collection" class="hc-btn" onclick="event.preventDefault(); document.getElementById('collection').scrollIntoView({behavior:'smooth'});">Lihat Koleksi Men</a>
      </div>
    </div>
    <div class="hc-slide">
      <div class="hc-bg" style="background:linear-gradient(135deg,#1c1c1e 0%,#2c2c2e 50%,#1c1c1e 100%)"></div>
      <div class="hc-content">
        <div class="hc-eyebrow">Untuk Wanita</div>
        <h1 class="hc-title">98 Wangian<br><em>Feminin</em></h1>
        <p class="hc-desc">Floral intim, oriental hangat, fresh ringan.</p>
        <a href="#collection" class="hc-btn hc-btn--ghost" onclick="event.preventDefault(); document.getElementById('collection').scrollIntoView({behavior:'smooth'});">Lihat Koleksi Women</a>
      </div>
    </div>
  </div>
  <div class="hc-dots" id="hc-dots">
    <button class="hc-dot active" onclick="hcGoTo(0)"></button>
    <button class="hc-dot" onclick="hcGoTo(1)"></button>
    <button class="hc-dot" onclick="hcGoTo(2)"></button>
  </div>
  <div class="hc-counter"><span id="hc-current">1</span> / <span id="hc-total">3</span></div>
</section>

<!-- ENTRY GRID -->
<section class="entry-grid" id="collection">
  <div class="entry-card" id="entry-m" data-gender="m" style="cursor:pointer">
    <div class="entry-card-bg"></div>
    <div class="entry-card-info">
      <div class="entry-card-label">Koleksi</div>
      <div class="entry-card-title">Men</div>
      <div class="entry-card-count" id="entry-m-count">55 wangian</div>
      <div class="entry-card-arrow">Shop Now →</div>
    </div>
  </div>
  <div class="entry-card" id="entry-w" data-gender="w" style="cursor:pointer">
    <div class="entry-card-bg"></div>
    <div class="entry-card-info">
      <div class="entry-card-label">Koleksi</div>
      <div class="entry-card-title">Women</div>
      <div class="entry-card-count" id="entry-w-count">98 wangian</div>
      <div class="entry-card-arrow">Shop Now →</div>
    </div>
  </div>
  <div class="entry-card" id="entry-u" data-gender="u" style="cursor:pointer">
    <div class="entry-card-bg"></div>
    <div class="entry-card-info">
      <div class="entry-card-label">Koleksi</div>
      <div class="entry-card-title">Unisex</div>
      <div class="entry-card-count" id="entry-u-count">Untuk semua</div>
      <div class="entry-card-arrow">Shop Now →</div>
    </div>
  </div>
</section>

<!-- BUNDLE BANNER -->
<section class="bundle-banner reveal" id="bundle">
  <div>
    <div class="bundle-label">Tawaran Eksklusif</div>
    <h2>Beli 3×60ml<br><em>Percuma 1×30ml</em></h2>
    <p class="bundle-body">Gabungkan tiga wangian kegemaran anda dan dapatkan satu botol 30ml percuma pilihan anda sendiri.</p>
    <ul class="bundle-perks">
      <li>Pilih mana-mana 3 wangian 60ml</li>
      <li>Dapat 1 botol 30ml percuma — pilihan anda</li>
      <li>Jimat sehingga RM 49</li>
      <li>Pembungkusan premium — sempurna untuk hadiah</li>
    </ul>
  </div>
  <div class="bundle-visual-side">
    <div class="bundle-bottles">
      <svg width="48" height="148" viewBox="0 0 48 148" fill="none"><defs><linearGradient id="bv1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#333" stop-opacity=".3"/><stop offset="50%" stop-color="#333" stop-opacity=".9"/><stop offset="100%" stop-color="#333" stop-opacity=".3"/></linearGradient></defs><rect x="16" y="0" width="16" height="10" rx="3" fill="#111"/><rect x="15" y="10" width="18" height="6" rx="1" fill="#111" opacity=".6"/><rect x="7" y="16" width="34" height="124" rx="2.5" fill="url(#bv1)"/><rect x="9" y="18" width="5" height="120" rx="1" fill="rgba(255,255,255,.06)"/></svg>
      <svg width="60" height="168" viewBox="0 0 60 168" fill="none"><defs><linearGradient id="bv2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#444" stop-opacity=".3"/><stop offset="50%" stop-color="#444" stop-opacity=".9"/><stop offset="100%" stop-color="#444" stop-opacity=".3"/></linearGradient></defs><rect x="20" y="0" width="20" height="12" rx="4" fill="#111"/><rect x="19" y="12" width="22" height="7" rx="1" fill="#111" opacity=".6"/><rect x="9" y="19" width="42" height="142" rx="3" fill="url(#bv2)"/><rect x="11" y="21" width="7" height="138" rx="1.5" fill="rgba(255,255,255,.06)"/></svg>
      <svg width="48" height="148" viewBox="0 0 48 148" fill="none"><defs><linearGradient id="bv3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#555" stop-opacity=".3"/><stop offset="50%" stop-color="#555" stop-opacity=".9"/><stop offset="100%" stop-color="#555" stop-opacity=".3"/></linearGradient></defs><rect x="16" y="0" width="16" height="10" rx="3" fill="#111"/><rect x="15" y="10" width="18" height="6" rx="1" fill="#111" opacity=".6"/><rect x="7" y="16" width="34" height="124" rx="2.5" fill="url(#bv3)"/><rect x="9" y="18" width="5" height="120" rx="1" fill="rgba(255,255,255,.06)"/></svg>
    </div>
  </div>
</section>

<!-- PRICE STRIP -->
<section class="strip reveal">
  <div class="strip-item"><div class="strip-size">10ml</div><div class="strip-price">RM 25</div><div class="strip-desc">Dari RM 35</div></div>
  <div class="strip-item"><div class="strip-size">30ml</div><div class="strip-price">RM 49</div><div class="strip-desc">Dari RM 69</div></div>
  <div class="strip-item"><div class="strip-size">60ml</div><div class="strip-price">RM 79</div><div class="strip-desc">Dari RM 99</div></div>
</section>

<!-- FEATURES -->
<section class="features">
  <div class="feature reveal">
    <div class="feature-num">01</div>
    <div class="feature-title">Pati Berkualiti Tinggi</div>
    <p class="feature-body">Setiap wangian menggunakan pati diimport dari pembekal bertauliah. Tahan lama, proyeksi kuat.</p>
  </div>
  <div class="feature reveal delay-1">
    <div class="feature-num">02</div>
    <div class="feature-title">165 Pilihan Wangian</div>
    <p class="feature-body">Dari koleksi lelaki, wanita hingga unisex — ada untuk setiap suasana dan peribadi.</p>
  </div>
  <div class="feature reveal delay-2">
    <div class="feature-num">03</div>
    <div class="feature-title">Harga Berbaloi</div>
    <p class="feature-body">Nikmati wangian bertaraf jenama mewah pada harga yang mampu milik. Mulai RM 25 sahaja.</p>
  </div>
</section>

<!-- TESTIMONIALS -->
<section class="testi-section reveal">
  <div class="testi-label">Apa Kata Pelanggan</div>
  <div class="testi-grid">
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-body">"Saya pesan Baccarat Rouge dupe dan ia memang luar biasa. Tahan lebih 8 jam. Sangat berbaloi!"</p>
      <div class="testi-name">Nurul A.</div>
      <div class="testi-location">Kuala Lumpur</div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-body">"Packaging cantik, wangian tahan lama. Dah order 3 kali. Memang jadi pilihan utama sekarang."</p>
      <div class="testi-name">Hafiz R.</div>
      <div class="testi-location">Johor Bahru</div>
    </div>
    <div class="testi-card">
      <div class="testi-stars">★★★★★</div>
      <p class="testi-body">"Bundle 3+1 sangat worth it. Dapat cuba pelbagai wangian tanpa bazir duit banyak."</p>
      <div class="testi-name">Siti N.</div>
      <div class="testi-location">Penang</div>
    </div>
  </div>
</section>

<!-- SHIPPING -->
<section class="shipping-row reveal" id="shipping">
  <div class="shipping-item"><div class="shipping-title">Penghantaran Pantas</div><div class="shipping-body">Dihantar dalam 1–3 hari bekerja. Tracking tersedia.</div></div>
  <div class="shipping-item"><div class="shipping-title">Pembungkusan Selamat</div><div class="shipping-body">Dibungkus dengan teliti untuk memastikan produk sampai dalam keadaan sempurna.</div></div>
  <div class="shipping-item"><div class="shipping-title">Bayaran Selamat</div><div class="shipping-body">FPX, kad kredit, dan e-wallet diterima melalui ToyyibPay.</div></div>
  <div class="shipping-item"><div class="shipping-title">Hubungi Kami</div><div class="shipping-body">Ada soalan? Hubungi kami melalui WhatsApp untuk respons segera.</div></div>
</section>

<!-- PROMO POPUP -->
<div class="promo-popup-overlay" id="promo-overlay" onclick="if(event.target===this)closePromoPopup()">
  <div class="promo-popup">
    <button class="promo-close" onclick="closePromoPopup()" aria-label="Tutup">
      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
    <div class="promo-popup-img" id="promo-popup-img-wrap">
      <svg viewBox="0 0 420 480" fill="none" xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
        <rect width="420" height="480" fill="#f0ede8"/>
        <defs>
          <linearGradient id="pb1" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#333" stop-opacity=".2"/><stop offset="50%" stop-color="#333" stop-opacity=".85"/><stop offset="100%" stop-color="#333" stop-opacity=".2"/></linearGradient>
          <linearGradient id="pb2" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#111" stop-opacity=".25"/><stop offset="50%" stop-color="#111" stop-opacity=".9"/><stop offset="100%" stop-color="#111" stop-opacity=".25"/></linearGradient>
          <linearGradient id="pb3" x1="0" y1="0" x2="1" y2="0"><stop offset="0%" stop-color="#555" stop-opacity=".2"/><stop offset="50%" stop-color="#555" stop-opacity=".85"/><stop offset="100%" stop-color="#555" stop-opacity=".2"/></linearGradient>
        </defs>
        <rect x="40" y="300" width="340" height="10" rx="3" fill="rgba(0,0,0,.08)"/>
        <rect x="78" y="174" width="13" height="10" rx="2.5" fill="#111"/><rect x="77" y="184" width="15" height="5" rx="1" fill="#111" opacity=".55"/><rect x="69" y="189" width="30" height="112" rx="2.5" fill="url(#pb1)"/><rect x="71" y="191" width="4.5" height="108" rx="1" fill="rgba(255,255,255,.07)"/>
        <rect x="200" y="148" width="20" height="13" rx="4" fill="#111"/><rect x="199" y="161" width="22" height="7" rx="1" fill="#111" opacity=".55"/><rect x="190" y="168" width="40" height="136" rx="3" fill="url(#pb2)"/><rect x="192" y="170" width="6" height="132" rx="1.5" fill="rgba(255,255,255,.07)"/>
        <rect x="314" y="182" width="13" height="10" rx="2.5" fill="#111"/><rect x="313" y="192" width="15" height="5" rx="1" fill="#111" opacity=".55"/><rect x="305" y="197" width="30" height="106" rx="2.5" fill="url(#pb3)"/><rect x="307" y="199" width="4.5" height="102" rx="1" fill="rgba(255,255,255,.07)"/>
        <text x="210" y="338" text-anchor="middle" font-family="Georgia,serif" font-size="9" font-style="italic" fill="rgba(0,0,0,.2)" letter-spacing="2">the artisan parfum</text>
      </svg>
    </div>
    <div class="promo-popup-body">
      <div class="promo-popup-eyebrow">Tawaran Eksklusif</div>
      <h2 class="promo-popup-title">Beli <em>3×60ml</em><br>Percuma <em>1×30ml</em></h2>
      <p class="promo-popup-desc">Pilih mana-mana 3 wangian 60ml dan dapatkan 1 botol 30ml percuma pilihan anda.</p>
      <p class="promo-popup-saving">Jimat sehingga <strong>RM 49</strong></p>
      <a href="#bundle" class="promo-popup-cta" onclick="closePromoPopup()">Beli Sekarang →</a>
      <label class="promo-popup-check">
        <input type="checkbox" id="promo-dont-show" onchange="handleDontShow(this)">
        <span>Jangan tunjuk lagi</span>
      </label>
    </div>
  </div>
</div>

<?php include 'components/footer.php'; ?>

<script src="js/config.js"></script>
<script src="js/products.js"></script>
<script src="js/cart.js"></script>
<script src="js/ui.js"></script>
<script src="js/main.js"></script>
<script src="js/index.js"></script>
</body>
</html>
