/* ==========================================================================
   App.js — Boot
   Hydrates from data.json, then starts loader → book → music → countdown.
   ========================================================================== */

import Loader from './loader.js';
import Music from './music.js';
import Book from './book.js';
import Magnetic from './magnetic.js';
import Flowers from './flowers.js';
import Gift from './gift.js';

document.addEventListener('DOMContentLoaded', async () => {
  document.body.style.overflow = 'hidden';
  Loader.init();

  const data = await fetchData();
  if (data) hydrate(data);

  Book.init();
  Magnetic.init();
  Flowers.init();
  Music.init(data?.music);
  Gift.init(data?.gift);
  initCountdown(data?.wedding?.date);
});

/* ---------- data.json ---------- */
async function fetchData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) return null;
    return await res.json();
  } catch { return null; }
}

/* ---------- Hydrate DOM from data.json ---------- */
function hydrate(data) {
  const { couple, wedding, events } = data;

  if (couple) {
    const initials = `${(couple.groom?.name || 'H')[0]}|${(couple.bride?.name || 'T')[0]}`.toUpperCase();
    document.querySelectorAll('[data-monogram]').forEach(el => el.textContent = initials);

    // Book cover names
    const coverNames = document.querySelector('.book-cover__names');
    if (coverNames) coverNames.innerHTML = `${couple.groom.name} &amp; ${couple.bride.name}`;

    // Welcome page names
    const welcomeNames = document.querySelector('.welcome__names');
    if (welcomeNames) {
      welcomeNames.innerHTML = `${couple.groom.name} <span class="amp">&amp;</span> ${couple.bride.name}`;
    }

    // Loader
    const loaderTitle = document.querySelector('.loader__title');
    if (loaderTitle) loaderTitle.innerHTML = `${couple.groom.name} &amp; ${couple.bride.name}`;

    // Invite sign
    const inviteSign = document.querySelector('.invite__sign');
    if (inviteSign) inviteSign.textContent = `— ${couple.groom.name} & ${couple.bride.name}`;

    // Thanks signature
    const thanksSig = document.querySelector('.thanks__signature');
    if (thanksSig) thanksSig.innerHTML = `${couple.groom.name} &amp; ${couple.bride.name}`;

    // Gift card names on page 6
    const gGroom = document.querySelector('.gift-card[data-gift="groom"] .gift-card__name');
    if (gGroom) gGroom.textContent = couple.groom.name;
    const gBride = document.querySelector('.gift-card[data-gift="bride"] .gift-card__name');
    if (gBride) gBride.textContent = couple.bride.name;

    // Couple portraits
    const persons = document.querySelectorAll('.couple__person');
    const list = [couple.groom, couple.bride];
    persons.forEach((el, i) => {
      const p = list[i];
      if (!p) return;
      const img = el.querySelector('.couple__portrait img');
      if (img) { img.src = p.image; img.alt = p.name; }
      const h3 = el.querySelector('h3');
      if (h3) h3.textContent = p.name;
      const role = el.querySelector('.text-italic');
      if (role) role.textContent = p.role;
    });
  }

  // Date hero
  if (wedding?.date) {
    const d = new Date(wedding.date);
    if (!isNaN(d)) {
      const dayNames = ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
      const monthShort = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
      set('.date-hero__day', dayNames[d.getDay()]);
      set('.date-hero__mo', monthShort[d.getMonth()]);
      set('.date-hero__num', d.getDate());
      set('.date-hero__yr', d.getFullYear());
      // Book cover + welcome date
      const dateStr = `${String(d.getDate()).padStart(2,'0')} · ${String(d.getMonth()+1).padStart(2,'0')} · ${d.getFullYear()}`;
      set('.book-cover__date', dateStr);
      set('.welcome__meta', dateStr);
    }
  }

  // Events
  if (events) {
    const list = [events.ceremony, events.reception];
    document.querySelectorAll('.event-line').forEach((el, i) => {
      const ev = list[i];
      if (!ev) return;
      const label = el.querySelector('.event-line__label');
      const value = el.querySelector('.event-line__value');
      if (label) label.textContent = ev.title;
      if (value) value.textContent = `${ev.time} · ${ev.venue}`;
    });
    const mapBtn = document.querySelector('.page--event .btn');
    if (mapBtn && events.ceremony?.mapUrl) mapBtn.href = events.ceremony.mapUrl;
  }
}

function set(sel, val) {
  const el = document.querySelector(sel);
  if (el) el.textContent = val;
}

/* ---------- Countdown ---------- */
function initCountdown(dateStr) {
  const target = new Date(dateStr || '2026-11-28T15:00:00');
  const els = {
    days: document.getElementById('cd-days'),
    hours: document.getElementById('cd-hours'),
    minutes: document.getElementById('cd-minutes'),
    seconds: document.getElementById('cd-seconds')
  };
  if (!els.days) return;

  const prev = { days: '', hours: '', minutes: '', seconds: '' };

  function update() {
    const diff = target - new Date();
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
    Object.entries(values).forEach(([k, v]) => {
      const s = String(v);
      if (prev[k] !== s) {
        els[k].textContent = s;
        els[k].classList.remove('pop');
        void els[k].offsetWidth;
        els[k].classList.add('pop');
        prev[k] = s;
      }
    });
  }
  update();
  setInterval(update, 1000);
}
