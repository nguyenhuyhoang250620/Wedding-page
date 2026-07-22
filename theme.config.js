/* ==========================================================================
   theme.config.js — Wedding Theme Switcher
   
   Cách dùng: Đổi ACTIVE_THEME sang tên theme muốn dùng, rồi chạy:
     node theme.config.js
   Hoặc copy thủ công phần CSS variables vào css/variables.css
   ========================================================================== */

const ACTIVE_THEME = 'sageGarden'; // ← ĐỔI TÊN THEME Ở ĐÂY

// ==========================================================================
// 5 THEMES
// ==========================================================================

const themes = {

  // 1. IVORY GOLD — Kem vàng cổ điển (mặc định ban đầu)
  ivoryGold: {
    name: 'Ivory Gold',
    description: 'Kem trắng ngà, vàng champagne — sang trọng cổ điển',
    colors: {
      ivory:      '#FDFAF4',
      cream:      '#F5EEE3',
      beige:      '#E8DCC7',
      champagne:  '#D4B896',
      gold:       '#B8935C',
      goldDeep:   '#8B6F47',
      sepia:      '#4A3628',
      charcoal:   '#2A2018',
    },
    gradGold:  'linear-gradient(135deg, #E8DCC7 0%, #D4B896 50%, #B8935C 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(232,220,199,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(212,184,150,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(232,220,199,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(212,184,150,0.35), transparent 60%),
             #FDFAF4`,
    shadowColor: '74, 54, 40',
    accentRgb:   '184, 147, 92',
  },

  // 2. CRIMSON ROSE — Đỏ hồng lãng mạn
  crimsonRose: {
    name: 'Crimson Rose',
    description: 'Đỏ hoa hồng, vàng hồng — nồng nàn lãng mạn',
    colors: {
      ivory:      '#FDF6F6',
      cream:      '#F9EAEA',
      beige:      '#F0D0D0',
      champagne:  '#E0A8A8',
      gold:       '#C0464A',
      goldDeep:   '#8B2326',
      sepia:      '#4A1A1C',
      charcoal:   '#2A0C0E',
    },
    gradGold:  'linear-gradient(135deg, #F0D0D0 0%, #E0A8A8 50%, #C0464A 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(240,208,208,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(224,168,168,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(240,208,208,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(224,168,168,0.4), transparent 60%),
             #FDF6F6`,
    shadowColor: '74, 26, 28',
    accentRgb:   '192, 70, 74',
  },

  // 3. MIDNIGHT NAVY — Xanh đêm sang trọng
  midnightNavy: {
    name: 'Midnight Navy',
    description: 'Xanh đêm, vàng ánh kim — huyền bí quý phái',
    colors: {
      ivory:      '#F4F6FD',
      cream:      '#E8EDF8',
      beige:      '#C8D4EE',
      champagne:  '#A0B4D8',
      gold:       '#4A6FA5',
      goldDeep:   '#2A4A7A',
      sepia:      '#1A2A4A',
      charcoal:   '#0C1628',
    },
    gradGold:  'linear-gradient(135deg, #C8D4EE 0%, #A0B4D8 50%, #4A6FA5 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(200,212,238,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(160,180,216,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(200,212,238,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(160,180,216,0.35), transparent 60%),
             #F4F6FD`,
    shadowColor: '26, 42, 74',
    accentRgb:   '74, 111, 165',
  },

  // 4. SAGE GARDEN — Xanh lá nhẹ nhàng tự nhiên
  sageGarden: {
    name: 'Sage Garden',
    description: 'Xanh sage, vàng olive — tươi mát thiên nhiên',
    colors: {
      ivory:      '#F5F8F4',
      cream:      '#E8F0E5',
      beige:      '#C8DCC2',
      champagne:  '#A8C4A0',
      gold:       '#5A8A52',
      goldDeep:   '#3A6232',
      sepia:      '#1E3C1A',
      charcoal:   '#0E2010',
    },
    gradGold:  'linear-gradient(135deg, #C8DCC2 0%, #A8C4A0 50%, #5A8A52 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(200,220,194,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(168,196,160,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(200,220,194,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(168,196,160,0.35), transparent 60%),
             #F5F8F4`,
    shadowColor: '30, 60, 26',
    accentRgb:   '90, 138, 82',
  },

  // 5. DUSTY MAUVE — Tím hồng bụi nhẹ nhàng
  dustyMauve: {
    name: 'Dusty Mauve',
    description: 'Tím hồng bụi, vàng hồng — mộng mơ tinh tế',
    colors: {
      ivory:      '#FBF7FC',
      cream:      '#F3EAF6',
      beige:      '#E2D0EA',
      champagne:  '#C8AADA',
      gold:       '#9A5CB4',
      goldDeep:   '#6E3A84',
      sepia:      '#3C1A50',
      charcoal:   '#200A2E',
    },
    gradGold:  'linear-gradient(135deg, #E2D0EA 0%, #C8AADA 50%, #9A5CB4 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(226,208,234,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(200,170,218,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(226,208,234,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(200,170,218,0.35), transparent 60%),
             #FBF7FC`,
    shadowColor: '60, 26, 80',
    accentRgb:   '154, 92, 180',
  },

};

// ==========================================================================
// GENERATE CSS — chạy file này bằng Node.js để tự động ghi vào variables.css
// ==========================================================================

