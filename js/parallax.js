/* ==========================================================================
   Parallax Module
   GPU-composited translate3d. IntersectionObserver visibility gating.
   ========================================================================== */

const Parallax = (() => {
  let elements = [];
  let ticking = false;

  function init() {
    document.querySelectorAll('[data-parallax]').forEach(el => {
      elements.push({
        el,
        speed: parseFloat(el.dataset.parallax) || 0.2,
        inView: false
      });
    });

    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const item = elements.find(e => e.el === entry.target);
        if (item) item.inView = entry.isIntersecting;
      });
    }, { threshold: 0, rootMargin: '100px' });

    elements.forEach(item => observer.observe(item.el));
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }

  function update() {
    const viewH = window.innerHeight;
    elements.forEach(({ el, speed, inView }) => {
      if (!inView) return;
      const rect = el.getBoundingClientRect();
      const progress = (viewH - rect.top) / (viewH + rect.height);
      el.style.transform = `translate3d(0, ${(progress - 0.5) * speed * 120}px, 0)`;
    });
    ticking = false;
  }

  return { init };
})();

export default Parallax;
