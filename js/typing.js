/* ==========================================================================
   Typing Module
   Typewriter effect with blinking cursor.
   Types text character by character. No delete animation.
   ========================================================================== */

const Typing = (() => {
  /** Initialize all typewriter elements */
  function init() {
    document.querySelectorAll('[data-typing]').forEach(el => {
      const text = el.dataset.typing;
      const speed = parseInt(el.dataset.typingSpeed) || 80;
      el.textContent = '';

      // Observe to start typing when visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            type(el, text, speed);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.5 });

      observer.observe(el);
    });
  }

  /** Type text into element character by character */
  function type(el, text, speed) {
    let i = 0;
    // Add cursor
    const cursor = document.createElement('span');
    cursor.className = 'typewriter__cursor';
    el.parentNode.insertBefore(cursor, el.nextSibling);

    const interval = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);
  }

  return { init };
})();

export default Typing;
