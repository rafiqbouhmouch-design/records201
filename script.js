/* script.js
   Small JS interactions:
   - mobile nav toggle
   - smooth scrolling
   - news filter
   - media filter chips
   - modal open/close for streams
   - contact form front-end handling
*/

/* helpers */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => Array.from(ctx.querySelectorAll(sel));

/* NAV TOGGLE (mobile) */
const navToggle = $('#navToggle');
const navMenu = $('#navMenu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    const open = navToggle.getAttribute('aria-expanded') === 'true';
    navToggle.setAttribute('aria-expanded', String(!open));
    navMenu.classList.toggle('open');
    navToggle.classList.toggle('active');
  });
}

/* SMOOTH SCROLL FOR LINKS */
$$('.nav-menu a, .brand').forEach(link => {
  link.addEventListener('click', (e) => {
    const href = link.getAttribute('href');
    if (!href || !href.startsWith('#')) return;
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    // Close mobile menu after click
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    }
  });
});

/* NEWS FILTER */
const newsFilter = $('#newsFilter');
const newsGrid = $('#newsGrid');

if (newsFilter && newsGrid) {
  newsFilter.addEventListener('change', (e) => {
    const val = e.target.value;
    const cards = $$('.news-card', newsGrid);
    cards.forEach(card => {
      const cat = card.getAttribute('data-category') || 'all';
      card.style.display = (val === 'all' || cat === val) ? '' : 'none';
    });
  });
}

/* MEDIA FILTER CHIPS */
const chips = $$('.chip');
const mediaItems = $$('#mediaGrid .media-item');
chips.forEach(chip => {
  chip.addEventListener('click', () => {
    chips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
    const filter = chip.getAttribute('data-filter');
    mediaItems.forEach(item => {
      item.style.display = (filter === 'all' || item.getAttribute('data-type') === filter) ? '' : 'none';
    });
  });
});

/* MODAL (streams/videos) */
const modal = $('#mediaModal');
const modalClose = $('#modalClose');
const modalTitle = $('#modalTitle');

$$('.btn-play').forEach(btn => {
  btn.addEventListener('click', () => {
    const title = btn.dataset.streamTitle || btn.dataset.video || 'Media Preview';
    if (modalTitle) modalTitle.textContent = title;
    if (modal) {
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  });
});

if (modalClose) {
  modalClose.addEventListener('click', () => {
    if (modal) {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

if (modal) {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  });
}

/* CONTACT FORM (front-end) */
const contactForm = $('#contactForm');
const formStatus = $('#formStatus');

if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = $('#name').value.trim();
    const email = $('#email').value.trim();
    const msg = $('#message').value.trim();

    if (!name || !email || !msg) {
      formStatus.textContent = 'Please fill all fields.';
      formStatus.style.color = '#f6b0b0';
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      formStatus.textContent = 'Please enter a valid email.';
      formStatus.style.color = '#f6b0b0';
      return;
    }

    formStatus.textContent = 'Sending...';
    formStatus.style.color = '#b7d8ff';
    setTimeout(() => {
      formStatus.textContent = 'Message sent! We will reply soon.';
      formStatus.style.color = '#baf6d8';
      contactForm.reset();
    }, 900);
  });
}

/* Footer year */
const yearEl = $('#year');
if (yearEl) yearEl.textContent = new Date().getFullYear();

/* ESC handling */
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (modal && modal.getAttribute('aria-hidden') === 'false') {
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
    if (navMenu && navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
      navToggle.classList.remove('active');
    }
  }
});
