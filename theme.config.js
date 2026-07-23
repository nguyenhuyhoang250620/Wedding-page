/* ==========================================================================
   theme.config.js — Wedding Theme Switcher
   
   Cách dùng: Đổi ACTIVE_THEME sang tên theme muốn dùng, rồi chạy:
     node theme.config.js
   Hoặc copy thủ công phần CSS variables vào css/variables.css
   ========================================================================== */

const ACTIVE_THEME = 'forestNight'; // ← ĐỔI TÊN THEME Ở ĐÂY

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

  // 6. BLUSH PEACH — Đào hồng ngọt ngào
  blushPeach: {
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

  // 6. BLUSH PEACH — Đào hồng ngọt ngào
  blushPeach: {
    name: 'Blush Peach',
    description: 'Đào hồng, cam nhạt — ngọt ngào rực rỡ',
    colors: {
      ivory:      '#FFF8F4',
      cream:      '#FDEEE6',
      beige:      '#F8D8C4',
      champagne:  '#F0B898',
      gold:       '#D4724A',
      goldDeep:   '#A04A28',
      sepia:      '#4A2010',
      charcoal:   '#2A1008',
    },
    gradGold:  'linear-gradient(135deg, #F8D8C4 0%, #F0B898 50%, #D4724A 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(248,216,196,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(240,184,152,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(248,216,196,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(240,184,152,0.4), transparent 60%),
             #FFF8F4`,
    shadowColor: '74, 32, 16',
    accentRgb:   '212, 114, 74',
  },

  // 7. EMERALD FOREST — Xanh lá đậm huyền bí
  emeraldForest: {
    name: 'Emerald Forest',
    description: 'Xanh lá đậm, vàng ánh — huyền bí quyến rũ',
    colors: {
      ivory:      '#F2F8F4',
      cream:      '#E0F0E6',
      beige:      '#B8D8C4',
      champagne:  '#88B89A',
      gold:       '#2E7A50',
      goldDeep:   '#1A5234',
      sepia:      '#0E3020',
      charcoal:   '#061810',
    },
    gradGold:  'linear-gradient(135deg, #B8D8C4 0%, #88B89A 50%, #2E7A50 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(184,216,196,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(136,184,154,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(184,216,196,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(136,184,154,0.35), transparent 60%),
             #F2F8F4`,
    shadowColor: '14, 48, 32',
    accentRgb:   '46, 122, 80',
  },

  // 8. GOLDEN HOUR — Hoàng hôn vàng ấm
  goldenHour: {
    name: 'Golden Hour',
    description: 'Vàng ấm, cam đồng — rực rỡ hoàng hôn',
    colors: {
      ivory:      '#FFFBF0',
      cream:      '#FFF3D0',
      beige:      '#FFE4A0',
      champagne:  '#F5C842',
      gold:       '#D4960A',
      goldDeep:   '#9A6A00',
      sepia:      '#4A3000',
      charcoal:   '#2A1A00',
    },
    gradGold:  'linear-gradient(135deg, #FFE4A0 0%, #F5C842 50%, #D4960A 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(255,228,160,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(245,200,66,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(255,228,160,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(245,200,66,0.35), transparent 60%),
             #FFFBF0`,
    shadowColor: '74, 48, 0',
    accentRgb:   '212, 150, 10',
  },

  // 9. SLATE ROSE — Xám hồng hiện đại
  slateRose: {
    name: 'Slate Rose',
    description: 'Xám đá, hồng nhạt — hiện đại tinh tế',
    colors: {
      ivory:      '#F8F6F7',
      cream:      '#EEE8EC',
      beige:      '#D8CCD4',
      champagne:  '#C0A8B4',
      gold:       '#8A6070',
      goldDeep:   '#5E3A48',
      sepia:      '#3A1E28',
      charcoal:   '#1E0E14',
    },
    gradGold:  'linear-gradient(135deg, #D8CCD4 0%, #C0A8B4 50%, #8A6070 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(216,204,212,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(192,168,180,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(216,204,212,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(192,168,180,0.35), transparent 60%),
             #F8F6F7`,
    shadowColor: '58, 30, 40',
    accentRgb:   '138, 96, 112',
  },

  // 10. OCEAN BREEZE — Xanh biển trong trẻ́o
  oceanBreeze: {
    name: 'Ocean Breeze',
    description: 'Xanh biển, xanh ngọc — trong trẻ́o lãng mạn',
    colors: {
      ivory:      '#F2FAFA',
      cream:      '#E0F4F6',
      beige:      '#B8E4EA',
      champagne:  '#80C8D4',
      gold:       '#2A8FA0',
      goldDeep:   '#1A6070',
      sepia:      '#0C3040',
      charcoal:   '#061820',
    },
    gradGold:  'linear-gradient(135deg, #B8E4EA 0%, #80C8D4 50%, #2A8FA0 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(184,228,234,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(128,200,212,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(184,228,234,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(128,200,212,0.35), transparent 60%),
             #F2FAFA`,
    shadowColor: '12, 48, 64',
    accentRgb:   '42, 143, 160',
  },

  // 11. BURGUNDY VELVET — Đỏ rượu vang sang trọng
  burgundyVelvet: {
    name: 'Burgundy Velvet',
    description: 'Đỏ rượu vang, vàng đồng — sang trọng quyến rũ',
    colors: {
      ivory:      '#FDF5F6',
      cream:      '#F5E4E6',
      beige:      '#E8C0C4',
      champagne:  '#CC8890',
      gold:       '#8B2030',
      goldDeep:   '#5E1020',
      sepia:      '#3A0810',
      charcoal:   '#1E0408',
    },
    gradGold:  'linear-gradient(135deg, #E8C0C4 0%, #CC8890 50%, #8B2030 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(232,192,196,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(204,136,144,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(232,192,196,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(204,136,144,0.4), transparent 60%),
             #FDF5F6`,
    shadowColor: '58, 8, 16',
    accentRgb:   '139, 32, 48',
  },

  // 12. LAVENDER MIST — Oai hương sương mù
  lavenderMist: {
    name: 'Lavender Mist',
    description: 'Oai hương nhạt, trắng sương — thanh khiết dịu dàng',
    colors: {
      ivory:      '#F8F6FF',
      cream:      '#EEE8FF',
      beige:      '#D8CCFF',
      champagne:  '#B8A8E8',
      gold:       '#7060C0',
      goldDeep:   '#4A3A90',
      sepia:      '#281E50',
      charcoal:   '#140E2E',
    },
    gradGold:  'linear-gradient(135deg, #D8CCFF 0%, #B8A8E8 50%, #7060C0 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(216,204,255,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(184,168,232,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(216,204,255,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(184,168,232,0.35), transparent 60%),
             #F8F6FF`,
    shadowColor: '40, 30, 80',
    accentRgb:   '112, 96, 192',
  },

  // 13. COPPER EARTH — Đồng đất ấm
  copperEarth: {
    name: 'Copper Earth',
    description: 'Đồng đỏ, nâu đất — ấm áp chân thực',
    colors: {
      ivory:      '#FBF6F0',
      cream:      '#F4EAE0',
      beige:      '#E8D0B8',
      champagne:  '#D4A880',
      gold:       '#B06030',
      goldDeep:   '#7A3E18',
      sepia:      '#3E1E08',
      charcoal:   '#200E04',
    },
    gradGold:  'linear-gradient(135deg, #E8D0B8 0%, #D4A880 50%, #B06030 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(232,208,184,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(212,168,128,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(232,208,184,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(212,168,128,0.4), transparent 60%),
             #FBF6F0`,
    shadowColor: '62, 30, 8',
    accentRgb:   '176, 96, 48',
  },

  // 14. ARCTIC WHITE — Trắng băng tinh khiết
  arcticWhite: {
    name: 'Arctic White',
    description: 'Trắng tinh, bạc lạnh — thuần khiết tối giản',
    colors: {
      ivory:      '#FEFEFE',
      cream:      '#F6F6F8',
      beige:      '#E4E4EC',
      champagne:  '#C8C8D8',
      gold:       '#8888A8',
      goldDeep:   '#505068',
      sepia:      '#282838',
      charcoal:   '#101018',
    },
    gradGold:  'linear-gradient(135deg, #E4E4EC 0%, #C8C8D8 50%, #8888A8 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(228,228,236,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(200,200,216,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(228,228,236,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(200,200,216,0.35), transparent 60%),
             #FEFEFE`,
    shadowColor: '40, 40, 56',
    accentRgb:   '136, 136, 168',
  },

  // 15. CHERRY BLOSSOM — Hoa anh đào Nhật
  cherryBlossom: {
    name: 'Cherry Blossom',
    description: 'Hồng anh đào, trắng ngà — nhẹ nhàng Nhật Bản',
    colors: {
      ivory:      '#FFF8FA',
      cream:      '#FDEEF3',
      beige:      '#F8D4E0',
      champagne:  '#F0AABF',
      gold:       '#D4607A',
      goldDeep:   '#A03050',
      sepia:      '#4A1428',
      charcoal:   '#280A14',
    },
    gradGold:  'linear-gradient(135deg, #F8D4E0 0%, #F0AABF 50%, #D4607A 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(248,212,224,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(240,170,191,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(248,212,224,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(240,170,191,0.4), transparent 60%),
             #FFF8FA`,
    shadowColor: '74, 20, 40',
    accentRgb:   '212, 96, 122',
  },

  // 16. ONYX GOLD — Đen huyền vàng đồng
  onyxGold: {
    name: 'Onyx Gold',
    description: 'Đen huyền, vàng đồng — bí ẩn xa hoa',
    colors: {
      ivory:      '#1A1610',
      cream:      '#242018',
      beige:      '#3A3020',
      champagne:  '#6A5830',
      gold:       '#C8A040',
      goldDeep:   '#F0C860',
      sepia:      '#E8D8A0',
      charcoal:   '#FDF8E8',
    },
    gradGold:  'linear-gradient(135deg, #6A5830 0%, #C8A040 50%, #F0C860 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(106,88,48,0.4) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(200,160,64,0.2) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(106,88,48,0.35), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(200,160,64,0.2), transparent 60%),
             #1A1610`,
    shadowColor: '0, 0, 0',
    accentRgb:   '200, 160, 64',
  },

  // 17. TERRACOTTA — Đất nung địa trung hải
  terracotta: {
    name: 'Terracotta',
    description: 'Đất nung, cam đỏ — ấm nóng địa trung hải',
    colors: {
      ivory:      '#FDF8F2',
      cream:      '#F8EDE0',
      beige:      '#EED4B8',
      champagne:  '#DDB088',
      gold:       '#C06840',
      goldDeep:   '#8A4020',
      sepia:      '#3E1C08',
      charcoal:   '#200E04',
    },
    gradGold:  'linear-gradient(135deg, #EED4B8 0%, #DDB088 50%, #C06840 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(238,212,184,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(221,176,136,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(238,212,184,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(221,176,136,0.4), transparent 60%),
             #FDF8F2`,
    shadowColor: '62, 28, 8',
    accentRgb:   '192, 104, 64',
  },

  // 18. ROSE GOLD — Vàng hồng hiện đại
  roseGold: {
    name: 'Rose Gold',
    description: 'Vàng hồng, đồng ánh — hiện đại sang trọng',
    colors: {
      ivory:      '#FDF8F6',
      cream:      '#F8EDE8',
      beige:      '#EED4C8',
      champagne:  '#DDB4A0',
      gold:       '#C08060',
      goldDeep:   '#8A5038',
      sepia:      '#3E2018',
      charcoal:   '#20100C',
    },
    gradGold:  'linear-gradient(135deg, #EED4C8 0%, #DDB4A0 50%, #C08060 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(238,212,200,0.65) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(221,180,160,0.4) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(238,212,200,0.6), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(221,180,160,0.4), transparent 60%),
             #FDF8F6`,
    shadowColor: '62, 32, 24',
    accentRgb:   '192, 128, 96',
  },

  // 19. FOREST NIGHT — Rừng đêm huyền bí
  forestNight: {
    name: 'Forest Night',
    description: 'Xanh rừng đêm, vàng ánh trăng — huyền bí lãng mạn',
    colors: {
      ivory:      '#0E1A12',
      cream:      '#162010',
      beige:      '#243018',
      champagne:  '#486030',
      gold:       '#90C050',
      goldDeep:   '#B8E070',
      sepia:      '#D8F0A0',
      charcoal:   '#F0FAD8',
    },
    gradGold:  'linear-gradient(135deg, #486030 0%, #90C050 50%, #B8E070 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(72,96,48,0.4) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(144,192,80,0.2) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(72,96,48,0.35), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(144,192,80,0.2), transparent 60%),
             #0E1A12`,
    shadowColor: '0, 0, 0',
    accentRgb:   '144, 192, 80',
  },

  // 20. SAPPHIRE DUSK — Hoàng hôn xanh sapphire
  sapphireDusk: {
    name: 'Sapphire Dusk',
    description: 'Xanh sapphire, tím hoàng hôn — huyền ảo lãng mạn',
    colors: {
      ivory:      '#F4F2FF',
      cream:      '#E8E4FF',
      beige:      '#CCC4F8',
      champagne:  '#A898E8',
      gold:       '#5040C0',
      goldDeep:   '#302890',
      sepia:      '#180E50',
      charcoal:   '#0C0828',
    },
    gradGold:  'linear-gradient(135deg, #CCC4F8 0%, #A898E8 50%, #5040C0 100%)',
    gradRoseVeil: `radial-gradient(ellipse at 30% 20%, rgba(204,196,248,0.6) 0%, transparent 60%),
                   radial-gradient(ellipse at 70% 80%, rgba(168,152,232,0.35) 0%, transparent 55%)`,
    bodyBg: `radial-gradient(1200px 800px at 12% 8%, rgba(204,196,248,0.55), transparent 60%),
             radial-gradient(1400px 900px at 92% 92%, rgba(168,152,232,0.35), transparent 60%),
             #F4F2FF`,
    shadowColor: '24, 14, 80',
    accentRgb:   '80, 64, 192',
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

  --accent-rgb:  ${a};
  --gold-rgb:    ${a};
  --shadow-rgb:  ${s};

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
const fs = require('fs');
const path = require('path');
const theme = themes[ACTIVE_THEME];
if (!theme) {
  console.error(`Theme "${ACTIVE_THEME}" không tồn tại. Chọn: ${Object.keys(themes).join(', ')}`);
  process.exit(1);
}
const css = generateCSS(theme);
const outPath = path.join(__dirname, 'css', 'variables.css');
fs.writeFileSync(outPath, css, 'utf8');
console.log(`✅ Đã áp dụng theme "${theme.name}" → css/variables.css`);
console.log(`   ${theme.description}`);
console.log(`\nCác theme khác: ${Object.keys(themes).filter(k => k !== ACTIVE_THEME).join(', ')}`);
