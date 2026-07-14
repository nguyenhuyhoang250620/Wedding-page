/* ==========================================================================
   Gallery Module
   Lightbox with keyboard nav, swipe, preloading, and proper ARIA.
   ========================================================================== */

const Gallery = (() => {
  let lightbox, lightboxImg, items, currentIndex = 0;
  let touchStartX = 0;

  function init() {
    lightbox = document.querySelector('.lightbox');
    lightboxImg = document.querySelector('.lightbox__img');
    items = document.querySelectorAll('.gallery__item');
    if (!lightbox || !items.length) return;

    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
      item.setAttribute('role', 'button');
      item.setAttribute('tabindex', '0');
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); open(i); }
      });
    });

    document.querySelector('.lightbox__close')?.addEventListener('click', close);
    document.querySelector('.lightbox__btn--prev')?.addEventListener('click', prev);
    document.querySelector('.lightbox__btn--next')?.addEventListener('click', next);
    document.addEventListener('keydown', handleKey);
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', handleSwipe, { passive: true });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) close(); });
  }

  function open(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.add('active');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.querySelector('.lightbox__close')?.focus();
  }

  function close() {
    lightbox.classList.remove('active');
    lightbox.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    items[currentIndex]?.focus();
  }

  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateImage();
  }

  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    updateImage();
  }

  function updateImage() {
    const img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.dataset.full || img.dataset.src || img.src;
    lightboxImg.alt = img.alt;
    preload((currentIndex + 1) % items.length);
  }

  function preload(index) {
    const img = items[index]?.querySelector('img');
    if (img) new Image().src = img.dataset.full || img.dataset.src || img.src;
  }

  function handleKey(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    else if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
  }

  function handleSwipe(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? next() : prev();
  }

  return { init };
})();

export default Gallery;
