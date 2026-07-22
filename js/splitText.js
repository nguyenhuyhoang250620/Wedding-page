/* ==========================================================================
   SplitText — per-character reveal on scroll
   Wraps every character in a span inside a "mask" span for silky reveals.
   Uses IntersectionObserver, respects prefers-reduced-motion.
   ========================================================================== */

const SplitText = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function init() {
    const targets = document.querySelectorAll('[data-split-text]');
    if (!targets.length) return;

    targets.forEach(prepare);

    if (reduced) {
      targets.forEach(el => el.parentElement?.classList.add('reveal'));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.split-text').forEach(el => observer.observe(el));
  }

  function prepare(el) {
    // Preserve inline elements (like <span class="amp">&</span>) by walking childNodes
    const wrap = document.createElement('span');
    wrap.className = 'split-text';

    let idx = 0;
    const stepDelay = 28; // ms per char

    const processNode = (node, target) => {
      if (node.nodeType === Node.TEXT_NODE) {
        const text = node.textContent;
        for (const char of text) {
          if (char === ' ') {
            const space = document.createTextNode(' ');
            target.appendChild(space);
          } else {
            const span = document.createElement('span');
            span.className = 'split-text__char';
            span.textContent = char;
            span.style.transitionDelay = `${idx * stepDelay}ms, ${idx * stepDelay}ms`;
            target.appendChild(span);
            idx++;
          }
        }
      } else if (node.nodeType === Node.ELEMENT_NODE) {
        // Keep the wrapping element (like <span class="amp">) intact but split its inner text
        const clone = node.cloneNode(false);
        clone.classList.add('split-text__inline');
        node.childNodes.forEach(child => processNode(child, clone));
        target.appendChild(clone);
      }
    };

    el.childNodes.forEach(child => processNode(child, wrap));

    el.innerHTML = '';
    el.appendChild(wrap);
    el.removeAttribute('data-split-text');
  }

  return { init };
})();

export default SplitText;
