/* ==========================================================================
   Magnetic & Tilt Effects
   • [data-magnetic] — button follows cursor within a radius
   • [data-tilt]     — card gets subtle 3D tilt tracking cursor
   Skips on touch devices and reduced-motion.
   ========================================================================== */

const Magnetic = (() => {
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;

  function init() {
    if (reduced || isTouch) return;
    initMagneticButtons();
    initTiltCards();
  }

  function initMagneticButtons() {
    const els = document.querySelectorAll('[data-magnetic]');
    const RADIUS = 90;
    const STRENGTH = 0.35;

    els.forEach(el => {
      let rafId;
      const state = { tx: 0, ty: 0, mx: 0, my: 0 };

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = e.clientX - cx;
        const dy = e.clientY - cy;
        const dist = Math.hypot(dx, dy);
        if (dist < RADIUS + Math.max(rect.width, rect.height) / 2) {
          state.mx = dx * STRENGTH;
          state.my = dy * STRENGTH;
          if (!rafId) rafId = requestAnimationFrame(apply);
        }
      };

      const onLeave = () => {
        cancelAnimationFrame(rafId);
        rafId = null;
        state.mx = 0;
        state.my = 0;
        el.classList.remove('magnetic-active');
        el.style.setProperty('--mx', '0px');
        el.style.setProperty('--my', '0px');
      };

      const apply = () => {
        el.classList.add('magnetic-active');
        el.style.setProperty('--mx', state.mx + 'px');
        el.style.setProperty('--my', state.my + 'px');
        rafId = null;
      };

      el.addEventListener('mousemove', onMove, { passive: true });
      el.addEventListener('mouseleave', onLeave);
    });
  }

  function initTiltCards() {
    const els = document.querySelectorAll('[data-tilt]');
    const MAX = 6; // max rotation in degrees

    els.forEach(el => {
      let rafId;
      const state = { rx: 0, ry: 0 };

      const onMove = (e) => {
        const rect = el.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        state.ry = (px - 0.5) * MAX * 2;
        state.rx = -(py - 0.5) * MAX * 2;
        if (!rafId) rafId = requestAnimationFrame(apply);
      };

      const onEnter = () => el.classList.add('tilting');
      const onLeave = () => {
        el.classList.remove('tilting');
        state.rx = 0;
        state.ry = 0;
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
      };

      const apply = () => {
        el.style.setProperty('--rx', state.rx.toFixed(2) + 'deg');
        el.style.setProperty('--ry', state.ry.toFixed(2) + 'deg');
        rafId = null;
      };

      el.addEventListener('mouseenter', onEnter);
      el.addEventListener('mousemove', onMove, { passive: true });
      el.addEventListener('mouseleave', onLeave);
    });
  }

  return { init };
})();

export default Magnetic;
