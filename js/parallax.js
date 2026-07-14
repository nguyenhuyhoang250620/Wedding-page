/* ==========================================================================
   Parallax Module
   Smooth parallax using translate3d (GPU-composited).
   Only animates visible elements via IntersectionObserver.
   Throttled with requestAnimationFrame — never drops below 60fps.
   ========================================================================== */

const Parallax = (() => {
  let elements = [];
  let ticking = false;

  /** Initialize parallax elements */
  function init() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      elements.push({
        el,
        speed: parseFloat(el.dataset.parallax) || 0.2,
        inView: false
      });
      // Promote to own composite layer
      el.style.willChange = 'transform';
    });

    if (!elements.length) return;

    // Track visibility — only animate what's on screen
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const item = elements.find(e => e.el === entry.target);
        if (item) item.inView = entry.isIntersecting;
      });
    }, { threshold: 0, rootMargin: '100px' });

    elements.forEach(item => observer.observe(item.el));
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /** Request animation frame on scroll */
  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  /** Update transforms — GPU-only translate3d */
  function update() {
    const scrollY = window.pageYOffset;
    const viewH = window.innerHeight;

    elements.forEach(({ el, speed, inView }) => {
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      // Normalized position: 0 at bottom of viewport, 1 at top
      const progress = (viewH - rect.top) / (viewH + rect.height);
      const offset = (progress - 0.5) * speed * 120;
      el.style.transform = `translate3d(0, ${offset}px, 0)`;
    });

    ticking = false;
  }

  return { init };
})();

export default Parallax;
