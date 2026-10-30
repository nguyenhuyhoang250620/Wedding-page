/* ==========================================================================
   Ambient Effects — Falling flower petals
   ========================================================================== */

const Flowers = (() => {
  const MAX_PETALS = 20;
  const SPAWN_INTERVAL = 700;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let container, intervalId, colors;

  function init() {
    if (reduced) return;
    colors = readThemeColors();
    createContainer();
    startSpawning();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(intervalId);
        intervalId = null;
      } else {
        startSpawning();
      }
    });
  }

  function readThemeColors() {
    return [
      '#e7a5a8',
      '#f2c5c2',
      '#d88b93',
      '#ead2c8',
      '#d6ad70'
    ];
  }

  function startSpawning() {
    if (intervalId) return;
    for (let i = 0; i < 8; i++) {
      window.setTimeout(spawn, i * 350);
    }
    intervalId = window.setInterval(spawn, SPAWN_INTERVAL);
  }

  function createContainer() {
    container = document.createElement('div');
    container.className = 'flowers-canvas';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);
  }

  function spawn() {
    if (!container || container.children.length >= MAX_PETALS) return;

    const petal = document.createElement('div');
    petal.className = 'flower-petal';
    const width = 9 + Math.random() * 7;
    const height = width * (1.35 + Math.random() * 0.35);
    const duration = 13 + Math.random() * 8;
    const delay = Math.random() * 1.2;
    const color = colors[Math.floor(Math.random() * colors.length)] || '#E8DCC7';
    const drift = `${Math.round((Math.random() - 0.5) * 130)}px`;

    Object.assign(petal.style, {
      left: `${Math.random() * 100}%`,
      width: `${width}px`,
      height: `${height}px`,
      animation: `petalFall ${duration}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`
    });
    petal.style.setProperty('--petal-color', color);
    petal.style.setProperty('--petal-drift', drift);

    container.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }

  return { init };
})();

export default Flowers;
