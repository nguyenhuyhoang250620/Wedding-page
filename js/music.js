/* ==========================================================================
   Music Module
   Background music controller with play/pause/volume.
   Persists state via localStorage. Autoplay after first user interaction.
   ========================================================================== */

const Music = (() => {
  let audio, toggleBtn, isPlaying = false;
  const STORAGE_KEY = 'wedding_music_state';

  /** Initialize music player */
  function init() {
    audio = document.getElementById('bg-music');
    toggleBtn = document.querySelector('.music-toggle');
    if (!audio || !toggleBtn) return;

    audio.volume = 0.4;
    loadState();
    toggleBtn.addEventListener('click', toggle);

    // Autoplay after first user interaction
    document.addEventListener('click', autoplay, { once: true });
    document.addEventListener('touchstart', autoplay, { once: true });
  }

  /** Attempt autoplay on first interaction */
  function autoplay() {
    const state = localStorage.getItem(STORAGE_KEY);
    if (state !== 'paused') play();
  }

  /** Play audio */
  function play() {
    audio.play().then(() => {
      isPlaying = true;
      updateIcon();
      saveState();
    }).catch(() => {});
  }

  /** Pause audio */
  function pause() {
    audio.pause();
    isPlaying = false;
    updateIcon();
    saveState();
  }

  /** Toggle play/pause */
  function toggle() {
    isPlaying ? pause() : play();
  }

  /** Update button icon and animation state */
  function updateIcon() {
    toggleBtn.setAttribute('aria-label', isPlaying ? 'Pause music' : 'Play music');
    toggleBtn.classList.toggle('playing', isPlaying);
    toggleBtn.innerHTML = isPlaying
      ? '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="4" width="4" height="16"/><rect x="14" y="4" width="4" height="16"/></svg>'
      : '<svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
  }

  /** Save state to localStorage */
  function saveState() {
    localStorage.setItem(STORAGE_KEY, isPlaying ? 'playing' : 'paused');
  }

  /** Load previous state */
  function loadState() {
    updateIcon();
  }

  return { init };
})();

export default Music;
