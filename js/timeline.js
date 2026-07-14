/* ==========================================================================
   Timeline Module
   Animated timeline with cinematic line reveal (scaleY) and card entrances.
   Uses IntersectionObserver — no scroll listeners.
   ========================================================================== */

const Timeline = (() => {
  let line, wrapper;

  /** Initialize timeline animation */
  function init() {
    wrapper = document.querySelector('.timeline__wrapper');
    line = document.querySelector('.timeline__line');
    if (!wrapper || !line) return;

    // Set initial state (scaleY(0) is in CSS)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Trigger the CSS scaleY transition
          line.classList.add('animate');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    observer.observe(wrapper);
  }

  return { init };
})();

export default Timeline;
