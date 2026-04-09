// Header-specific JavaScript

// Mega menu functions
function openMegaMenu() {
  document.getElementById('mega-overlay').classList.add('visible');
  document.body.classList.add('lock');
}

function closeMegaMenu() {
  document.getElementById('mega-overlay').classList.remove('visible');
  document.body.classList.remove('lock');
}

function switchMegaTab(gender) {
  document.querySelectorAll('.mega-tab').forEach(t => t.classList.remove('active'));
  document.getElementById('mtab-' + gender).classList.add('active');
  
  document.querySelectorAll('.mega-grid').forEach(g => g.classList.add('hidden'));
  document.getElementById('mgrid-' + gender).classList.remove('hidden');
}

// Nav search functions
function openNavSearch() {
  document.getElementById('nav-search-bar').classList.add('open');
  document.getElementById('nav-search-input').focus();
  document.body.classList.add('lock');
}

function closeNavSearch() {
  document.getElementById('nav-search-bar').classList.remove('open');
  document.body.classList.remove('lock');
}

// Announcement bar close
function closeAnnouncement() {
  document.getElementById('ann').style.display = 'none';
  document.getElementById('main-nav').classList.add('no-ann');
}

// Initialize header event listeners
function initHeader() {
  // Announcement close
  const annClose = document.getElementById('ann-close');
  if (annClose) {
    annClose.addEventListener('click', closeAnnouncement);
  }
  
  // Hamburger menu
  const hamburger = document.getElementById('hamburger');
  if (hamburger) {
    hamburger.addEventListener('click', openMegaMenu);
  }
  
  // Search button
  const searchBtn = document.getElementById('nav-search-btn');
  if (searchBtn) {
    searchBtn.addEventListener('click', openNavSearch);
  }
  
  // Cart button
  const cartBtn = document.getElementById('nav-cart-btn');
  if (cartBtn) {
    cartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openCart();
    });
  }
  
  // Scroll behavior for nav
  window.addEventListener('scroll', () => {
    const nav = document.getElementById('main-nav');
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  });
  
  // Click outside mega menu to close
  document.getElementById('mega-overlay').addEventListener('click', (e) => {
    if (e.target.classList.contains('mega-overlay')) {
      closeMegaMenu();
    }
  });
  
  // Click outside search bar to close
  document.getElementById('nav-search-bar').addEventListener('click', (e) => {
    if (e.target.classList.contains('nav-search-bar')) {
      closeNavSearch();
    }
  });
  
  // ESC key handlers
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeMegaMenu();
      closeNavSearch();
    }
  });
}

// Export for use in main.js
window.initHeader = initHeader;
window.openMegaMenu = openMegaMenu;
window.closeMegaMenu = closeMegaMenu;
window.switchMegaTab = switchMegaTab;
window.openNavSearch = openNavSearch;
window.closeNavSearch = closeNavSearch;
