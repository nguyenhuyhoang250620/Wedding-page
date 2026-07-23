/* ==========================================================================
   Ambient Effects — Falling petals
   Colors are pulled from CSS variables so they follow the active theme.
   ========================================================================== */

const Flowers = (() => {
  const MAX_PETALS = 10;
  const SPAWN_INTERVAL = 3800;
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let container, intervalId, colors;

  function init() {
    if (reduced) return;
    colors = readThemeColors();
    createContainer();
    for (let i = 0; i < 5; i++) setTimeout(spawn, i * 1000);
    intervalId = setInterval(spawn, SPAWN_INTERVAL);

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) clearInterval(intervalId);
      else intervalId = setInterval(spawn, SPAWN_INTERVAL);
    });
  }

  function readThemeColors() {
    const cs = getComputedStyle(document.documentElement);
    return [
      cs.getPropertyValue('--color-champagne').trim(),
      cs.getPropertyValue('--color-beige').trim(),
      cs.getPropertyValue('--color-cream').trim(),
      cs.getPropertyValue('--color-gold').trim(),
      cs.getPropertyValue('--color-ivory').trim()
    ].filter(Boolean);
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
    const size = 7 + Math.random() * 10;
    const duration = 13 + Math.random() * 9;
    const delay = Math.random() * 1.2;
    const color = colors[Math.floor(Math.random() * colors.length)] || '#E8DCC7';

    Object.assign(petal.style, {
      position: 'absolute',
      top: '-24px',
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      borderRadius: '50% 0 50% 50%',
      opacity: '0',
      pointerEvents: 'none',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.12)',
      willChange: 'transform, opacity',
      animation: `petalFall ${duration}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`
    });

    container.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }

  return { init };
})();

export default Flowers;
