/* ==========================================================================
   Music — silent background player
   No visible UI. Plays after the first user gesture (opening the cover).
   Fades in gently. Respects browser autoplay policies.
   ========================================================================== */

const Music = (() => {
  let audio;
  let unlocked = false;

  function init(config) {
    audio = document.getElementById('bg-music');
    if (!audio) return;

    const targetVolume = (config?.volume ?? 0.35);
    audio.volume = 0;
    if (config?.src) {
      const source = audio.querySelector('source');
      if (source && source.src.indexOf(config.src) === -1) {
        source.src = config.src;
        audio.load();
      }
    }

    // Unlock on first meaningful user gesture (cover open, click, key, touch)
    const unlock = () => {
      if (unlocked) return;
      unlocked = true;
      audio.play().then(() => fadeTo(targetVolume, 1600)).catch(() => {
        // If autoplay blocked, retry on next interaction
        unlocked = false;
      });
    };

    document.addEventListener('book:open', unlock, { once: true });
    document.addEventListener('click', unlock, { once: true });
    document.addEventListener('touchstart', unlock, { once: true, passive: true });
    document.addEventListener('keydown', unlock, { once: true });

    // Pause when tab hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (!unlocked) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(() => {});
    });
  }

  function fadeTo(target, ms) {
    const start = audio.volume;
    const startTime = performance.now();
    function tick(now) {
      const t = Math.min((now - startTime) / ms, 1);
      audio.volume = start + (target - start) * t;
      if (t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  return { init };
})();

export default Music;
