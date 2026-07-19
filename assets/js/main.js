/* ============================================================
   KIGHERI RD — Portfolio 2026 · v2 interactions
   ============================================================ */
(function () {
  'use strict';
  const $ = (s, c) => (c || document).querySelector(s);
  const $$ = (s, c) => Array.from((c || document).querySelectorAll(s));

  const nav = $('#nav');
  const navMenu = $('#navMenu');
  const navToggle = $('#navToggle');
  const navScrim = $('#navScrim');
  const scrollUp = $('#scrollUp');
  const links = $$('.nav__link');
  const sections = links.map(l => $(l.getAttribute('href'))).filter(Boolean);

  /* ---- Mobile menu ---- */
  const openMenu = () => { navMenu.classList.add('open'); navScrim.classList.add('show'); navToggle.setAttribute('aria-expanded', 'true'); document.body.style.overflow = 'hidden'; };
  const closeMenu = () => { navMenu.classList.remove('open'); navScrim.classList.remove('show'); navToggle.setAttribute('aria-expanded', 'false'); document.body.style.overflow = ''; };
  navToggle.addEventListener('click', () => navMenu.classList.contains('open') ? closeMenu() : openMenu());
  navScrim.addEventListener('click', closeMenu);
  navMenu.addEventListener('click', e => { if (e.target.closest('.nav__link, .btn')) closeMenu(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });

  /* ---- Nav bg + scroll-up + active link ---- */
  function onScroll() {
    const y = window.scrollY;
    nav.classList.toggle('scrolled', y > 20);
    scrollUp.classList.toggle('show', y > 640);
    let cur = sections.length ? sections[0].id : '';
    for (const s of sections) { if (y >= s.offsetTop - 130) cur = s.id; }
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + cur));
  }
  let ticking = false;
  window.addEventListener('scroll', () => { if (!ticking) { requestAnimationFrame(() => { onScroll(); ticking = false; }); ticking = true; } }, { passive: true });
  onScroll();

  /* ---- Scroll reveal ---- */
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => { if (en.isIntersecting) { en.target.classList.add('in'); obs.unobserve(en.target); } });
    }, { threshold: 0.1, rootMargin: '0px 0px -6% 0px' });
    reveals.forEach(el => io.observe(el));
  } else { reveals.forEach(el => el.classList.add('in')); }

  /* ---- Services accordion (one open at a time) ---- */
  const svcs = $$('[data-svc]');
  function setPanel(svc, open) {
    const panel = $('.svc__panel', svc);
    const btn = $('.svc__head', svc);
    if (open) {
      svc.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = panel.scrollHeight + 'px';
    } else {
      svc.classList.remove('open');
      btn.setAttribute('aria-expanded', 'false');
      panel.style.maxHeight = null;
    }
  }
  svcs.forEach(svc => {
    $('.svc__head', svc).addEventListener('click', () => {
      const isOpen = svc.classList.contains('open');
      svcs.forEach(o => o !== svc && setPanel(o, false));
      setPanel(svc, !isOpen);
    });
  });
  // recompute open panel height on resize
  window.addEventListener('resize', () => {
    const open = $('.svc.open');
    if (open) $('.svc__panel', open).style.maxHeight = $('.svc__panel', open).scrollHeight + 'px';
  });

  /* ---- Skills tabs ---- */
  const tabs = $$('.skills__tab');
  const panels = $$('.skills__panel');
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const i = +tab.dataset.tab;
      tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
      panels.forEach(p => p.classList.remove('active'));
      tab.classList.add('active'); tab.setAttribute('aria-selected', 'true');
      panels[i].classList.add('active');
    });
  });

  /* ---- About read more ---- */
  const aboutToggle = $('#aboutToggle');
  const aboutMore = $('#aboutMore');
  if (aboutToggle) {
    aboutToggle.addEventListener('click', () => {
      const open = aboutMore.classList.toggle('open');
      aboutToggle.classList.toggle('open', open);
      aboutToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
      $('span', aboutToggle).textContent = open ? 'Read less' : 'Read more';
    });
  }

  /* ---- Stat counters ---- */
  const counters = $$('[data-count]');
  if ('IntersectionObserver' in window && counters.length) {
    const cio = new IntersectionObserver((entries, obs) => {
      entries.forEach(en => {
        if (!en.isIntersecting) return;
        const el = en.target, target = +el.dataset.count, suffix = el.dataset.suffix || '';
        const dur = 1100, t0 = performance.now();
        (function step(now) {
          const p = Math.min((now - t0) / dur, 1);
          const val = Math.round((1 - Math.pow(1 - p, 3)) * target);
          el.textContent = val + suffix;
          if (p < 1) requestAnimationFrame(step);
        })(t0);
        obs.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach(c => cio.observe(c));
  }

  /* ---- Year ---- */
  const yr = $('#year');
  if (yr) yr.textContent = new Date().getFullYear();
})();
