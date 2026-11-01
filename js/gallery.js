const Gallery = (() => {
  let images = [];
  let lightbox;
  let lightboxImage;
  let counter;
  let activeIndex = 0;
  let lastTrigger = null;
  let previousScrollY = 0;
  let previousScrollBehavior = '';
  let previousHtmlOverflow = '';
  let previousBodyOverflow = '';
  let scrollRestoreFrame = 0;
  let touchStartX = null;

  function init() {
    const gallery = document.querySelector('.gallery-grid');
    lightbox = document.querySelector('[data-gallery-lightbox]');
    lightboxImage = lightbox?.querySelector('[data-gallery-image]');
    counter = lightbox?.querySelector('[data-gallery-counter]');
    if (!gallery || !lightbox || !lightboxImage || !counter) return;

    images = [...gallery.querySelectorAll('.gallery-photo img')].map(image => ({
      src: image.src,
      alt: image.alt
    }));

    gallery.querySelectorAll('.gallery-photo').forEach((photo, index) => {
      photo.addEventListener('click', () => open(index, photo));
    });

    lightbox.querySelectorAll('[data-gallery-close]').forEach(button => {
      button.addEventListener('click', close);
    });
    lightbox.querySelector('[data-gallery-prev]')?.addEventListener('click', showPrevious);
    lightbox.querySelector('[data-gallery-next]')?.addEventListener('click', showNext);
    document.addEventListener('keydown', handleKeydown);

    const figure = lightbox.querySelector('.gallery-lightbox__figure');
    figure?.addEventListener('pointerdown', handlePointerDown);
    figure?.addEventListener('pointerup', handlePointerUp);
    figure?.addEventListener('pointercancel', () => { touchStartX = null; });
  }

  function open(index, trigger) {
    window.cancelAnimationFrame(scrollRestoreFrame);
    activeIndex = index;
    lastTrigger = trigger;
    previousScrollY = window.scrollY;
    previousScrollBehavior = document.documentElement.style.scrollBehavior;
    previousHtmlOverflow = document.documentElement.style.overflow;
    previousBodyOverflow = document.body.style.overflow;
    document.documentElement.classList.add('gallery-open');
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');
    render();
    lightbox.querySelector('.gallery-lightbox__close')?.focus({ preventScroll: true });
  }

  function close() {
    if (!lightbox.classList.contains('is-open')) return;
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    document.documentElement.classList.remove('gallery-open');
    document.documentElement.style.overflow = previousHtmlOverflow;
    document.body.style.overflow = previousBodyOverflow;
    lastTrigger?.focus({ preventScroll: true });
    scrollRestoreFrame = window.requestAnimationFrame(() => {
      document.documentElement.style.scrollBehavior = 'auto';
      window.scrollTo(0, previousScrollY);
      document.documentElement.style.scrollBehavior = previousScrollBehavior;
      scrollRestoreFrame = 0;
    });
  }

  function showPrevious() {
    activeIndex = (activeIndex - 1 + images.length) % images.length;
    render();
  }

  function showNext() {
    activeIndex = (activeIndex + 1) % images.length;
    render();
  }

  function render() {
    const image = images[activeIndex];
    lightboxImage.src = image.src;
    lightboxImage.alt = image.alt;
    counter.textContent = `${activeIndex + 1} / ${images.length}`;
  }

  function handleKeydown(event) {
    if (!lightbox.classList.contains('is-open')) return;
    if (event.key === 'Escape') close();
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      showPrevious();
    }
    if (event.key === 'ArrowRight') {
      event.preventDefault();
      showNext();
    }
    if (event.key === 'Tab') {
      const buttons = [...lightbox.querySelectorAll('button:not([disabled])')];
      const first = buttons[0];
      const last = buttons[buttons.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  }

  function handlePointerDown(event) {
    if (event.pointerType === 'touch') touchStartX = event.clientX;
  }

  function handlePointerUp(event) {
    if (touchStartX === null) return;
    const distance = event.clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) < 45) return;
    if (distance < 0) showNext();
    else showPrevious();
  }

  return { init };
})();

export default Gallery;
