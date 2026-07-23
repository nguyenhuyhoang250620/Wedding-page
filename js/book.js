/* ==========================================================================
   Book — Cover-open + full-screen page flip
   • Cover lifts open on click / tap / Enter / space
   • Pages flip like a book (rotateY)
   • Arrows, dots, keyboard, swipe, wheel
   ========================================================================== */

const Book = (() => {
  let bookEl, coverEl, pages = [];
  let dotsEl, prevBtn, nextBtn, hintEl;
  let current = 0;
  let opened = false;
  let animating = false;
  const FLIP_MS = 1200;
  const OPEN_MS = 1700;

  function init() {
    bookEl = document.getElementById('book');
    coverEl = document.getElementById('book-cover');
    pages = Array.from(document.querySelectorAll('.page'));
    if (!bookEl || !pages.length) return;

    dotsEl = document.querySelector('.book-nav__dots');
    prevBtn = document.querySelector('.book-nav__arrow--prev');
    nextBtn = document.querySelector('.book-nav__arrow--next');
    hintEl = document.querySelector('.swipe-hint');

    buildDots();
    bindEvents();

    // Initialize page states — page 0 will fully activate after cover opens
    pages.forEach((p, i) => {
      p.classList.remove('is-active', 'is-prev', 'is-next');
      if (i === 0) p.classList.add('is-active');
      else p.classList.add('is-next');
    });
    updateNav();
  }

  function buildDots() {
    if (!dotsEl) return;
    pages.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'book-nav__dot';
      dot.type = 'button';
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', `Trang ${i + 1}`);
      dot.addEventListener('click', () => {
        if (!opened) openCover();
        goTo(i);
      });
      dotsEl.appendChild(dot);
    });
    // Mark first dot active by default
    dotsEl.firstChild?.classList.add('is-active');
  }

  function bindEvents() {
    // Cover open
    coverEl?.addEventListener('click', openCover);
    coverEl?.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCover(); }
    });

    prevBtn?.addEventListener('click', prev);
    nextBtn?.addEventListener('click', next);

    // Keyboard
    document.addEventListener('keydown', (e) => {
      if (!opened && (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowRight')) {
        e.preventDefault(); openCover(); return;
      }
      if (!opened) return;
      if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'Home') { e.preventDefault(); goTo(0); }
      else if (e.key === 'End') { e.preventDefault(); goTo(pages.length - 1); }
    });

    // Tap the active page → advance (but not on interactive elements)
    document.addEventListener('click', (e) => {
      if (!opened) return;
      const page = e.target.closest('.page.is-active');
      if (!page) return;
      if (e.target.closest('a, button, input, textarea, select')) return;
      next();
    });

    // Swipe
    attachSwipe(bookEl);

    // Wheel — throttled
    let wheelLock = false;
    bookEl?.addEventListener('wheel', (e) => {
      if (!opened || wheelLock) return;
      if (Math.abs(e.deltaY) < 20 && Math.abs(e.deltaX) < 20) return;
      wheelLock = true;
      (e.deltaY > 0 || e.deltaX > 0) ? next() : prev();
      setTimeout(() => (wheelLock = false), FLIP_MS + 80);
    }, { passive: true });

    // Restart
    document.getElementById('restart-btn')?.addEventListener('click', () => goTo(0));
  }

  function attachSwipe(el) {
    if (!el) return;
    let startX = 0, startY = 0, moved = false;
    el.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      moved = false;
    }, { passive: true });
    el.addEventListener('touchmove', () => { moved = true; }, { passive: true });
    el.addEventListener('touchend', (e) => {
      if (!opened || !moved) return;
      const dx = e.changedTouches[0].clientX - startX;
      const dy = e.changedTouches[0].clientY - startY;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy)) {
        dx < 0 ? next() : prev();
      } else if (Math.abs(dy) > 60) {
        dy < 0 ? next() : prev();
      }
    }, { passive: true });
  }

  function openCover() {
    if (opened) return;
    opened = true;
    bookEl.classList.add('opened');
    // Signal music can start (audio unlocked by user gesture already)
    document.dispatchEvent(new CustomEvent('book:open'));
    // Show swipe hint briefly after cover opens
    setTimeout(() => hintEl?.classList.remove('hidden'), OPEN_MS + 200);
    setTimeout(() => hintEl?.classList.add('hidden'), OPEN_MS + 9000);
  }

  function next() {
    if (animating || current >= pages.length - 1) return;
    goTo(current + 1);
  }

  function prev() {
    if (animating || current <= 0) return;
    goTo(current - 1);
  }

  function goTo(index) {
    if (index < 0 || index >= pages.length) return;
    if (index === current) return;

    animating = true;
    hintEl?.classList.add('hidden');

    pages.forEach((p, i) => {
      p.classList.remove('is-active', 'is-prev', 'is-next');
      if (i === index) p.classList.add('is-active');
      else if (i < index) p.classList.add('is-prev');
      else p.classList.add('is-next');
    });

    current = index;
    updateNav();

    document.dispatchEvent(new CustomEvent('page:change', {
      detail: { index, page: pages[index], name: pages[index].dataset.page }
    }));

    setTimeout(() => { animating = false; }, FLIP_MS);
  }

  function updateNav() {
    if (prevBtn) prevBtn.disabled = current === 0;
    if (nextBtn) nextBtn.disabled = current === pages.length - 1;
    if (dotsEl) {
      dotsEl.querySelectorAll('.book-nav__dot').forEach((d, i) => {
        d.classList.toggle('is-active', i === current);
        d.setAttribute('aria-selected', String(i === current));
      });
    }
  }

  return { init, next, prev, goTo, get current() { return current; }, get opened() { return opened; } };
})();

export default Book;
