/* ==========================================================================
   Ambient Effects — Falling petals + cursor glow
   Ivory rose palette. Petals use CSS animation, spawned in bursts.
   ========================================================================== */

const Flowers = (() => {
  const MAX_PETALS = 35;
  const SPAWN_INTERVAL = 1200;
  const COLORS = ['#F0D0D0', '#E0A8A8', '#C0464A', '#F9EAEA', '#FDF6F6', '#8B2326', '#F5C0C0', '#D47070'];
  const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let container, intervalId, rafId;

  function init() {
    if (reduced) return;
    createPetals();
    createCursorGlow();

    document.addEventListener('visibilitychange', () => {
      if (document.hidden) {
        clearInterval(intervalId);
        cancelAnimationFrame(rafId);
      } else {
        intervalId = setInterval(() => spawnPetal(), SPAWN_INTERVAL);
      }
    });
  }

  function createPetals() {
    container = document.createElement('div');
    container.className = 'flowers-canvas';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    for (let i = 0; i < 14; i++) setTimeout(() => spawnPetal(), i * 400);
    intervalId = setInterval(() => spawnPetal(), SPAWN_INTERVAL);
  }

  function spawnPetal() {
    if (container.children.length >= MAX_PETALS) return;

    const petal = document.createElement('div');
    const size = 7 + Math.random() * 11;
    const duration = 12 + Math.random() * 9;
    const delay = Math.random() * 1.5;
    const opacity = 0.35 + Math.random() * 0.35;

    Object.assign(petal.style, {
      position: 'absolute',
      top: '-24px',
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
      borderRadius: '50% 0 50% 50%',
      opacity: '0',
      pointerEvents: 'none',
      boxShadow: '0 2px 4px rgba(139, 111, 71, 0.15)',
      willChange: 'transform, opacity',
      animation: `petalFall ${duration}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`
    });

    // Randomize final opacity via CSS custom
    petal.style.setProperty('--o', opacity);

    container.appendChild(petal);
    petal.addEventListener('animationend', () => petal.remove(), { once: true });
  }

  function createCursorGlow() {
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500, glowX = -500, glowY = -500, visible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) { visible = true; glow.classList.add('visible'); }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      visible = false;
      glow.classList.remove('visible');
    }, { passive: true });

    function update() {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      glow.style.transform = `translate3d(${glowX - 175}px, ${glowY - 175}px, 0)`;
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);
  }

  return { init };
})();

export default Flowers;
