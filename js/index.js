'use strict';

/* =====================================================
   MINI BOTTLE SVG (needed by cart.js refreshCartUI)
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

/* =====================================================
   ENTRY CARDS — navigate to koleksi page
===================================================== */
document.getElementById('entry-m').addEventListener('click', () => { window.location.href = 'koleksi.php?gender=m'; });
document.getElementById('entry-w').addEventListener('click', () => { window.location.href = 'koleksi.php?gender=w'; });
document.getElementById('entry-u').addEventListener('click', () => { window.location.href = 'koleksi.php?gender=u'; });

/* =====================================================
   SCENT FAMILIES — mega menu population
===================================================== */
async function loadScentFamilies() {
  try {
    const rows = await sbFetch('scent_families?active=eq.true&order=sort_order.asc');
    if (!rows || !rows.length) return renderFallbackFamilies();
    const grids = {
      m: document.getElementById('mgrid-m'),
      w: document.getElementById('mgrid-w'),
      u: document.getElementById('mgrid-u')
    };
    Object.values(grids).forEach(g => { if (g) g.innerHTML = ''; });
    rows.forEach(fam => {
      const genders = (fam.genders || 'mwu').split('');
      genders.forEach(g => {
        if (!grids[g]) return;
        const href = fam.href || ('koleksi.php?gender=' + g + (fam.slug ? '&family=' + encodeURIComponent(fam.slug) : ''));
        const a = document.createElement('a');
        a.href = href;
        a.className = 'mega-item';
        a.innerHTML = '<div class="mega-item-bg" style="background-color:#1a1a2a;' +
          (fam.image_url ? 'background-image:url(\'' + fam.image_url + '\');background-size:cover;background-position:center;' : '') +
          '"></div><div class="mega-item-overlay"></div><div class="mega-item-label">' + fam.name + '</div>';
        grids[g].appendChild(a);
      });
    });
  } catch(e) { renderFallbackFamilies(); }
}

function renderFallbackFamilies() {
  const fallback = {
    m: [['Woody & Smoky','#1a1a2e'],['Fresh & Aquatic','#0d1a2e'],['Citrus & Aromatic','#1a1400'],['Oriental & Spicy','#2e0d0d'],['Fougere','#0d2e0d'],['Bestsellers','#1a1a1a'],['New Arrivals','#111'],['Bundle 3+1','#0a0a0a']],
    w: [['Floral','#2e0d1a'],['Rose & Oud','#1a0a0a'],['Sweet & Gourmand','#1a0d00'],['Oriental & Warm','#1a1000'],['Fresh & Light','#0d1a1a'],['Bestsellers','#1a1a1a'],['New Arrivals','#111'],['Bundle 3+1','#0a0a0a']],
    u: [['Woody','#1a1a0d'],['Green & Earthy','#0d1a0d'],['Aquatic','#0d1a2e'],['Clean & Musky','#1a1a2e'],['Bestsellers','#1a1a1a'],['Bundle 3+1','#0a0a0a']]
  };
  const hrefs = { m:'koleksi.php?gender=m', w:'koleksi.php?gender=w', u:'koleksi.php?gender=u' };
  Object.entries(fallback).forEach(([g, items]) => {
    const grid = document.getElementById('mgrid-' + g);
    if (!grid) return;
    items.forEach(([name, bg]) => {
      const a = document.createElement('a');
      a.href = hrefs[g];
      a.className = 'mega-item';
      a.innerHTML = '<div class="mega-item-bg" style="background:' + bg + '"></div><div class="mega-item-overlay"></div><div class="mega-item-label">' + name + '</div>';
      grid.appendChild(a);
    });
  });
}

