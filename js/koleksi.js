'use strict';

/* ─── STATE ─── */
let PRODUCTS      = [];
let currentGender = 'all';
let searchQuery   = '';
let searchDebounce;

/* ─── MODAL STATE ─── */
let modalProductId = null;
let modalScent     = null;
let modalSize      = null;
let modalQty       = 1;

/* ─── CART STATE ─── */
let cart = JSON.parse(localStorage.getItem(CONFIG.KEYS.CART) || '[]');
let cartCountdownEnd   = 0;
let cartCountdownTimer = null;

/* =====================================================
   SVG HELPERS
===================================================== */
function createMiniBottleSVG(cap, rgbStr) {
  const [r, g, b] = (rgbStr || '155,85,110').split(',').map(Number);
  const uid = Math.random().toString(36).slice(2);
  return `<svg width="44" height="86" viewBox="0 0 44 86" fill="none" aria-hidden="true">
    <defs><linearGradient id="mb_${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgb(${r},${g},${b})" stop-opacity=".28"/>
      <stop offset="50%" stop-color="rgb(${r},${g},${b})" stop-opacity=".9"/>
      <stop offset="100%" stop-color="rgb(${r},${g},${b})" stop-opacity=".28"/>
    </linearGradient></defs>
    <rect x="15" y="0" width="14" height="10" rx="3" fill="${cap || '#3A1828'}"/>
    <rect x="14" y="9" width="16" height="6" rx="1" fill="${cap || '#3A1828'}" opacity=".65"/>
    <rect x="5" y="15" width="34" height="66" rx="3" fill="url(#mb_${uid})" stroke="rgba(0,0,0,.08)" stroke-width=".5"/>
    <rect x="7" y="17" width="6" height="62" rx="1.5" fill="rgba(255,255,255,.06)"/>
    <rect x="8" y="32" width="28" height="28" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.07)" stroke-width=".4"/>
    <text x="22" y="43" text-anchor="middle" font-family="Georgia,serif" font-size="2.6" fill="rgba(255,255,255,.45)" letter-spacing=".8">THE ARTISAN</text>
    <text x="22" y="50" text-anchor="middle" font-family="Georgia,serif" font-size="2.6" fill="rgba(255,255,255,.45)" letter-spacing=".8">PARFUM</text>
    <ellipse cx="22" cy="82" rx="10" ry="1.5" fill="rgba(0,0,0,.06)"/>
  </svg>`;
}

function createCardBottleSVG(productId, cap, rgbStr) {
  const [r, g, b] = (rgbStr || '155,85,110').split(',').map(Number);
  const gradId = 'cg_' + String(productId).replace(/\W/g, '_');
  return `<svg width="72" height="200" viewBox="0 0 72 200" fill="none" aria-hidden="true">
    <defs><linearGradient id="${gradId}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgb(${r},${g},${b})" stop-opacity=".22"/>
      <stop offset="46%" stop-color="rgb(${r},${g},${b})" stop-opacity=".9"/>
      <stop offset="100%" stop-color="rgb(${r},${g},${b})" stop-opacity=".22"/>
    </linearGradient></defs>
    <rect x="26" y="0" width="20" height="14" rx="4" fill="${cap || '#3A1828'}"/>
    <rect x="24" y="14" width="24" height="9" rx="1" fill="${cap || '#3A1828'}" opacity=".6"/>
    <rect x="13" y="23" width="46" height="168" rx="4" fill="url(#${gradId})" stroke="rgba(0,0,0,.08)" stroke-width=".5"/>
    <rect x="15" y="25" width="7" height="164" rx="2" fill="rgba(255,255,255,.055)"/>
    <rect x="16" y="72" width="40" height="62" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.07)" stroke-width=".4"/>
    <text x="36" y="95" text-anchor="middle" font-family="Georgia,serif" font-size="3.8" fill="rgba(255,255,255,.45)" letter-spacing="1">THE ARTISAN</text>
    <text x="36" y="107" text-anchor="middle" font-family="Georgia,serif" font-size="3.8" fill="rgba(255,255,255,.45)" letter-spacing="1">PARFUM</text>
    <ellipse cx="36" cy="195" rx="15" ry="2" fill="rgba(0,0,0,.06)"/>
  </svg>`;
}

