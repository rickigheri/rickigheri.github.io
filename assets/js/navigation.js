/* =============================================================
   ASK GEORGE LTD. — Navigation
   - Sticky header shadow on scroll
   - Mobile drawer open/close
   - Active link highlighting
   ============================================================= */
(function () {
  'use strict';

  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.menu-toggle');
  const drawer = document.querySelector('.mobile-drawer');
  const body = document.body;

  // --- Scrolled state ----------------------------------------
  let lastScrolled = false;
  const onScroll = () => {
    const scrolled = window.scrollY > 30;
    if (scrolled !== lastScrolled) {
      header && header.classList.toggle('is-scrolled', scrolled);
      lastScrolled = scrolled;
    }
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // --- Mobile drawer -----------------------------------------
  const setOpen = (open) => {
    if (!drawer || !toggle) return;
    drawer.classList.toggle('is-open', open);
    toggle.classList.toggle('is-open', open);
    toggle.setAttribute('aria-expanded', String(open));
    body.style.overflow = open ? 'hidden' : '';
  };
  if (toggle && drawer) {
    toggle.addEventListener('click', () => {
      const isOpen = drawer.classList.contains('is-open');
      setOpen(!isOpen);
    });
    drawer.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => setOpen(false));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer.classList.contains('is-open')) setOpen(false);
    });
  }

  // --- Active link based on current path ---------------------
  const path = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  document.querySelectorAll('[data-nav-link]').forEach(link => {
    const target = (link.getAttribute('href') || '').toLowerCase();
    if (target === path || (path === '' && target === 'index.html')) {
      link.classList.add('is-active');
    }
  });
})();
