/* ==========================================================================
   Flowers & Effects Module
   Falling petals + cursor glow. Pauses when tab is hidden.
   ========================================================================== */

const Flowers = (() => {
  const MAX_PETALS = 10;
  const SPAWN_INTERVAL = 4500;
  const COLORS = ['#E7C8A0', '#F8F3EF', '#C48F65', '#f4dfc8', '#eddcc8'];
  let container, intervalId, rafId;

  function init() {
    createPetals();
    createCursorGlow();

    // Pause effects when tab is hidden
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

    for (let i = 0; i < 8; i++) setTimeout(() => spawnPetal(), i * 700);
    intervalId = setInterval(() => spawnPetal(), SPAWN_INTERVAL);
  }

  function spawnPetal() {
    // Limit DOM nodes
    if (container.children.length >= MAX_PETALS) return;

    const petal = document.createElement('div');
    const size = 6 + Math.random() * 10;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 2;

    Object.assign(petal.style, {
      position: 'absolute',
      top: '-20px',
      left: `${Math.random() * 100}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: COLORS[Math.floor(Math.random() * COLORS.length)],
      borderRadius: '50% 0 50% 50%',
      opacity: '0',
      pointerEvents: 'none',
      animation: `petalFall ${duration}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`
    });

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
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.transform = `translate3d(${glowX - 175}px, ${glowY - 175}px, 0)`;
      rafId = requestAnimationFrame(update);
    }
    rafId = requestAnimationFrame(update);
  }

  return { init };
})();

export default Flowers;