function miniSVG(cap, rgbStr) {
  const [r, g, b] = (rgbStr || '155,85,110').split(',').map(Number);
  const uid = Math.random().toString(36).slice(2);
  return `<svg width="32" height="56" viewBox="0 0 32 56" fill="none">
    <defs><linearGradient id="cs_${uid}" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0%" stop-color="rgb(${r},${g},${b})" stop-opacity=".28"/>
      <stop offset="50%" stop-color="rgb(${r},${g},${b})" stop-opacity=".86"/>
      <stop offset="100%" stop-color="rgb(${r},${g},${b})" stop-opacity=".28"/>
    </linearGradient></defs>
    <rect x="11" y="0" width="10" height="7" rx="2" fill="${cap || '#3A1828'}"/>
    <rect x="10" y="6" width="12" height="4" rx="1" fill="${cap || '#3A1828'}" opacity=".6"/>
    <rect x="4" y="10" width="24" height="42" rx="2.5" fill="url(#cs_${uid})" stroke="rgba(0,0,0,.08)" stroke-width=".4"/>
  </svg>`;
}

/* =====================================================
   STOCK HELPERS
===================================================== */
function getStock(id) {
  const s = JSON.parse(localStorage.getItem(CONFIG.KEYS.STOCK) || '{}');
  const p = PRODUCTS.find(x => x.id === id);
  return s[id] !== undefined ? s[id] : (p?.stock ?? CONFIG.INITIAL_STOCK);
}

function decrementStock(id, qty = 1) {
  const s = JSON.parse(localStorage.getItem(CONFIG.KEYS.STOCK) || '{}');
  s[id] = Math.max(0, (s[id] ?? CONFIG.INITIAL_STOCK) - qty);
  localStorage.setItem(CONFIG.KEYS.STOCK, JSON.stringify(s));
  sbFetch('products?id=eq.' + id, { method: 'PATCH', headers: { 'Prefer': 'return=minimal' }, body: JSON.stringify({ stock: s[id] }) }).catch(() => {});
}

function initStock() {
  const stored = JSON.parse(localStorage.getItem(CONFIG.KEYS.STOCK) || '{}');
  let updated = false;
  PRODUCTS.forEach(p => { if (stored[p.id] === undefined) { stored[p.id] = p.stock ?? CONFIG.INITIAL_STOCK; updated = true; } });
  if (updated) localStorage.setItem(CONFIG.KEYS.STOCK, JSON.stringify(stored));
}

/* =====================================================
   LOAD DATA
===================================================== */
async function loadPricing() {
  try {
    const rows = await sbFetch('pricing?select=size,normal_price,promo_price');
    if (rows && rows.length) {
      rows.forEach(r => { CONFIG.PRICES[r.size] = { normal: r.normal_price, promo: r.promo_price }; });
    }
  } catch(e) {}
}

async function loadProducts() {
  try {
    const rows = await sbFetch('products?active=eq.true&order=id.asc&select=*');
    PRODUCTS = rows || [];
    initStock();
    updateNavActiveState();
    renderGrid();
  } catch(e) {
    document.getElementById('products-grid').innerHTML =
      '<div class="no-results" style="color:var(--red)">Gagal memuatkan produk. Cuba muat semula.</div>';
  }
}

function updateNavActiveState() {
  document.querySelectorAll('.nav-center-links a').forEach(a => a.classList.remove('active'));
  if (currentGender !== 'all') {
    const map = { m: 'nav-men', w: 'nav-women', u: 'nav-unisex' };
    const navEl = document.getElementById(map[currentGender]);
    if (navEl) navEl.classList.add('active');
  }
}

async function init() {
  const params = new URLSearchParams(window.location.search);
  if (params.get('gender')) currentGender = params.get('gender');
  if (params.get('q')) {
    searchQuery = params.get('q').toLowerCase();
    document.getElementById('search-input').value = params.get('q');
    document.getElementById('search-clear').style.display = 'block';
  }
  await loadPricing();
  await loadProducts();
  refreshCartUI();
  loadScentFamiliesForMega();
}

/* =====================================================
   GRID RENDER — grouped by scent family, 1 product each
===================================================== */
function getFiltered() {
  return PRODUCTS.filter(p => {
    const gOk = currentGender === 'all' || p.gender === currentGender;
    const qOk = !searchQuery || [p.name, p.inspired_by, p.family, p.notes].join(' ').toLowerCase().includes(searchQuery);
    return gOk && qOk;
  });
}

