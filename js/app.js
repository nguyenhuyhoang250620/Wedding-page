/* ==========================================================================
   App.js — Boot
   Hydrates from data.json, then starts loader → book → music → countdown.
   ========================================================================== */

import Loader from './loader.js';
import Music from './music.js';
import Book from './book.js';
import Magnetic from './magnetic.js';
import Flowers from './flowers.js';
import Gift from './gift.js?v=20261031';

document.addEventListener('DOMContentLoaded', async () => {
  initRsvpForm();
  document.body.classList.add('scroll-layout');
  document.querySelector('.book')?.classList.add('scroll-layout');
  Loader.init();

  const [data, guests] = await Promise.all([fetchData(), fetchGuests()]);
  if (data) hydrate(data);
  applyGuestName(guests);

  Book.init();
  Magnetic.init();
  Flowers.init();
  Music.init(data?.music);
  Gift.init(data?.gift);
  initCountdown(data?.wedding?.date);
  initRevealOnScroll();

  setTimeout(() => {
    unlockInvitation();
  }, 1100);
});

/* ---------- RSVP submission ---------- */
function initRsvpForm() {
  const form = document.querySelector('.rsvp-form');
  if (!form) return;

  const status = form.querySelector('.rsvp-status');
  const submitButton = form.querySelector('.submit-btn');
  if (!status || !submitButton) return;

  let submitted = false;

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    if (submitted || submitButton.disabled) return;

    const formData = new FormData(form);
    const attendance = formData.get('attendance');
    const payload = {
      name: formData.get('name'),
      attendance,
      guests: attendance === 'yes' ? Number(formData.get('guests')) : 0,
      phone: formData.get('phone') || '',
    };

    status.textContent = 'Đang gửi xác nhận…';
    status.dataset.state = 'pending';
    submitButton.disabled = true;

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      let result;
      try {
        result = await response.json();
      } catch {
        throw new Error('Phản hồi từ máy chủ không hợp lệ.');
      }

      if (!response.ok) {
        throw new Error(result.error || 'Không thể lưu xác nhận lúc này. Vui lòng thử lại.');
      }

      submitted = true;
      status.textContent = 'Xác nhận của bạn đã được ghi nhận. Cảm ơn bạn!';
      status.dataset.state = 'success';
    } catch (error) {
      console.error('Unable to submit RSVP.', error);
      status.textContent = error instanceof TypeError
        ? 'Không thể kết nối đến máy chủ. Vui lòng kiểm tra mạng và thử lại.'
        : error.message;
      status.dataset.state = 'error';
      submitButton.disabled = false;
    }
  });
}

/* ---------- data.json ---------- */
async function fetchData() {
  try {
    const res = await fetch('data.json');
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Unable to load wedding data from data.json.', error);
    return null;
  }
}

/* ---------- Guest name: ?name=<code> -> guests.json ---------- */
async function fetchGuests() {
  try {
    const res = await fetch('guests.json');
    if (!res.ok) throw new Error(`Request failed with status ${res.status}`);
    return await res.json();
  } catch (error) {
    console.error('Unable to load guests.json.', error);
    return null;
  }
}

