/* ==========================================================================
   Ambient Effects — Falling flower petals
   ========================================================================== */

const Flowers = (() => {
  const MAX_PETALS = 12;
  const SPAWN_INTERVAL = 1100;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let container, intervalId;

  function init() {
    if (reduced) return;
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

  function startSpawning() {
    if (intervalId) return;
    for (let i = 0; i < 4; i++) {
      window.setTimeout(spawn, i * 500);
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
    const isPink = Math.random() < 0.4;
    const width = 14 + Math.random() * 8;
    const height = width * (1.15 + Math.random() * 0.2);
    const duration = 11 + Math.random() * 4;
    const delay = Math.random() * 0.5;
    const drift = `${Math.round((Math.random() - 0.5) * 100)}px`;
    const rotation = `${Math.round((Math.random() - 0.5) * 70)}deg`;
    const hue = `${Math.round((Math.random() - 0.5) * 8)}deg`;

    Object.assign(petal.style, {
      left: `${Math.random() * 100}%`,
      width: `${width}px`,
      height: `${height}px`,
      animation: `petalFall ${duration}s linear ${delay}s forwards`
    });
    if (isPink) petal.classList.add('flower-petal--pink');
    petal.style.setProperty('--petal-drift', drift);
    petal.style.setProperty('--petal-rotation', rotation);
    petal.style.setProperty('--petal-hue', hue);

    container.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }

  return { init };
})();

export default Flowers;
