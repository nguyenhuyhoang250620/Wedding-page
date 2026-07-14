/* ==========================================================================
   App.js — Main Application Entry Point
   Orchestrates all modules and handles countdown + copy functionality.
   ========================================================================== */

import Loader from './loader.js';
import Music from './music.js';
import Gallery from './gallery.js';
import AOS from './aos.js';
import Parallax from './parallax.js';
import Timeline from './timeline.js';
import Typing from './typing.js';
import Flowers from './flowers.js';

/** Initialize application when DOM is ready */
document.addEventListener('DOMContentLoaded', () => {
  // Lock scroll during loading
  document.body.style.overflow = 'hidden';

  Loader.init();
  AOS.init();
  Parallax.init();
  Timeline.init();
  Typing.init();
  Gallery.init();
  Music.init();
  Flowers.init();
  initCountdown();
  initCopyButtons();
  initLazyImages();
});

/* ==========================================================================
   Countdown Timer
   Counts down to the wedding date. Updates every second.
   ========================================================================== */

function initCountdown() {
  const weddingDate = new Date('2025-12-20T10:00:00');
  const els = {
    days: document.getElementById('countdown-days'),
    hours: document.getElementById('countdown-hours'),
    minutes: document.getElementById('countdown-minutes'),
    seconds: document.getElementById('countdown-seconds')
  };

  if (!els.days) return;

  // Track previous values for pop animation
  const prev = { days: '', hours: '', minutes: '', seconds: '' };

  function update() {
    const now = new Date();
    const diff = weddingDate - now;

    if (diff <= 0) {
      Object.values(els).forEach(el => el.textContent = '0');
      return;
    }

    const values = {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000)
    };

    // Update with pop animation on change
    Object.entries(values).forEach(([key, val]) => {
      const str = String(val);
      if (prev[key] !== str) {
        els[key].textContent = str;
        els[key].classList.remove('pop');
        // Force reflow for re-triggering animation
        void els[key].offsetWidth;
        els[key].classList.add('pop');
        prev[key] = str;
      }
    });
  }

  update();
  setInterval(update, 1000);
}

/* ==========================================================================
   Copy to Clipboard
   Handles copy buttons for bank information.
   ========================================================================== */

function initCopyButtons() {
  document.querySelectorAll('.copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = btn.dataset.copy;
      navigator.clipboard.writeText(text).then(() => {
        btn.classList.add('copied');
        btn.textContent = 'Copied!';
        setTimeout(() => {
          btn.classList.remove('copied');
          btn.textContent = 'Copy';
        }, 2000);
      });
    });
  });
}

/* ==========================================================================
   Lazy Loading Images
   Uses IntersectionObserver to load images only when visible.
   ========================================================================== */

function initLazyImages() {
  const images = document.querySelectorAll('img[data-src]');
  if (!images.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '200px' });

  images.forEach(img => observer.observe(img));
}
