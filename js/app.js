/* ==========================================================================
   App.js — Main Entry Point
   Boots modules, hydrates from data.json.
   ========================================================================== */

import Loader from './loader.js';
import Music from './music.js';
import Gallery from './gallery.js';
import AOS from './aos.js';
import Parallax from './parallax.js';
import Timeline from './timeline.js';
import Typing from './typing.js';
import Flowers from './flowers.js';
import SplitText from './splitText.js';
import Magnetic from './magnetic.js';
import Slideshow from './slideshow.js';

document.addEventListener('DOMContentLoaded', async () => {
  initEnvelopeCover();

  document.body.style.overflow = 'hidden';
  Loader.init();

  const data = await fetchData();
  if (data) renderContent(data);

  // Order matters: SplitText prepares DOM before AOS observes
  SplitText.init();
  AOS.init();
  Parallax.init();
  Timeline.init();
  Typing.init();
  Gallery.init();
  Music.init(data?.music);
  Flowers.init();
  Magnetic.init();
  Slideshow.init();
  initCountdown(data?.wedding?.date);
  initCopyButtons();
  initLazyImages();
});

/* ---------- Envelope Cover ---------- */
function initEnvelopeCover() {
  const cover = document.getElementById('envelope-cover');
  if (!cover) return;

  function openCover() {
    cover.classList.add('opening');
    setTimeout(() => cover.classList.add('gone'), 900);
  }

  cover.addEventListener('click', openCover);
  cover.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') openCover(); });
}

/* ---------- data.json ---------- */
async function fetchData() {
  try {
    const res = await fetch('data.json');
    return await res.json();
  } catch (e) {
    console.warn('data.json missing, using HTML defaults.');
    return null;
  }
}