// Example: https://site/?name=a01 -> guests.json "guests"."a01".
// Missing or unknown code -> guests.json "default" (falls back to "Quý khách").
function applyGuestName(guests) {
  const el = document.querySelector('[data-guest-name]');
  if (!el) return;
  const code = (new URLSearchParams(window.location.search).get('name') || '')
    .trim()
    .toLowerCase();
  const list = guests?.guests || {};
  const match = code
    ? Object.keys(list).find(key => key.toLowerCase() === code)
    : undefined;
  el.textContent = (match && list[match]) || guests?.default || 'Quý khách';
}
/* ---------- Hydrate DOM from data.json ---------- */
function hydrate(data) {
  const { couple, wedding, events, families } = data;

  if (couple) {
    const formatDisplayName = (name = '') =>
      name.toLocaleLowerCase('vi').replace(/(^|[\s-])\p{L}/gu, character =>
        character.toLocaleUpperCase('vi')
      );
    const initials = `${(couple.groom?.name || 'H')[0]}|${(couple.bride?.name || 'T')[0]}`.toUpperCase();
    document.querySelectorAll('[data-monogram]').forEach(el => el.textContent = initials);

    document.querySelectorAll('[data-couple-name="groom"]').forEach(el => {
      el.textContent = el.closest('.interior-hero__names')
        ? formatDisplayName(couple.groom?.name)
        : couple.groom?.name || '';
    });
    document.querySelectorAll('[data-couple-name="bride"]').forEach(el => {
      el.textContent = el.closest('.interior-hero__names')
        ? formatDisplayName(couple.bride?.name)
        : couple.bride?.name || '';
    });
    document.querySelectorAll('[data-couple-fullnames]').forEach(el => {
      el.textContent = `${couple.groom?.name || ''} & ${couple.bride?.name || ''}`;
    });

    // Book cover names
    const coverGroom = document.querySelector('.book-cover__groom');
    const coverBride = document.querySelector('.book-cover__bride');
    if (coverGroom && couple.groom?.name) coverGroom.textContent = coverDisplayName(couple.groom.name);
    if (coverBride && couple.bride?.name) coverBride.textContent = coverDisplayName(couple.bride.name);

    // Welcome page names
    const welcomeNames = document.querySelector('.welcome__names');
    if (welcomeNames) {
      welcomeNames.textContent = `${couple.groom?.name || ''} & ${couple.bride?.name || ''}`;
    }

    // Loader
    const loaderTitle = document.querySelector('.loader__title');
    if (loaderTitle) loaderTitle.textContent = `${couple.groom?.name || ''} & ${couple.bride?.name || ''}`;

    // Invite sign
    const inviteSign = document.querySelector('.invite__sign');
    if (inviteSign) inviteSign.textContent = `— ${couple.groom?.name || ''} & ${couple.bride?.name || ''}`;

    // Thanks signature
    const thanksSig = document.querySelector('.thanks__signature');
    if (thanksSig) thanksSig.textContent = `${couple.groom?.name || ''} & ${couple.bride?.name || ''}`;

    // Couple portraits
    const persons = document.querySelectorAll('.person-card');
    const list = [couple.groom, couple.bride];
    persons.forEach((el, i) => {
      const p = list[i];
      if (!p) return;
      const img = el.querySelector('.person-card__image img');
      if (img) { img.src = p.image; img.alt = p.name; }
      const name = el.querySelector('[data-person-name]');
      if (name) name.textContent = p.name;
      const role = el.querySelector('h3');
      if (role) role.textContent = p.role;
    });

    const title = data.meta?.title || `${couple.groom?.name || ''} & ${couple.bride?.name || ''} — Thiệp Cưới`;
    document.title = title;
    const description = document.querySelector('meta[name="description"]');
    if (description && data.meta?.description) description.content = data.meta.description;
    const socialTitle = document.querySelector('meta[property="og:title"]');
    if (socialTitle) socialTitle.content = title;
    const socialDescription = document.querySelector('meta[property="og:description"]');
    if (socialDescription && data.meta?.description) socialDescription.content = data.meta.description;
    const themeColor = document.querySelector('meta[name="theme-color"]');
    if (themeColor && data.meta?.themeColor) themeColor.content = data.meta.themeColor;
  }

  if (families) {
    set('[data-family-parents="groom"]', families.groom?.parents || '');
    set('[data-family-parents="bride"]', families.bride?.parents || '');
  }

  // Images
  if (data.images) {
    const { cover, hero, introBg, photoMoments, milestones } = data.images;
    setImg('[data-img="cover"]', cover);
    setImg('[data-img="hero"]', hero);
    setImg('[data-img="intro-bg"]', introBg);
    if (Array.isArray(photoMoments)) {
      photoMoments.forEach((moment, i) => {
        setImg(`[data-img="moment-${i}"]`, moment.src);
        if (moment.caption !== null) set(`[data-img-caption="moment-${i}"]`, moment.caption || '');
      });
    }
    if (Array.isArray(milestones)) renderMilestones(milestones);
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
      const coverDate = `${String(d.getDate()).padStart(2,'0')}/${String(d.getMonth()+1).padStart(2,'0')}/${d.getFullYear()}`;
      const dateStr = `${String(d.getDate()).padStart(2,'0')} · ${String(d.getMonth()+1).padStart(2,'0')} · ${d.getFullYear()}`;
      set('.book-cover__date', coverDate);
      set('.welcome__meta', dateStr);
      set('.interior-hero__date', coverDate);
      set('[data-wedding-date]', `${String(d.getDate()).padStart(2, '0')}.${String(d.getMonth() + 1).padStart(2, '0')}.${d.getFullYear()}`);
      set('[data-wedding-weekday]', dayNames[d.getDay()]);
      set('[data-wedding-year]', String(d.getFullYear()));
      renderWeddingCalendar(d);
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
    if (events.reception?.time) set('.cover-event__time', events.reception.time);
    if (events.reception?.venue) set('.cover-event__venue', events.reception.venue);
    document.querySelectorAll('[data-event-card]').forEach(card => {
      const event = events[card.dataset.eventCard];
      if (!event) return;
      const title = card.querySelector('[data-event-title]');
      const time = card.querySelector('[data-event-time]');
      const venue = card.querySelector('[data-event-venue]');
      const map = card.querySelector('[data-event-map]');
      if (title) title.textContent = event.title || '';
      if (time) time.textContent = event.time || '';
      if (venue) venue.textContent = event.venue || '';
      if (map && event.mapUrl) map.href = event.mapUrl;
    });
    ['ceremony', 'reception'].forEach(key => {
      const event = events[key];
      if (!event) return;
      set(`[data-schedule-title="${key}"]`, event.title || '');
      set(`[data-schedule-time="${key}"]`, event.time || '');
    });

    const venue = events.reception?.venue || events.ceremony?.venue;
    if (venue) {
      const location = encodeURIComponent(venue);
      set('[data-venue-title]', venue);
      set('[data-venue-address]', venue);
      const map = document.querySelector('[data-wedding-map]');
      const directions = document.querySelector('[data-wedding-directions]');
      if (map) map.src = `https://maps.google.com/maps?q=${location}&output=embed`;
      if (directions) directions.href = `https://www.google.com/maps/search/?api=1&query=${location}`;
    }
  }
}