/* Pick the best representative: badge priority, else first */
function pickRepresentative(products) {
  const priority = ['Hot', 'Bestseller', 'Trending', 'Exclusive', 'New'];
  for (const badge of priority) {
    const found = products.find(p => p.badge === badge);
    if (found) return found;
  }
  return products[0];
}

function buildProductCard(p) {
  const stk     = getStock(p.id);
  const pct     = Math.max(0, Math.min(100, (stk / CONFIG.INITIAL_STOCK) * 100));
  const isOut   = stk === 0;
  const fillCls = stk === 0 ? 'crit' : stk <= 8 ? 'crit' : stk <= 18 ? 'low' : '';
  const pr      = CONFIG.PRICES;

  let badgeHtml = '';
  if (p.badge) {
    const bc = ['Exclusive'].includes(p.badge) ? 'badge-exclusive'
             : ['Hot','Bestseller','Trending'].includes(p.badge) ? 'badge-hot'
             : 'badge-new';
    badgeHtml = `<span class="card-badge ${bc}">${p.badge}</span>`;
  }

  const visual = p.image_url
    ? `<img class="product-card-img" src="${p.image_url}" alt="${p.name}" loading="lazy">`
    : `<div class="product-card-bottle" style="background:radial-gradient(ellipse 80% 80% at 50% 40%,rgba(${p.rgb||'155,85,110'},.18) 0%,transparent 100%)">${createCardBottleSVG(p.id, p.cap_color, p.rgb)}</div>`;

  return `
    <div class="product-card${isOut ? ' sold-out' : ''}" onclick="openProductModal('${p.id}')" role="button" tabindex="0" aria-label="${p.name}">
      <div class="product-card-visual">
        ${visual}
        ${badgeHtml}
        <div class="card-tap-hint">Pilih Saiz & Wangian</div>
      </div>
      <div class="product-card-info">
        <p class="card-inspired">Terinspirasi oleh ${p.inspired_by}</p>
        <h3 class="card-name">${p.family}</h3>
        <p class="card-family">${p.notes || ''}</p>
        <div class="card-prices">
          <span class="card-price-from">Dari</span>
          <span class="card-price-main">RM ${pr['10ml'].promo}</span>
          <span class="card-price-normal">RM ${pr['10ml'].normal}</span>
        </div>
        <div class="card-stock-bar"><div class="card-stock-fill ${fillCls}" style="width:${pct}%"></div></div>
        <span class="card-stock-text${stk <= 8 ? ' urgent' : ''}">
          ${isOut ? '⚠ Stok Habis' : stk <= 8 ? `⚡ ${stk} unit berbaki` : `${stk} unit berbaki`}
        </span>
      </div>
    </div>`;
}

function renderGrid() {
  const container = document.getElementById('products-grid');
  const filtered  = getFiltered();

  if (filtered.length === 0) {
    document.getElementById('products-count').textContent = '';
    container.innerHTML = '<div class="no-results">Tiada wangian dijumpai untuk carian ini.</div>';
    return;
  }

  /* Group by family, preserving insertion order */
  const familyMap = new Map();
  filtered.forEach(p => {
    const key = p.family || 'Lain-lain';
    if (!familyMap.has(key)) familyMap.set(key, []);
    familyMap.get(key).push(p);
  });

  document.getElementById('products-count').textContent =
    `${familyMap.size} keluarga wangian · ${filtered.length} wangian`;

  container.innerHTML = '';

  familyMap.forEach((products, family) => {
    const rep         = pickRepresentative(products);
    const othersCount = products.length - 1;
    const encodedFam  = encodeURIComponent(family);

    const section = document.createElement('div');
    section.className = 'family-section';
    section.innerHTML = `
      <div class="family-product-row" id="fam-${encodedFam}">
        ${buildProductCard(rep)}
      </div>`;

    container.appendChild(section);
  });
}

/* Toggle expand/collapse a family row */
function expandFamily(encodedFamily) {
  const family   = decodeURIComponent(encodedFamily);
  const filtered = getFiltered().filter(p => (p.family || 'Lain-lain') === family);
  const rowEl    = document.getElementById('fam-' + encodedFamily);
  const btn      = rowEl.previousElementSibling.querySelector('.family-see-all');

  if (rowEl.classList.contains('expanded')) {
    rowEl.innerHTML = buildProductCard(pickRepresentative(filtered));
    rowEl.classList.remove('expanded');
    if (btn) btn.textContent = `Lihat ${filtered.length - 1} lagi →`;
  } else {
    rowEl.innerHTML = filtered.map(p => buildProductCard(p)).join('');
    rowEl.classList.add('expanded');
    if (btn) btn.textContent = 'Tutup ↑';
  }
}

