/* ==========================================================================
   Music Module
   Background audio with localStorage persistence.
   Accepts config from data.json via init(config).
   ========================================================================== */

const Music = (() => {
  let audio, toggleBtn, isPlaying = false;
  const STORAGE_KEY = 'wedding_music_state';

  function init(config) {
    audio = document.getElementById('bg-music');
    toggleBtn = document.querySelector('.music-toggle');
    if (!audio || !toggleBtn) return;

    // Apply config from data.json
    if (config) {
      audio.volume = config.volume ?? 0.4;
      const source = audio.querySelector('source');
      if (source && config.src) source.src = config.src;
    } else {
      audio.volume = 0.4;
    }

    toggleBtn.addEventListener('click', toggle);
    document.addEventListener('click', autoplay, { once: true });
    document.addEventListener('touchstart', autoplay, { once: true });
  }

  function autoplay() {
    audio.load();
    if (localStorage.getItem(STORAGE_KEY) !== 'paused') play();
  }

  function play() {
    audio.play().then(() => {
      isPlaying = true;
      updateUI();
    }).catch(() => {});
  }

  function pause() {
    audio.pause();
    isPlaying = false;
    updateUI();
  }

  function toggle() {
    isPlaying ? pause() : play();
  }

  function updateUI() {
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Tạm dừng nhạc nền' : 'Phát nhạc nền');
    toggleBtn.setAttribute('aria-pressed', String(isPlaying));
    toggleBtn.classList.toggle('playing', isPlaying);
    toggleBtn.innerHTML = isPlaying
      ? '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      : '<svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><polygon points="5,3 19,12 5,21"/></svg>';
    localStorage.setItem(STORAGE_KEY, isPlaying ? 'playing' : 'paused');
  }

  return { init };
})();

export default Music;
