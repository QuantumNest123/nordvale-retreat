// =============================================================
// NORDVALE Retreat — интерактив
// =============================================================

(() => {
  'use strict';

  // ---------- Nav: scrolled state ----------
  const nav = document.getElementById('nav');
  const onScroll = () => {
    if (window.scrollY > 40) nav.classList.add('is-scrolled');
    else nav.classList.remove('is-scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---------- Reveal on scroll ----------
  const reveals = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    reveals.forEach((el) => io.observe(el));
  } else {
    reveals.forEach((el) => el.classList.add('is-visible'));
  }

  // ---------- Smooth anchor offset (compensate for fixed nav) ----------
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener('click', (e) => {
      const id = link.getAttribute('href');
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const top = target.getBoundingClientRect().top + window.scrollY - 24;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  // ---------- Mobile burger ----------
  const burger = document.querySelector('.nav__burger');
  const links = document.querySelector('.nav__links');
  if (burger && links) {
    burger.addEventListener('click', () => {
      const isOpen = links.classList.toggle('is-open');
      links.style.cssText = isOpen
        ? 'display:flex;position:fixed;inset:80px 0 0 0;background:rgba(14,18,16,0.97);flex-direction:column;justify-content:center;align-items:center;gap:32px;z-index:99;'
        : '';
    });
    links.querySelectorAll('a').forEach((a) =>
      a.addEventListener('click', () => {
        links.classList.remove('is-open');
        links.style.cssText = '';
      })
    );
  }

  // ---------- Booking form ----------
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(form);
      const name = (data.get('name') || '').toString().trim();
      const phone = (data.get('phone') || '').toString().trim();
      if (!name || !phone) {
        form.querySelectorAll('input[required]').forEach((inp) => {
          if (!inp.value.trim()) {
            inp.style.borderBottomColor = '#9a5a5a';
            setTimeout(() => (inp.style.borderBottomColor = ''), 1800);
          }
        });
        return;
      }
      success.classList.add('is-visible');
      form.reset();
      setTimeout(() => success.classList.remove('is-visible'), 6000);
    });
  }

  // ---------- Subtle parallax for hero ----------
  const heroMedia = document.querySelector('.hero__media img');
  if (heroMedia && window.matchMedia('(min-width: 900px)').matches) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroMedia.style.transform = `translateY(${y * 0.18}px) scale(1.02)`;
      }
    }, { passive: true });
  }
})();