/* =====================================================
   PRODUCT MODAL
===================================================== */
function openProductModal(productId) {
  const p = PRODUCTS.find(x => x.id === productId);
  if (!p) return;

  modalProductId = productId;
  modalScent = null;
  modalSize  = null;
  modalQty   = 1;

  document.getElementById('pm-bottle-wrap').innerHTML   = createMiniBottleSVG(p.cap_color, p.rgb);
  document.getElementById('pm-insp-text').textContent   = 'Terinspirasi oleh ' + (p.inspired_by || '');
  document.getElementById('pm-name-text').textContent   = p.name;
  document.getElementById('pm-family-text').textContent = (p.family || '') + (p.notes ? ' · ' + p.notes : '');

  const pr = CONFIG.PRICES;
  document.getElementById('pm-price-main').textContent = 'RM ' + pr['10ml'].promo;
  document.getElementById('pm-price-old').textContent  = 'RM ' + pr['10ml'].normal;
  document.getElementById('sz-price-10').textContent   = 'RM ' + pr['10ml'].promo;
  document.getElementById('sz-was-10').textContent     = 'RM ' + pr['10ml'].normal;
  document.getElementById('sz-price-30').textContent   = 'RM ' + pr['30ml'].promo;
  document.getElementById('sz-was-30').textContent     = 'RM ' + pr['30ml'].normal;
  document.getElementById('sz-price-60').textContent   = 'RM ' + pr['60ml'].promo;
  document.getElementById('sz-was-60').textContent     = 'RM ' + pr['60ml'].normal;

  const stk = getStock(productId);
  const dot = document.getElementById('pm-stock-dot');
  dot.className = 'pm-stock-dot' + (stk === 0 ? ' out' : stk <= 8 ? ' low' : '');
  document.getElementById('pm-stock-text').textContent  = stk === 0 ? 'Stok habis' : stk <= 8 ? `Hanya ${stk} unit berbaki!` : `${stk} unit tersedia`;
  document.getElementById('qty-stock-hint').textContent = stk > 0 ? `Maks ${Math.min(stk, 10)} unit` : '';

  buildScentVariations(p);
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('qty-display').textContent = '1';
  updateModalTotal();

  const footer = document.getElementById('pm-footer');
  footer.style.display = 'flex';
  document.getElementById('pm-add-btn').textContent = '+ Tambah ke Troli';
  document.getElementById('pm-add-btn').classList.remove('added');
  document.getElementById('pm-add-btn').disabled = stk === 0;

  document.getElementById('pm-overlay').classList.add('visible');
  document.body.classList.add('lock');
  document.getElementById('pm-sheet').scrollTop = 0;
}

/* Scent chips = all products in the same family + gender */
function buildScentVariations(currentProduct) {
  const sameFamily = PRODUCTS.filter(
    p => (p.family || '') === (currentProduct.family || '') && p.gender === currentProduct.gender
  );
  const wrap = document.getElementById('pm-scents-wrap');

  if (sameFamily.length <= 1) {
    document.getElementById('pm-scents-section').style.display = 'none';
    modalScent = currentProduct.id;
    return;
  }

  document.getElementById('pm-scents-section').style.display = 'block';
  wrap.innerHTML = sameFamily.map((p, i) => {
    const stk   = getStock(p.id);
    const isOut = stk === 0;
    let badgeHtml = '';
    if (p.badge === 'Hot' || p.badge === 'Bestseller') badgeHtml = `<span class="scent-chip-hot chip-badge-hot">${p.badge}</span>`;
    else if (p.badge === 'New') badgeHtml = `<span class="scent-chip-hot chip-badge-new">New</span>`;
    return `<button class="scent-chip-btn${isOut ? ' out-chip' : ''}${p.id === currentProduct.id ? ' selected' : ''}" data-scent-id="${p.id}" onclick="selectScent('${p.id}')">
      <span class="scent-chip-num">${i + 1}.</span> ${p.name} ${badgeHtml}
    </button>`;
  }).join('');
  modalScent = currentProduct.id;
}