function generateCSS(theme) {
  const t = theme.colors;
  const s = theme.shadowColor;
  const a = theme.accentRgb;
  return `/* AUTO-GENERATED by theme.config.js — Theme: ${theme.name} */
/* ${theme.description} */

:root {
  --color-ivory:      ${t.ivory};
  --color-cream:      ${t.cream};
  --color-beige:      ${t.beige};
  --color-champagne:  ${t.champagne};
  --color-gold:       ${t.gold};
  --color-gold-deep:  ${t.goldDeep};
  --color-sepia:      ${t.sepia};
  --color-charcoal:   ${t.charcoal};
  --color-white:      #FFFFFF;
  --color-black:      #0F0B08;

  --color-primary:    var(--color-champagne);
  --color-secondary:  var(--color-cream);
  --color-text:       var(--color-sepia);
  --color-bg:         var(--color-ivory);
  --color-accent:     var(--color-gold);

  --color-glass:        rgba(${hexToRgb(t.ivory)}, 0.72);
  --color-glass-border: rgba(${a}, 0.28);
  --color-veil:         rgba(${s}, 0.06);

  --font-display: 'Cormorant Garamond', 'Playfair Display', serif;
  --font-script:  'Cormorant Garamond', 'Playfair Display', serif;
  --font-serif:   'Playfair Display', 'Cormorant Garamond', serif;
  --font-body:    'Cormorant Garamond', serif;
  --font-sans:    'Poppins', sans-serif;

  --fs-hero:  clamp(3.2rem, 8.5vw, 7rem);
  --fs-h1:    clamp(2.6rem, 5.6vw, 4.8rem);
  --fs-h2:    clamp(2.2rem, 4.5vw, 3.8rem);
  --fs-h3:    clamp(1.35rem, 2.4vw, 1.75rem);
  --fs-body:  clamp(0.98rem, 1.15vw, 1.1rem);
  --fs-small: clamp(0.78rem, 0.85vw, 0.88rem);
  --fs-micro: clamp(0.65rem, 0.75vw, 0.75rem);

  --space-xs:  0.5rem;
  --space-sm:  1rem;
  --space-md:  2rem;
  --space-lg:  4rem;
  --space-xl:  6rem;
  --space-2xl: 10rem;

  --radius-sm:   8px;
  --radius-md:   16px;
  --radius-lg:   28px;
  --radius-xl:   40px;
  --radius-full: 50%;

  --shadow-sm:   0 4px 20px rgba(${s}, 0.06);
  --shadow-md:   0 16px 50px rgba(${s}, 0.10);
  --shadow-lg:   0 32px 90px rgba(${s}, 0.14);
  --shadow-card: 0 20px 60px -12px rgba(${s}, 0.18), 0 4px 12px rgba(${s}, 0.05);
  --shadow-inset: inset 0 0 0 1px rgba(${a}, 0.15);

  --ease-out:         cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-expo:    cubic-bezier(0.19, 1, 0.22, 1);
  --ease-in-out:      cubic-bezier(0.76, 0, 0.24, 1);
  --ease-in-out-circ: cubic-bezier(0.85, 0, 0.15, 1);
  --ease-spring:      cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth:      cubic-bezier(0.45, 0, 0.15, 1);
  --ease-cinematic:   cubic-bezier(0.77, 0, 0.175, 1);
  --ease-reveal:      cubic-bezier(0.5, 0, 0, 1);
  --ease-silk:        cubic-bezier(0.65, 0.05, 0.36, 1);

  --duration-fast:      0.4s;
  --duration-normal:    0.8s;
  --duration-slow:      1.2s;
  --duration-slower:    1.8s;
  --duration-cinematic: 2.4s;

  --stagger-1: 0ms;
  --stagger-2: 80ms;
  --stagger-3: 160ms;
  --stagger-4: 240ms;
  --stagger-5: 320ms;
  --stagger-6: 400ms;
  --stagger-7: 480ms;
  --stagger-8: 560ms;

  --z-base:    1;
  --z-overlay: 100;
  --z-modal:   500;
  --z-loader:  1000;
  --z-cursor:  9999;

  --grad-cream:     linear-gradient(180deg, ${t.ivory} 0%, ${t.cream} 100%);
  --grad-rose-veil: ${theme.gradRoseVeil};
  --grad-gold:      ${theme.gradGold};
  --grad-gold-shine: linear-gradient(120deg, transparent 20%, rgba(255,255,255,0.55) 50%, transparent 80%);
}
`;
}

function hexToRgb(hex) {
  const r = parseInt(hex.slice(1,3),16);
  const g = parseInt(hex.slice(3,5),16);
  const b = parseInt(hex.slice(5,7),16);
  return `${r}, ${g}, ${b}`;
}

// Node.js: tự ghi file
if (typeof require !== 'undefined' && require.main === module) {
  const fs = require('fs');
  const path = require('path');
  const theme = themes[ACTIVE_THEME];
  if (!theme) { console.error(`Theme "${ACTIVE_THEME}" không tồn tại. Chọn: ${Object.keys(themes).join(', ')}`); process.exit(1); }
  const css = generateCSS(theme);
  const outPath = path.join(__dirname, 'css', 'variables.css');
  fs.writeFileSync(outPath, css, 'utf8');
  console.log(`✅ Đã áp dụng theme "${theme.name}" → css/variables.css`);
  console.log(`   ${theme.description}`);
}

export { themes, generateCSS, ACTIVE_THEME };
