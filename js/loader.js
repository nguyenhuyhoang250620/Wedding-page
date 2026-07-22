/* ==========================================================================
   Loader — Envelope + Wax Seal choreography
   ========================================================================== */

const Loader = (() => {
  let loaderEl, barEl, progress = 0;
  let intervalId;

  function init() {
    loaderEl = document.querySelector('.loader');
    barEl = document.querySelector('.loader__bar');
    if (!loaderEl) return;
    simulateProgress();
    window.addEventListener('load', complete);
    // Safety timeout
    setTimeout(() => { if (!loaderEl.classList.contains('hidden')) complete(); }, 6000);
  }

  function simulateProgress() {
    intervalId = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 90) { progress = 90; clearInterval(intervalId); }
      updateBar();
    }, 240);
  }

  function updateBar() {
    if (barEl) barEl.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;
  }

  function complete() {
    if (loaderEl.classList.contains('hidden')) return;
    clearInterval(intervalId);
    progress = 100;
    updateBar();

    // Trigger envelope opening sequence
    setTimeout(() => {
      loaderEl.classList.add('opening');
    }, 350);

    // Fade out loader after choreography
    setTimeout(() => {
      loaderEl.classList.add('hidden');
      setTimeout(() => {
        document.body.style.overflow = '';
        loaderEl.remove();
      }, 900);
    }, 1900);
  }

  return { init };
})();

export default Loader;