function selectScent(scentId) {
  modalScent = scentId;
  document.querySelectorAll('.scent-chip-btn').forEach(b => b.classList.toggle('selected', b.dataset.scentId === scentId));
  const p   = PRODUCTS.find(x => x.id === scentId);
  const stk = getStock(scentId);
  if (p) {
    document.getElementById('pm-insp-text').innerHTML    = `Terinspirasi oleh <strong>${p.inspired_by}</strong>`;
    document.getElementById('pm-name-text').textContent  = p.name;
    document.getElementById('pm-family-text').textContent = p.family + (p.notes ? ' · ' + p.notes : '');
    document.getElementById('pm-bottle-wrap').innerHTML  = createMiniBottleSVG(p.cap_color, p.rgb);
  }
  const dot = document.getElementById('pm-stock-dot');
  dot.className = 'pm-stock-dot' + (stk === 0 ? ' out' : stk <= 8 ? ' low' : '');
  document.getElementById('pm-stock-text').textContent    = stk === 0 ? 'Stok habis' : stk <= 8 ? `Hanya ${stk} unit berbaki!` : `${stk} unit tersedia`;
  document.getElementById('pm-add-btn').disabled          = stk === 0;
  document.getElementById('qty-stock-hint').textContent   = stk > 0 ? `Maks ${Math.min(stk, 10)} unit` : '';
  modalQty = 1;
  document.getElementById('qty-display').textContent = '1';
  updateModalTotal();
}

function selectSize(size) {
  modalSize = size;
  document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
  document.getElementById('size-' + size.replace('ml', '')).classList.add('selected');
  const pr = CONFIG.PRICES[size];
  document.getElementById('pm-price-main').textContent = 'RM ' + pr.promo;
  document.getElementById('pm-price-old').textContent  = 'RM ' + pr.normal;
  updateModalTotal();
}

function changeQty(delta) {
  const targetId = modalScent || modalProductId;
  const stk = getStock(targetId);
  modalQty = Math.max(1, Math.min(Math.min(stk, 10), modalQty + delta));
  document.getElementById('qty-display').textContent = modalQty;
  updateModalTotal();
}

function updateModalTotal() {
  if (!modalSize) { document.getElementById('pm-total-display').textContent = 'RM —'; return; }
  document.getElementById('pm-total-display').textContent = 'RM ' + (CONFIG.PRICES[modalSize].promo * modalQty);
}

function closeProductModal() {
  document.getElementById('pm-overlay').classList.remove('visible');
  document.getElementById('pm-footer').style.display = 'none';
  document.body.classList.remove('lock');
  modalProductId = null; modalScent = null; modalSize = null; modalQty = 1;
}

function modalAddToCart() {
  const targetId = modalScent || modalProductId;
  if (!targetId) return;
  if (!modalSize) {
    document.querySelectorAll('.size-btn').forEach(b => { b.style.outline = '2px solid var(--red)'; setTimeout(() => b.style.outline = '', 1400); });
    document.querySelector('.size-options').classList.add('shake');
    setTimeout(() => document.querySelector('.size-options').classList.remove('shake'), 400);
    return;
  }
  const product = PRODUCTS.find(p => p.id === targetId);
  if (!product) return;
  const stk = getStock(targetId);
  if (stk === 0) return;
  const pricePerUnit = CONFIG.PRICES[modalSize].promo;
  const existing = cart.find(i => i.productId === targetId && i.size === modalSize);
  if (existing) existing.qty += modalQty;
  else cart.push({ productId: targetId, size: modalSize, pricePerUnit, qty: modalQty, name: product.name, inspiredBy: product.inspired_by, cap: product.cap_color, rgb: product.rgb });
  saveCart();
  decrementStock(targetId, modalQty);
  refreshCartUI();
  const btn = document.getElementById('pm-add-btn');
  btn.textContent = '✓ Ditambah!';
  btn.classList.add('added');
  setTimeout(() => { closeProductModal(); openCart(); }, 600);
}

/* =====================================================
   CART
===================================================== */
const saveCart      = () => localStorage.setItem(CONFIG.KEYS.CART, JSON.stringify(cart));
const getCartTotal  = () => cart.reduce((s, i) => s + i.pricePerUnit * i.qty, 0);
const getCartCount  = () => cart.reduce((s, i) => s + i.qty, 0);
const getCartSaving = () => cart.reduce((s, i) => s + (CONFIG.PRICES[i.size].normal - i.pricePerUnit) * i.qty, 0);
const count60ml     = () => cart.filter(i => i.size === '60ml').reduce((s, i) => s + i.qty, 0);

function removeFromCart(productId, size) {
  cart = cart.filter(i => !(i.productId === productId && i.size === size));
  saveCart(); refreshCartUI();
}

