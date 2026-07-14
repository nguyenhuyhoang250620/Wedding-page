/* ==========================================================================
   Flowers & Effects Module
   Falling flower petals + cursor glow.
   
   GPU-ONLY: All motion uses transform3d and opacity.
   Uses CSS animations for petals (offloaded to compositor).
   Uses rAF with lerp for cursor glow (smooth 60fps follow).
   ========================================================================== */

const Flowers = (() => {
  const PETAL_COUNT = 12;
  const SPAWN_INTERVAL = 4000;
  const COLORS = ['#E7C8A0', '#F8F3EF', '#C48F65', '#f4dfc8', '#eddcc8'];

  /** Initialize all effects */
  function init() {
    createPetals();
    createCursorGlow();
  }

  /** Create falling petals — uses CSS animation (GPU-composited) */
  function createPetals() {
    const container = document.createElement('div');
    container.className = 'flowers-canvas';
    container.setAttribute('aria-hidden', 'true');
    document.body.appendChild(container);

    // Initial burst with stagger
    for (let i = 0; i < PETAL_COUNT; i++) {
      setTimeout(() => spawnPetal(container), i * 600);
    }

    // Continuous ambient spawning
    setInterval(() => spawnPetal(container), SPAWN_INTERVAL);
  }

  /** Spawn a single petal — CSS animation handles all motion */
  function spawnPetal(container) {
    const petal = document.createElement('div');
    const size = 6 + Math.random() * 10;
    const startX = Math.random() * 100;
    const duration = 10 + Math.random() * 8;
    const delay = Math.random() * 2;
    const color = COLORS[Math.floor(Math.random() * COLORS.length)];

    Object.assign(petal.style, {
      position: 'absolute',
      top: '-20px',
      left: `${startX}%`,
      width: `${size}px`,
      height: `${size}px`,
      background: color,
      borderRadius: '50% 0 50% 50%',
      opacity: '0',
      pointerEvents: 'none',
      willChange: 'transform, opacity',
      animation: `petalFall ${duration}s cubic-bezier(0.45, 0, 0.15, 1) ${delay}s forwards`
    });

    container.appendChild(petal);

    // Cleanup after animation completes
    setTimeout(() => petal.remove(), (duration + delay) * 1000);
  }

  /** Cursor glow — smooth lerp follow using rAF + transform3d */
  function createCursorGlow() {
    // Skip on touch devices for performance
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);

    let mouseX = -500, mouseY = -500;
    let glowX = -500, glowY = -500;
    let visible = false;

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!visible) {
        visible = true;
        glow.classList.add('visible');
      }
    }, { passive: true });

    document.addEventListener('mouseleave', () => {
      visible = false;
      glow.classList.remove('visible');
    }, { passive: true });

    // Smooth follow with lerp — GPU transform only
    function update() {
      glowX += (mouseX - glowX) * 0.06;
      glowY += (mouseY - glowY) * 0.06;
      glow.style.transform = `translate3d(${glowX - 175}px, ${glowY - 175}px, 0)`;
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  return { init };
})();

export default Flowers;
