/* ==========================================================================
   Typing — Optional typewriter effect for [data-typing] elements
   Kept for backward compat. New design uses SplitText for the hero.
   ========================================================================== */

const Typing = (() => {
  function init() {
    const els = document.querySelectorAll('[data-typing]');
    if (!els.length) return;

    els.forEach(el => {
      const text = el.dataset.typing;
      const speed = parseInt(el.dataset.typingSpeed) || 80;
      el.textContent = '';

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

  function type(el, text, speed) {
    let i = 0;
    const cursor = document.createElement('span');
    cursor.className = 'typewriter__cursor';
    el.parentNode.insertBefore(cursor, el.nextSibling);

    const iv = setInterval(() => {
      el.textContent += text[i];
      i++;
      if (i >= text.length) clearInterval(iv);
    }, speed);
  }

  return { init };
})();

export default Typing;