function changeCartQty(productId, size, delta) {
  const item = cart.find(i => i.productId === productId && i.size === size);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart(); refreshCartUI();
}

function refreshCartUI() {
  const count  = getCartCount(), total = getCartTotal(), saving = getCartSaving(), qty60 = count60ml();

  document.getElementById('nav-badge').textContent        = count;
  document.getElementById('float-cart-badge').textContent = count;
  document.getElementById('nav-badge').classList.toggle('visible', count > 0);
  document.getElementById('float-cart').style.display     = count > 0 ? 'flex' : 'none';
  document.getElementById('cart-count-label').textContent = count > 0 ? `${count} item` : '';

  const emptyEl = document.getElementById('cart-empty'), itemsEl = document.getElementById('cart-items-list'), footerEl = document.getElementById('cart-footer');

  if (count === 0) {
    emptyEl.style.display = 'block'; footerEl.style.display = 'none'; itemsEl.innerHTML = '';
    document.getElementById('bundle-hint').style.display = 'none';
    document.getElementById('cart-countdown').style.display = 'none';
    clearInterval(cartCountdownTimer); return;
  }

  emptyEl.style.display = 'none'; footerEl.style.display = 'block';
  itemsEl.innerHTML = cart.map(item => `
    <div class="cart-item">
      <div class="cart-item-visual">${miniSVG(item.cap, item.rgb)}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-insp">Terinspirasi: ${item.inspiredBy}</div>
        <div class="cart-item-size">${item.size} · RM ${item.pricePerUnit}</div>
        <div class="cart-item-controls">
          <div class="qty-control">
            <button class="qty-btn" onclick="changeCartQty('${item.productId}','${item.size}',-1)">−</button>
            <span class="qty-num">${item.qty}</span>
            <button class="qty-btn" onclick="changeCartQty('${item.productId}','${item.size}',1)">+</button>
          </div>
          <span class="cart-item-price">RM ${item.pricePerUnit * item.qty}</span>
        </div>
        <button class="cart-item-remove-btn" onclick="removeFromCart('${item.productId}','${item.size}')">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14H6L5 6"/><path d="M10 11v6M14 11v6"/><path d="M9 6V4h6v2"/></svg> Buang
        </button>
      </div>
    </div>`).join('');

  const hintEl = document.getElementById('bundle-hint'), need = 3 - qty60;
  if (qty60 >= 3) hintEl.innerHTML = '<b>🎁 Bundle aktif!</b> Anda layak mendapat <b>1 botol 30ml PERCUMA</b>. Nyatakan pilihan dalam nota.';
  else if (qty60 > 0) hintEl.innerHTML = `<b>🎁 Hampir!</b> Tambah <b>${need}</b> lagi 60ml untuk 30ml <b>PERCUMA</b>.`;
  hintEl.style.display = qty60 > 0 ? 'block' : 'none';

  document.getElementById('cart-total-display').textContent   = 'RM ' + total;
  document.getElementById('cart-savings-display').textContent = saving > 0 ? `Jimat RM ${saving} daripada harga asal` : '';
  document.getElementById('cart-countdown').style.display     = 'flex';
  if (!cartCountdownEnd || cartCountdownEnd <= Date.now()) cartCountdownEnd = Date.now() + 15 * 60 * 1000;
  startCartCountdown();
}

