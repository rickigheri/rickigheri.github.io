/* =============================================================
   ASK GEORGE LTD. — Main entry
   Coordinates feature modules + global behaviors.
   Modules are loaded as separate scripts in each page so they
   can later be enqueued individually in WordPress functions.php.
   ============================================================= */
(function () {
  'use strict';

  // --- Footer year ------------------------------------------
  const yearEl = document.querySelector('[data-year]');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- Contact form: client-side niceties only -------------
  // The WordPress conversion can replace this with a server-side
  // handler (Contact Form 7 / Gravity Forms / WPCF7 hook).
  const form = document.querySelector('[data-contact-form]');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const note = form.querySelector('[data-form-note]');
      const btn = form.querySelector('button[type="submit"]');
      if (btn) {
        btn.disabled = true;
        btn.textContent = 'Sending…';
      }
      // Simulate dispatch — replace with real endpoint or mailto.
      setTimeout(() => {
        form.reset();
        if (btn) {
          btn.disabled = false;
          btn.innerHTML = 'Send message <span class="arrow" aria-hidden="true"></span>';
        }
        if (note) {
          note.textContent = 'Thank you. Your message has been received — we will respond within one business day.';
          note.style.color = 'var(--ag-gold-deep)';
        }
      }, 900);
    });
  }

  // --- Newsletter quick-validate ----------------------------
  const nl = document.querySelector('[data-newsletter]');
  if (nl) {
    nl.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = nl.querySelector('input[type="email"]');
      const btn = nl.querySelector('button');
      if (!input || !input.value) return;
      btn.textContent = 'Subscribed';
      btn.style.background = 'var(--ag-gold-deep)';
      btn.style.color = 'var(--ag-white)';
      input.value = '';
      setTimeout(() => {
        btn.textContent = 'Subscribe';
        btn.style.background = '';
        btn.style.color = '';
      }, 2200);
    });
  }
})();