/* ---------- Hydrate DOM from data.json ---------- */
function renderContent(data) {
  const { couple, wedding, events, timeline, gallery, gift, wishes, social, hero, video, sections, ui } = data;

  // Hero background image
  if (hero) {
    const heroImg = document.querySelector('.hero__bg img');
    if (heroImg) { heroImg.src = hero.backgroundImage; heroImg.alt = hero.backgroundAlt; }
  }

  // Hero content
  if (wedding) {
    // Only replace subtitle if data provides it (keep design language)
    // (design uses hero__subtitle for venue line — keep as is)
  }

  // Update monogram from couple names
  if (couple) {
    const initials = `${(couple.groom?.name || 'H')[0]}|${(couple.bride?.name || 'T')[0]}`.toUpperCase();
    document.querySelectorAll('[data-monogram]').forEach(el => el.textContent = initials);

    // Hero title
    const heroTitle = document.querySelector('.hero__title [data-split-text]');
    if (heroTitle) {
      heroTitle.innerHTML = `${couple.groom.name} <span class="amp">&amp;</span> ${couple.bride.name}`;
    }

    // Footer name
    const footerName = document.querySelector('.footer .text-script');
    if (footerName) footerName.innerHTML = `${couple.groom.name} <span class="amp">&amp;</span> ${couple.bride.name}`;

    // Loader title
    const loaderName = document.querySelector('.loader__title');
    if (loaderName) loaderName.textContent = `${couple.groom.name} & ${couple.bride.name}`;
  }

  // Section headers from sections config
  if (sections) {
    const map = {
      couple: '#couple', timeline: '#story', gallery: '#gallery',
      video: '#video', countdown: '#countdown', event: '#event',
      gift: '#gift', wishes: '#wishes'
    };
    Object.entries(sections).forEach(([key, val]) => {
      const section = document.querySelector(map[key]);
      if (!section) return;
      const label = section.querySelector('.section-label');
      const title = section.querySelector('.section-title');
      if (label) label.textContent = val.label;
      if (title) title.textContent = val.title;
    });
  }

  // UI labels
  if (ui) {
    const scrollText = document.querySelector('.scroll-indicator__text');
    if (scrollText) scrollText.textContent = ui.scrollText;
    if (ui.countdownLabels) {
      const labels = document.querySelectorAll('.countdown__label');
      const keys = ['days', 'hours', 'minutes', 'seconds'];
      labels.forEach((el, i) => { if (ui.countdownLabels[keys[i]]) el.textContent = ui.countdownLabels[keys[i]]; });
    }
    document.querySelectorAll('.map-btn').forEach(btn => { if (ui.viewOnMaps) btn.textContent = ui.viewOnMaps; });
    document.querySelectorAll('.copy-btn').forEach(btn => { if (ui.copyButton) btn.textContent = ui.copyButton; });
  }

  // Couple portraits + text
  if (couple) {
    const persons = document.querySelectorAll('.couple__person');
    const people = [couple.groom, couple.bride];
    persons.forEach((el, i) => {
      const p = people[i];
      if (!p) return;
      const img = el.querySelector('.couple__portrait img');
      if (img) { img.src = p.image; img.alt = `${p.name} — ${p.role.toLowerCase()}`; }
      const h3 = el.querySelector('h3');
      if (h3) h3.textContent = p.name;
      const role = el.querySelector('.text-italic');
      if (role) role.textContent = p.role;
      const desc = el.querySelector('p');
      if (desc) desc.textContent = p.description;
    });
  }

  // Timeline
  if (timeline) {
    const items = document.querySelectorAll('.timeline__card');
    timeline.forEach((item, i) => {
      const card = items[i];
      if (!card) return;
      const badge = card.querySelector('.badge');
      if (badge) badge.textContent = item.date;
      const h3 = card.querySelector('h3');
      if (h3) h3.textContent = item.title;
      const p = card.querySelector('p');
      if (p) p.textContent = item.description;
    });
  }

  // Gallery
  if (gallery) {
    const items = document.querySelectorAll('.gallery__item img');
    gallery.forEach((img, i) => {
      const el = items[i];
      if (!el) return;
      el.dataset.src = img.src;
      el.alt = img.alt;
      el.width = img.width;
      el.height = img.height;
    });
  }

  // Video
  if (video) {
    const vid = document.querySelector('.video__wrapper video');
    if (vid) {
      vid.poster = video.poster;
      const source = vid.querySelector('source');
      if (source) source.src = video.src;
    }
  }

  // Events
  if (events) {
    const cards = document.querySelectorAll('.event__card');
    const list = [events.ceremony, events.reception];
    cards.forEach((card, i) => {
      const ev = list[i];
      if (!ev) return;
      const icon = card.querySelector('.event__icon');
      if (icon) icon.textContent = ev.icon;
      const h3 = card.querySelector('h3');
      if (h3) h3.textContent = ev.title;
      const texts = card.querySelectorAll('.text-sans');
      if (texts[0]) texts[0].textContent = ev.date;
      if (texts[1]) texts[1].textContent = ev.time;
      if (texts[2]) texts[2].textContent = ev.venue;
      const link = card.querySelector('.map-btn');
      if (link) link.href = ev.mapUrl;
    });
  }

  // Gift
  if (gift) {
    const cards = document.querySelectorAll('.gift__card');
    gift.forEach((g, i) => {
      const card = cards[i];
      if (!card) return;
      const h3 = card.querySelector('h3');
      if (h3) h3.textContent = g.title;
      const texts = card.querySelectorAll('.text-sans');
      if (texts[0]) texts[0].textContent = g.bank;
      if (texts[1]) texts[1].innerHTML = `<strong>${g.accountDisplay}</strong>`;
      if (texts[2]) texts[2].textContent = g.accountName;
      const btn = card.querySelector('.copy-btn');
      if (btn) btn.dataset.copy = g.accountNumber;
    });
  }

  // Wishes
  if (wishes) {
    const cards = document.querySelectorAll('.wishes__card');
    wishes.forEach((w, i) => {
      const card = cards[i];
      if (!card) return;
      const author = card.querySelector('.wishes__card-author');
      if (author) author.textContent = w.author;
      const text = card.querySelector('.wishes__card-text');
      if (text) text.textContent = `"${w.message}"`;
    });
  }

  // Social
  if (social) {
    const links = document.querySelectorAll('.footer__social .social-link');
    social.forEach((s, i) => {
      const link = links[i];
      if (!link) return;
      link.href = s.url;
      link.setAttribute('aria-label', s.platform);
      link.textContent = s.icon;
    });
  }
}

/* ---------- Countdown ---------- */
function initCountdown(dateStr) {
  const weddingDate = new Date(dateStr || '2026-11-28T15:00:00');
  const els = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };
  if (!els.days) return;

  const prev = { days: '', hours: '', minutes: '', seconds: '' };

  function update() {
    const diff = weddingDate - new Date();
    if (diff <= 0) {
      Object.values(els).forEach(el => { el.textContent = '0'; });
      return;
    }
    const values = {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000)
    };
    Object.entries(values).forEach(([key, val]) => {
      const str = String(val);
      if (prev[key] !== str) {
        els[key].textContent = str;
        els[key].classList.remove('pop');
        void els[key].offsetWidth; // reflow to restart animation
        els[key].classList.add('pop');
        prev[key] = str;
      }
    });
  }

  update();
  setInterval(update, 1000);
}

/* ---------- Copy to clipboard ---------- */
function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    const original = btn.textContent;
    btn.addEventListener('click', () => {
      navigator.clipboard.writeText(btn.dataset.copy).then(() => {
        btn.classList.add('copied');
        btn.textContent = btn.dataset.copiedText || 'Đã sao chép!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = original;
        }, 2000);
      });
    });
  });
}

/* ---------- Lazy images ---------- */
function initLazyImages() {
  const imgs = document.querySelectorAll('img[data-src]');
  if (!imgs.length) return;
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.decoding = 'async';
        img.removeAttribute('data-src');
        obs.unobserve(img);
      }
    });
  }, { rootMargin: '300px' });
  imgs.forEach(img => obs.observe(img));
}