function renderWeddingCalendar(date) {
  const days = document.querySelector('[data-calendar-days]');
  if (!days) return;

  const year = date.getFullYear();
  const month = date.getMonth();
  const offset = (new Date(year, month, 1).getDay() + 6) % 7;
  const count = new Date(year, month + 1, 0).getDate();
  set('[data-calendar-month]', `Tháng ${month + 1}`);
  set('[data-calendar-year]', String(year));
  days.replaceChildren();

  for (let i = 0; i < offset; i += 1) {
    const spacer = document.createElement('span');
    spacer.className = 'wedding-calendar__empty';
    spacer.setAttribute('aria-hidden', 'true');
    days.appendChild(spacer);
  }

  for (let day = 1; day <= count; day += 1) {
    const cell = document.createElement('span');
    cell.className = 'wedding-calendar__day';
    cell.setAttribute('role', 'gridcell');
    cell.textContent = String(day);
    if (day === date.getDate()) {
      cell.classList.add('is-wedding-day');
      cell.setAttribute('aria-current', 'date');
      cell.setAttribute('aria-label', `Ngày cưới, ${day}/${month + 1}/${year}`);
    } else {
      cell.setAttribute('aria-label', `${day}/${month + 1}/${year}`);
    }
    days.appendChild(cell);
  }
}

function set(sel, val) {
  const el = document.querySelector(sel);
  if (el) el.textContent = val;
}

function setImg(sel, src) {
  const el = document.querySelector(sel);
  if (el && src) el.src = src;
}

function renderMilestones(milestones) {
  const container = document.querySelector('[data-milestones]');
  if (!container) return;
  container.replaceChildren(...milestones.map((m, i) => {
    const article = document.createElement('article');
    article.className = 'milestone-card reveal-on-scroll' + (i % 2 === 1 ? ' milestone-card--reverse' : '');
    article.innerHTML = `
      <div class="milestone-card__img">
        <img src="${m.src}" alt="${m.title}" loading="lazy">
      </div>
      <div class="milestone-card__body">
        <strong class="milestone-card__title">${m.title}</strong>
        <p class="milestone-card__desc">${m.desc}</p>
      </div>`;
    return article;
  }));
}

function coverDisplayName(name) {
  const words = name.trim().split(/\s+/);
  return words.length > 2 ? words.slice(-2).join(' ') : name;
}

/* ---------- Countdown ---------- */
function initCountdown(dateStr) {
  const target = new Date(dateStr || '2026-11-28T11:00:00');
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

/* ---------- Reveal on Scroll ---------- */
function initRevealOnScroll() {
  const sections = Array.from(document.querySelectorAll('.page:not(.page--cover)'));
  const items = [...sections, ...document.querySelectorAll('.reveal-on-scroll')];
  items.forEach(item => item.classList.add('reveal-on-scroll'));

  const introPage = document.querySelector('.page--intro');
  if (introPage) {
    const revealAnnouncement = () => {
      if (!('IntersectionObserver' in window)) {
        introPage.classList.add('announcement-revealed');
        return;
      }

      const announcementObserver = new IntersectionObserver((entries) => {
        if (entries.some(entry => entry.isIntersecting)) {
          introPage.classList.add('announcement-revealed');
          announcementObserver.disconnect();
        }
      }, {
        threshold: 0.15,
        rootMargin: '0px 0px -70px 0px'
      });

      announcementObserver.observe(introPage);
    };

    if (document.body.classList.contains('invitation-open')) {
      revealAnnouncement();
    } else {
      document.addEventListener('invitation:opened', revealAnnouncement, { once: true });
    }
  }

  const sideRevealItems = document.querySelectorAll(
    '.reveal-on-scroll:not(.page):not(.gallery-photo):not(.person-card):not(.family-card):not(.event-card)'
  );
  sideRevealItems.forEach((item, index) => {
    item.classList.add(index % 2 === 0 ? 'reveal-from-left' : 'reveal-from-right');
  });

  document.body.classList.add('scroll-reveal-ready');

  if (!('IntersectionObserver' in window)) {
    items.forEach(item => item.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -70px 0px'
  });

  items.forEach(item => observer.observe(item));
}

/* ---------- Unlock Invitation ---------- */
const entryVeil = document.getElementById('entry-veil');
const bookEl = document.getElementById('book');

function unlockInvitation() {
  if (!entryVeil || !bookEl) return;
  entryVeil.classList.add('hidden');
  bookEl.classList.add('visible');
  document.body.classList.add('scroll-layout');
}

entryVeil?.addEventListener('click', unlockInvitation);
entryVeil?.addEventListener('keydown', (event) => {
  if (event.key === 'Enter' || event.key === ' ') {
    event.preventDefault();
    unlockInvitation();
  }
});

entryVeil?.focus();