/* =====================================================
   GENDER CATEGORY CARDS — images/text from Supabase
===================================================== */
async function loadGenderCategories() {
  try {
    const rows = await sbFetch('gender_categories?order=sort_order.asc');
    if (!rows || !rows.length) return;
    rows.forEach(cat => {
      const card = document.getElementById('entry-' + cat.gender);
      if (!card) return;
      const bg = card.querySelector('.entry-card-bg');
      if (cat.image_url && bg) {
        bg.style.background = '';
        bg.style.backgroundImage = `url('${cat.image_url}')`;
        bg.style.backgroundSize = 'cover';
        bg.style.backgroundPosition = 'center';
      } else if (cat.bg_color && bg) {
        bg.style.background = cat.bg_color;
        bg.style.backgroundImage = 'none';
      }
      if (cat.title) {
        const el = card.querySelector('.entry-card-title');
        if (el) el.textContent = cat.title;
      }
      if (cat.subtitle) {
        const el = document.getElementById('entry-' + cat.gender + '-count');
        if (el) el.textContent = cat.subtitle;
      }
    });
  } catch(e) {
    console.error('Error loading gender categories:', e);
  }
}

/* =====================================================
   CAROUSEL SLIDES — from Supabase
===================================================== */
async function loadCarouselSlides() {
  try {
    const rows = await sbFetch('carousel_slides?active=eq.true&order=slide_order.asc');
    if (!rows || !rows.length) return;

    const track = document.getElementById('hc-track');
    const dotsContainer = document.getElementById('hc-dots');
    track.innerHTML = '';
    dotsContainer.innerHTML = '';

    rows.forEach((slide, index) => {
      const slideDiv = document.createElement('div');
      slideDiv.className = 'hc-slide';

      const bgDiv = document.createElement('div');
      bgDiv.className = 'hc-bg';
      if (slide.bg_image_url) {
        bgDiv.style.backgroundImage = `url('${slide.bg_image_url}')`;
        bgDiv.style.backgroundSize = 'cover';
        bgDiv.style.backgroundPosition = 'center';
      } else if (slide.bg_gradient) {
        bgDiv.style.background = slide.bg_gradient;
      }

      const contentDiv = document.createElement('div');
      contentDiv.className = 'hc-content';
      contentDiv.innerHTML = `
        <div class="hc-eyebrow">${slide.eyebrow || ''}</div>
        <h1 class="hc-title">${slide.title || ''}<br><em>${slide.title_em || ''}</em></h1>
        <p class="hc-desc">${slide.description || ''}</p>
        <a href="#collection" class="hc-btn ${slide.btn_onclick?.includes('gender=w') ? 'hc-btn--ghost' : ''}"
          onclick="event.preventDefault(); document.getElementById('collection').scrollIntoView({behavior:'smooth'})">
          ${slide.btn_text || 'Terokai Koleksi'}
        </a>`;

      slideDiv.appendChild(bgDiv);
      slideDiv.appendChild(contentDiv);
      track.appendChild(slideDiv);

      const dot = document.createElement('button');
      dot.className = 'hc-dot' + (index === 0 ? ' active' : '');
      dot.setAttribute('onclick', `hcGoTo(${index})`);
      dotsContainer.appendChild(dot);
    });

    document.getElementById('hc-total').textContent = rows.length;
  } catch(e) {
    console.error('Error loading carousel slides:', e);
  }
}

/* =====================================================
   PRICING — from Supabase
===================================================== */
async function loadPricing() {
  try {
    const rows = await sbFetch('pricing?select=size,normal_price,promo_price');
    if (rows && rows.length) {
      rows.forEach(r => {
        CONFIG.PRICES[r.size] = { normal: r.normal_price, promo: r.promo_price };
      });
    }
  } catch(e) { /* keep defaults */ }
}

/* =====================================================
   PROMO POPUP
===================================================== */
const PROMO_KEY = 'artisan_promo_hidden';

function closePromoPopup() {
  document.getElementById('promo-overlay').classList.remove('visible');
}

function handleDontShow(checkbox) {
  if (checkbox.checked) {
    localStorage.setItem(PROMO_KEY, '1');
  } else {
    localStorage.removeItem(PROMO_KEY);
  }
}

