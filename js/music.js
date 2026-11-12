/* ==========================================================================
   Music — wedding instrumental player
   Plays after the first user gesture (opening the cover).
   Fades in gently. Respects browser autoplay policies.
   ========================================================================== */

const Music = (() => {
  let audio;
  let unlocked = false;
  let playPending = false;
  let targetVolume = 0.35;

  function init(config) {
    audio = document.getElementById('bg-music');
    if (!audio) return;

    targetVolume = config?.volume ?? 0.35;
    audio.volume = 0;
    if (config?.src) {
      const source = audio.querySelector('source');
      if (source && source.getAttribute('src') !== config.src) {
        // A failed <source> fires "error" on the <source>, not on <audio>.
        // If the main track is missing, fall back to the bundled instrumental.
        if (config.fallbackSrc) {
          source.addEventListener('error', () => {
            if (source.getAttribute('src') === config.fallbackSrc) return;
            console.warn(`Music file "${config.src}" not found, using fallback.`);
            source.src = config.fallbackSrc;
            audio.load();
          });
        }
        source.removeAttribute('type'); // let the browser sniff mp3/wav/m4a
        source.src = config.src;
        audio.load();
      }
    }

    const controls = document.querySelectorAll('.music-toggle-button, .music-toggle');
    const updateControls = () => {
      const playing = !audio.paused;
      controls.forEach(control => {
        control.setAttribute('aria-pressed', String(playing));
        control.setAttribute('aria-label', playing ? 'Tắt nhạc nền' : 'Bật nhạc nền');
      });
    };

    const play = () => {
      if (!audio.paused || playPending) return;
      playPending = true;
      audio.play().then(() => {
        playPending = false;
        unlocked = true;
        fadeTo(targetVolume, 1600);
        updateControls();
        document.removeEventListener('pointerdown', unlock);
        document.removeEventListener('click', unlock);
        document.removeEventListener('keydown', unlock);
      }).catch(error => {
        playPending = false;
        updateControls();
        if (error.name !== 'NotAllowedError') {
          console.error('Unable to play the wedding background music.', error);
        }
      });
    };

    function unlock(event) {
      if (event?.target?.closest?.('.music-toggle-button, .music-toggle')) return;
      if (!unlocked) play();
    }

    document.addEventListener('pointerdown', unlock, { passive: true });
    document.addEventListener('click', unlock);
    document.addEventListener('keydown', unlock);

    controls.forEach(control => {
      control.addEventListener('click', () => {
        if (audio.paused) {
          play();
        } else {
          audio.pause();
          audio.volume = targetVolume;
          updateControls();
        }
      });
    });

    audio.addEventListener('play', updateControls);
    audio.addEventListener('pause', updateControls);
    audio.addEventListener('error', () => {
      console.error('Unable to load the wedding background music.', audio.error);
    });

    // Pause when tab hidden, resume when visible
    document.addEventListener('visibilitychange', () => {
      if (!unlocked) return;
      if (document.hidden) audio.pause();
      else audio.play().catch(error => {
        if (error.name !== 'NotAllowedError') {
          console.error('Unable to resume the wedding background music.', error);
        }
      });
    });
    updateControls();
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
