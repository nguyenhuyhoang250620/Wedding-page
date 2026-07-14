/* ==========================================================================
   Loader Module
   Beautiful loading screen with GPU-accelerated progress animation.
   Uses scaleX transform (not width) for 60fps bar animation.
   Fades out with cinematic exit after all assets are loaded.
   ========================================================================== */

const Loader = (() => {
  let loaderEl, barEl, progress = 0;

  /** Initialize loader references */
  function init() {
    loaderEl = document.querySelector('.loader');
    barEl = document.querySelector('.loader__bar');
    if (!loaderEl) return;
    simulateProgress();
    window.addEventListener('load', complete);
  }

  /** Simulate loading progress — uses scaleX for GPU compositing */
  function simulateProgress() {
    const interval = setInterval(() => {
      progress += Math.random() * 12;
      if (progress >= 90) {
        progress = 90;
        clearInterval(interval);
      }
      updateBar();
    }, 250);
  }

  /** Update progress bar using transform scaleX (GPU-only) */
  function updateBar() {
    if (barEl) {
      barEl.style.transform = `scaleX(${Math.min(progress, 100) / 100})`;
    }
  }

  /** Complete loading — cinematic exit */
  function complete() {
    progress = 100;
    updateBar();
    // Allow bar to finish, then exit
    setTimeout(() => {
      loaderEl.classList.add('hidden');
      // Restore scroll after transition completes
      setTimeout(() => {
        document.body.style.overflow = '';
      }, 1200);
    }, 400);
  }

  return { init };
})();

export default Loader;
