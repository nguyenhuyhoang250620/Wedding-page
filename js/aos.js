/* ==========================================================================
   AOS (Animate On Scroll) Module
   Uses IntersectionObserver for performant scroll-triggered animations.
   No heavy scroll listeners — only observes element visibility.
   ========================================================================== */

const AOS = (() => {
  let observer;

  /** Initialize observer for all [data-aos] elements */
  function init() {
    const elements = document.querySelectorAll('[data-aos]');
    if (!elements.length) return;

    observer = new IntersectionObserver(handleIntersect, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  /** Handle intersection entries */
  function handleIntersect(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('aos-animate');
        observer.unobserve(entry.target); // Animate once
      }
    });
  }

  return { init };
})();

export default AOS;
