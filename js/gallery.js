/* ==========================================================================
   Gallery Module
   Masonry gallery with lightbox overlay.
   Supports keyboard navigation, swipe gestures, and image preloading.
   ========================================================================== */

const Gallery = (() => {
  let lightbox, lightboxImg, items, currentIndex = 0;
  let touchStartX = 0;

  /** Initialize gallery and lightbox */
  function init() {
    lightbox = document.querySelector('.lightbox');
    lightboxImg = document.querySelector('.lightbox__img');
    items = document.querySelectorAll('.gallery__item');
    if (!lightbox || !items.length) return;

    // Click to open
    items.forEach((item, i) => {
      item.addEventListener('click', () => open(i));
    });

    // Controls
    document.querySelector('.lightbox__close')?.addEventListener('click', close);
    document.querySelector('.lightbox__btn--prev')?.addEventListener('click', prev);
    document.querySelector('.lightbox__btn--next')?.addEventListener('click', next);

    // Keyboard
    document.addEventListener('keydown', handleKey);

    // Swipe
    lightbox.addEventListener('touchstart', (e) => { touchStartX = e.touches[0].clientX; }, { passive: true });
    lightbox.addEventListener('touchend', handleSwipe, { passive: true });

    // Close on backdrop click
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) close();
    });
  }

  /** Open lightbox at index */
  function open(index) {
    currentIndex = index;
    updateImage();
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  /** Close lightbox */
  function close() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
  }

  /** Navigate to previous */
  function prev() {
    currentIndex = (currentIndex - 1 + items.length) % items.length;
    updateImage();
  }

  /** Navigate to next */
  function next() {
    currentIndex = (currentIndex + 1) % items.length;
    updateImage();
  }

  /** Update displayed image */
  function updateImage() {
    const img = items[currentIndex].querySelector('img');
    lightboxImg.src = img.dataset.full || img.src;
    lightboxImg.alt = img.alt;
    // Preload adjacent
    preload((currentIndex + 1) % items.length);
  }

  /** Preload image at index */
  function preload(index) {
    const img = items[index]?.querySelector('img');
    if (img) {
      const preImg = new Image();
      preImg.src = img.dataset.full || img.src;
    }
  }

  /** Handle keyboard events */
  function handleKey(e) {
    if (!lightbox.classList.contains('active')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowLeft') prev();
    if (e.key === 'ArrowRight') next();
  }

  /** Handle swipe gesture */
  function handleSwipe(e) {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
  }

  return { init };
})();

export default Gallery;
