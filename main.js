/* ==========================================================================
   VoltFi Gold Vault — Main JavaScript
   Handles: mobile menu, smooth scrolling, "Learn More" button
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Mobile Menu Toggle
     ----------------------------------------------------------------------- */
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const closeMenuBtn = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  function openMenu() {
    mobileMenu.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (hamburgerBtn) {
    hamburgerBtn.addEventListener('click', openMenu);
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener('click', closeMenu);
  }

  // Close menu when a mobile nav link is tapped
  document.querySelectorAll('[data-close-menu]').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });


  /* -----------------------------------------------------------------------
     Smooth Scroll for Anchor Links
     ----------------------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });


  /* -----------------------------------------------------------------------
     "Learn More" Button — scrolls to How It Works
     ----------------------------------------------------------------------- */
  var learnMoreBtn = document.getElementById('learn-more-btn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', function () {
      var howSection = document.getElementById('how-it-works');
      if (howSection) {
        howSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  }

  /* -----------------------------------------------------------------------
     Live PAXG Price via CoinGecko API
     ----------------------------------------------------------------------- */
  var priceEl = document.getElementById('gold-price');
  var changeEl = document.getElementById('gold-change');

  function formatPrice(num) {
    return num.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function fetchGoldPrice() {
    fetch('https://api.coingecko.com/api/v3/simple/price?ids=pax-gold&vs_currencies=usd&include_24hr_change=true')
      .then(function (res) { return res.json(); })
      .then(function (data) {
        var price = data['pax-gold'].usd;
        var change = data['pax-gold'].usd_24h_change;

        if (priceEl) priceEl.textContent = formatPrice(price);
        if (changeEl) {
          var sign = change >= 0 ? '+' : '';
          changeEl.textContent = sign + change.toFixed(2) + '% (24h)';
          changeEl.style.color = change >= 0 ? 'var(--green-dark)' : '#DC2626';
        }
      })
      .catch(function () {
        // Fallback if API fails
        if (priceEl) priceEl.textContent = '—';
        if (changeEl) changeEl.textContent = 'Price unavailable';
      });
  }

  // Fetch immediately, then refresh every 60 seconds
  fetchGoldPrice();
  setInterval(fetchGoldPrice, 60000);

})();
