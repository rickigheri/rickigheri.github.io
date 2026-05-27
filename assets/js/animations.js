/* =============================================================
   ASK GEORGE LTD. — Animations module
   Africa map enrichment + decorative routines
   ============================================================= */
(function () {
  'use strict';

  // --- Subtle hover behavior on Africa map ------------------
  document.querySelectorAll('.africa-map svg path').forEach(p => {
    p.addEventListener('mouseenter', () => {
      p.style.transition = 'all 240ms cubic-bezier(.22,.61,.36,1)';
    });
  });

  // --- Smooth anchor scrolling with header offset -----------
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const href = a.getAttribute('href');
    if (!href || href === '#') return;
    a.addEventListener('click', (e) => {
      const target = document.querySelector(href);
      if (!target) return;
      e.preventDefault();
      const headerH = 88;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });
})();