async function loadPromoPopup() {
  try {
    const rows = await sbFetch('promo_popup?active=eq.true&limit=1');
    if (!rows || rows.length === 0) return;
    const promo = rows[0];

    const eyebrow = document.querySelector('.promo-popup-eyebrow');
    const title   = document.querySelector('.promo-popup-title');
    const desc    = document.querySelector('.promo-popup-desc');
    const saving  = document.querySelector('.promo-popup-saving');
    const cta     = document.querySelector('.promo-popup-cta');
    const imgWrap = document.getElementById('promo-popup-img-wrap');

    if (eyebrow) eyebrow.textContent = promo.eyebrow || 'Tawaran Eksklusif';
    if (title)   title.innerHTML     = promo.title || 'Beli <em>3×60ml</em><br>Percuma <em>1×30ml</em>';
    if (desc)    desc.textContent    = promo.description || 'Pilih mana-mana 3 wangian 60ml dan dapatkan 1 botol 30ml percuma pilihan anda.';
    if (saving)  saving.innerHTML    = `Jimat sehingga <strong>${promo.saving_text || 'RM 49'}</strong>`;
    if (cta) {
      cta.textContent = promo.cta_text || 'Beli Sekarang →';
      cta.href = promo.cta_href || '#bundle';
    }
    if (promo.image_url && imgWrap && promo.image_url.trim() !== '') {
      imgWrap.innerHTML = `<img src="${promo.image_url}" alt="Promo" style="width:100%;height:100%;object-fit:cover;">`;
    }

    const isEnabled = promo.enabled !== undefined ? promo.enabled : promo.active;
    const delaySecs = promo.delay_seconds || 2.5;

    if (isEnabled && !localStorage.getItem(PROMO_KEY)) {
      setTimeout(() => {
        document.getElementById('promo-overlay').classList.add('visible');
      }, delaySecs * 1000);
    }
  } catch(e) {
    if (!localStorage.getItem(PROMO_KEY)) {
      setTimeout(() => {
        document.getElementById('promo-overlay').classList.add('visible');
      }, 2500);
    }
  }
}

/* =====================================================
   ORDER SUBMIT — ToyyibPay form POST
===================================================== */
function handleOrderSubmit() {
  const name     = document.getElementById('field-name').value.trim();
  const phone    = document.getElementById('field-phone').value.trim();
  const email    = document.getElementById('field-email').value.trim();
  const address  = document.getElementById('field-address').value.trim();
  const state    = document.getElementById('field-state').value;
  const postcode = document.getElementById('field-postcode').value.trim();
  const note     = document.getElementById('field-note').value.trim();

  let ok = true;
  if (name.length < 3)           { setInvalid('field-name','err-name');         ok = false; } else clearInvalid('field-name','err-name');
  if (!isValidPhone(phone))      { setInvalid('field-phone','err-phone');        ok = false; } else clearInvalid('field-phone','err-phone');
  if (email && !isValidEmail(email)) { setInvalid('field-email','err-email');   ok = false; } else clearInvalid('field-email','err-email');
  if (address.length < 10)       { setInvalid('field-address','err-address');    ok = false; } else clearInvalid('field-address','err-address');
  if (!state)                    { setInvalid('field-state','err-state');         ok = false; } else clearInvalid('field-state','err-state');
  if (!isValidPostcode(postcode)){ setInvalid('field-postcode','err-postcode');  ok = false; } else clearInvalid('field-postcode','err-postcode');
  if (!ok) return;

  document.getElementById('submit-btn').disabled = true;
  document.getElementById('modal-form').style.display    = 'none';
  document.getElementById('modal-loading').style.display = 'block';

  const itemsStr = cart.map(i => `${i.name} (${i.size}) x${i.qty}`).join(' | ');
  const itemsFmt = cart.map(i => `• ${i.name} (${i.size}) ×${i.qty} = RM${i.pricePerUnit * i.qty}`).join('\n');
  const fullAddress = `${address}, ${state} ${postcode}`;

  const form = document.createElement('form');
  form.method = 'POST';
  form.action = CONFIG.TOYYIBPAY_URL;
  const fields = { name, phone, email, address: fullAddress, note, total: getCartTotal(), items: itemsStr, itemsFormatted: itemsFmt };
  Object.entries(fields).forEach(([k, v]) => {
    const input = document.createElement('input');
    input.type = 'hidden'; input.name = k; input.value = v;
    form.appendChild(input);
  });
  document.body.appendChild(form);
  form.submit();
}

/* =====================================================
   PAGE INIT
===================================================== */
document.addEventListener('DOMContentLoaded', async () => {
  await loadPricing();
  loadScentFamilies();
  loadGenderCategories();
  loadCarouselSlides();
  await loadPromoPopup();
});