function startCartCountdown() {
  clearInterval(cartCountdownTimer);
  const display = document.getElementById('cart-cd-display');
  cartCountdownTimer = setInterval(() => {
    const rem = Math.max(0, cartCountdownEnd - Date.now());
    const m = Math.floor(rem / 60000), s = Math.floor((rem % 60000) / 1000);
    if (display) display.textContent = `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
    if (rem === 0) cartCountdownEnd = Date.now() + 15 * 60 * 1000;
  }, 1000);
}

function openCart(e) {
  if (e) e.preventDefault();
  document.getElementById('cart-overlay').classList.add('visible');
  document.getElementById('cart-panel').classList.add('visible');
  document.body.classList.add('lock');
}

function closeCart() {
  document.getElementById('cart-overlay').classList.remove('visible');
  document.getElementById('cart-panel').classList.remove('visible');
  document.body.classList.remove('lock');
}

function sendCartViaWhatsApp() {
  if (!cart.length) return;
  const items = cart.map(i => `• ${i.name} (${i.size}) ×${i.qty} — RM ${i.pricePerUnit * i.qty}`).join('\n');
  const msg = `Salam, saya ingin pesan The Artisan Parfum:\n\n${items}\n\n*Jumlah: RM ${getCartTotal()}*\n\nTerima kasih!`;
  window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(msg)}`, '_blank');
}

/* =====================================================
   ORDER MODAL
===================================================== */
function openOrderModal() {
  if (!cart.length) return;
  closeCart();
  const sumEl = document.getElementById('modal-order-summary');
  sumEl.innerHTML = cart.map(i => `<div class="order-summary-item"><span>${i.name} ${i.size} ×${i.qty}</span><span>RM ${i.pricePerUnit * i.qty}</span></div>`).join('')
    + `<div class="order-summary-total"><span>Jumlah</span><span>RM ${getCartTotal()}</span></div>`;
  document.getElementById('modal-total-display').textContent = 'RM ' + getCartTotal();
  ['field-name','field-phone','field-email','field-address','field-state','field-postcode','field-note'].forEach(id => {
    const el = document.getElementById(id); if (el) { el.value = ''; el.classList.remove('invalid'); }
  });
  document.querySelectorAll('.form-error').forEach(e => e.classList.remove('visible'));
  document.getElementById('modal-form').style.display    = 'block';
  document.getElementById('modal-loading').style.display = 'none';
  document.getElementById('modal-success').style.display = 'none';
  document.getElementById('submit-btn').disabled         = false;
  document.getElementById('modal-overlay').classList.add('visible');
  document.body.classList.add('lock');
}

function closeOrderModal() {
  document.getElementById('modal-overlay').classList.remove('visible');
  document.body.classList.remove('lock');
}

const isValidEmail    = v => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const isValidPhone    = v => /^(\+?60|0)[0-9]{8,10}$/.test(v.replace(/[\s\-]/g, ''));
const isValidPostcode = v => /^\d{5}$/.test(v.trim());

function setInvalid(fId, eId)  { document.getElementById(fId)?.classList.add('invalid');    document.getElementById(eId)?.classList.add('visible'); }
function clearInvalid(fId, eId){ document.getElementById(fId)?.classList.remove('invalid'); document.getElementById(eId)?.classList.remove('visible'); }

function handleOrderSubmit() {
  const name = document.getElementById('field-name').value.trim(), phone = document.getElementById('field-phone').value.trim(),
    email = document.getElementById('field-email').value.trim(), address = document.getElementById('field-address').value.trim(),
    state = document.getElementById('field-state').value, postcode = document.getElementById('field-postcode').value.trim(),
    note  = document.getElementById('field-note').value.trim();
  let ok = true;
  if (name.length < 3)               { setInvalid('field-name','err-name');        ok = false; } else clearInvalid('field-name','err-name');
  if (!isValidPhone(phone))          { setInvalid('field-phone','err-phone');       ok = false; } else clearInvalid('field-phone','err-phone');
  if (email && !isValidEmail(email)) { setInvalid('field-email','err-email');       ok = false; } else clearInvalid('field-email','err-email');
  if (address.length < 10)           { setInvalid('field-address','err-address');   ok = false; } else clearInvalid('field-address','err-address');
  if (!state)                        { setInvalid('field-state','err-state');        ok = false; } else clearInvalid('field-state','err-state');
  if (!isValidPostcode(postcode))    { setInvalid('field-postcode','err-postcode'); ok = false; } else clearInvalid('field-postcode','err-postcode');
  if (!ok) return;

  document.getElementById('submit-btn').disabled         = true;
  document.getElementById('modal-form').style.display    = 'none';
  document.getElementById('modal-loading').style.display = 'block';

  const itemsFmt = cart.map(i => `• ${i.name} (${i.size}) ×${i.qty} = RM${i.pricePerUnit * i.qty}`).join('\n');
  setTimeout(() => {
    const waMsg = `*Pesanan Baru — The Artisan Parfum*\n\n👤 *Nama:* ${name}\n📞 *Tel:* ${phone}${email ? '\n📧 *Emel:* ' + email : ''}\n📍 *Alamat:* ${address}, ${state} ${postcode}\n\n*Item:*\n${itemsFmt}\n\n💰 *JUMLAH: RM ${getCartTotal()}*\n\n📝 *Nota:* ${note || '-'}`;
    window.open(`https://wa.me/${CONFIG.WA_NUMBER}?text=${encodeURIComponent(waMsg)}`, '_blank');
    document.getElementById('modal-loading').style.display = 'none';
    document.getElementById('modal-success').style.display = 'block';
    cart = []; saveCart(); refreshCartUI();
  }, 1800);
}

/* =====================================================
   SEARCH
===================================================== */
/* search removed */

/* =====================================================
   NAV LINKS
===================================================== */
document.getElementById('nav-men').addEventListener('click', e => {
  e.preventDefault(); currentGender = 'm'; updateNavActiveState(); renderGrid();
  const url = new URL(window.location); url.searchParams.set('gender', 'm'); window.history.pushState({}, '', url);
});
document.getElementById('nav-women').addEventListener('click', e => {
  e.preventDefault(); currentGender = 'w'; updateNavActiveState(); renderGrid();
  const url = new URL(window.location); url.searchParams.set('gender', 'w'); window.history.pushState({}, '', url);
});
document.getElementById('nav-unisex').addEventListener('click', e => {
  e.preventDefault(); currentGender = 'u'; updateNavActiveState(); renderGrid();
  const url = new URL(window.location); url.searchParams.set('gender', 'u'); window.history.pushState({}, '', url);
});
document.querySelector('.nav-logo').addEventListener('click', e => { e.preventDefault(); window.location.href = 'index.php'; });
document.getElementById('nav-cart-btn').addEventListener('click', openCart);
document.getElementById('hamburger').addEventListener('click', () => { openMegaMenu(); });
document.getElementById('nav-search-btn').addEventListener('click', () => { openMegaMenu(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') { closeProductModal(); closeCart(); closeOrderModal(); } });

/* =====================================================
   MEGA MENU — populate scent family grids
===================================================== */
async function loadScentFamiliesForMega() {
  try {
    const rows = await sbFetch('scent_families?active=eq.true&order=sort_order.asc');
    if (!rows || !rows.length) return renderFallbackFamiliesMega();
    const grids = {
      m: document.getElementById('mgrid-m'),
      w: document.getElementById('mgrid-w'),
      u: document.getElementById('mgrid-u')
    };
    Object.values(grids).forEach(g => { if (g) g.innerHTML = ''; });
    rows.forEach(fam => {
      (fam.genders || 'mwu').split('').forEach(g => {
        if (!grids[g]) return;
        const href = 'koleksi.php?gender=' + g + (fam.slug ? '&family=' + encodeURIComponent(fam.slug) : '');
        const a = document.createElement('a');
        a.href = href;
        a.className = 'mega-item';
        a.innerHTML = '<div class="mega-item-bg" style="background-color:#1a1a2a;' +
          (fam.image_url ? 'background-image:url(\'' + fam.image_url + '\');background-size:cover;background-position:center;' : '') +
          '"></div><div class="mega-item-overlay"></div><div class="mega-item-label">' + fam.name + '</div>';
        grids[g].appendChild(a);
      });
    });
  } catch(e) { renderFallbackFamiliesMega(); }
}

function renderFallbackFamiliesMega() {
  const fallback = {
    m: [['Woody & Smoky','#1a1a2e'],['Fresh & Aquatic','#0d1a2e'],['Citrus & Aromatic','#1a1400'],['Oriental & Spicy','#2e0d0d'],['Fougere','#0d2e0d'],['Bestsellers','#1a1a1a']],
    w: [['Floral','#2e0d1a'],['Rose & Oud','#1a0a0a'],['Sweet & Gourmand','#1a0d00'],['Oriental & Warm','#1a1000'],['Fresh & Light','#0d1a1a'],['Bestsellers','#1a1a1a']],
    u: [['Woody','#1a1a0d'],['Green & Earthy','#0d1a0d'],['Aquatic','#0d1a2e'],['Clean & Musky','#1a1a2e'],['Bestsellers','#1a1a1a']]
  };
  Object.entries(fallback).forEach(([g, items]) => {
    const grid = document.getElementById('mgrid-' + g);
    if (!grid) return;
    items.forEach(([name, bg]) => {
      const a = document.createElement('a');
      a.href = 'koleksi.php?gender=' + g;
      a.className = 'mega-item';
      a.innerHTML = '<div class="mega-item-bg" style="background:' + bg + '"></div><div class="mega-item-overlay"></div><div class="mega-item-label">' + name + '</div>';
      grid.appendChild(a);
    });
  });
}

/* =====================================================
   KICK OFF
===================================================== */
init();
