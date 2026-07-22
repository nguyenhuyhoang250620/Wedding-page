/* ==========================================================================
   Slideshow — auto-play with per-slide enter animations
   ========================================================================== */

const Slideshow = (() => {
  const DURATION = 4000; // ms per slide
  const ANIMATIONS = ['slide-from-right', 'zoom-in', 'slide-from-left', 'fade-up', 'zoom-out', 'fade'];

  let slides, dots, bar, current = 0, total = 0, timer, barAnim;

  function init() {
    const el = document.querySelector('.slideshow');
    if (!el) return;

    slides = el.querySelectorAll('.slideshow__slide');
    dots   = el.querySelectorAll('.slideshow__dot');
    bar    = el.querySelector('.slideshow__progress-bar');
    total  = slides.length;

    el.querySelector('.slideshow__arrow--prev')?.addEventListener('click', () => go(current - 1));
    el.querySelector('.slideshow__arrow--next')?.addEventListener('click', () => go(current + 1));
    dots.forEach(d => d.addEventListener('click', () => go(+d.dataset.index)));

    // Pause on hover
    el.addEventListener('mouseenter', pause);
    el.addEventListener('mouseleave', resume);

    show(0, 'zoom-in');
    startTimer();
  }

  function show(index, anim) {
    const prev = current;
    current = (index + total) % total;

    // Remove active from previous
    slides[prev].classList.remove('active');
    slides[prev].style.animation = '';
    dots[prev]?.classList.remove('active');

    // Apply enter animation to new slide
    const animation = anim || ANIMATIONS[current % ANIMATIONS.length];
    slides[current].style.animation = '';
    slides[current].classList.add('active');
    // Force reflow then set animation
    void slides[current].offsetWidth;
    slides[current].style.animation = `slide-${animation} 0.9s var(--ease-out-expo) forwards`;

    // Caption
    const caption = slides[current].querySelector('.slideshow__caption');
    if (caption) {
      caption.style.opacity = '0';
      caption.style.transform = 'translateY(12px)';
      setTimeout(() => {
        caption.style.opacity = '1';
        caption.style.transform = 'translateY(0)';
      }, 400);
    }

    dots[current]?.classList.add('active');
    resetBar();
  }

  function go(index) {
    clearTimeout(timer);
    show(index);
    startTimer();
  }

  function startTimer() {
    timer = setTimeout(() => {
      show(current + 1);
      startTimer();
    }, DURATION);
  }

  function pause() { clearTimeout(timer); cancelAnimationFrame(barAnim); }
  function resume() { startTimer(); }

  function resetBar() {
    if (!bar) return;
    bar.style.transition = 'none';
    bar.style.transform = 'scaleX(0)';
    void bar.offsetWidth;
    bar.style.transition = `transform ${DURATION}ms linear`;
    bar.style.transform = 'scaleX(1)';
  }

  return { init };
})();

export default Slideshow;
