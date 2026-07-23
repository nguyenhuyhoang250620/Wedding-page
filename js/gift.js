/* ==========================================================================
   Gift — opens a modal with bank transfer info for groom / bride
   Data source: data.json → gift.groom / gift.bride
   Fallback defaults if data.json missing.
   ========================================================================== */

const Gift = (() => {
  let modal, titleEl, fields, copyBtn, giftData;

  const defaults = {
    groom: {
      title: 'Chú Rể — Huy Hoàng',
      bank: 'Vietcombank',
      name: 'NGUYEN HUY HOANG',
      number: '1234567890'
    },
    bride: {
      title: 'Cô Dâu — Thu Thảo',
      bank: 'Techcombank',
      name: 'LE THU THAO',
      number: '0987654321'
    }
  };

  function init(data) {
    giftData = data || defaults;
    modal = document.getElementById('gift-modal');
    if (!modal) return;

    titleEl = modal.querySelector('.gift-modal__title');
    fields = {
      bank: modal.querySelector('[data-field="bank"]'),
      name: modal.querySelector('[data-field="name"]'),
      number: modal.querySelector('[data-field="number"]')
    };
    copyBtn = modal.querySelector('[data-copy]');

    // Open triggers
    document.querySelectorAll('.gift-card').forEach(btn => {
      btn.addEventListener('click', () => open(btn.dataset.gift));
    });

    // Close triggers
    modal.querySelectorAll('[data-close]').forEach(el => {
      el.addEventListener('click', close);
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) close();
    });

    // Copy
    copyBtn?.addEventListener('click', copyNumber);
  }

  function open(key) {
    const info = giftData?.[key] || defaults[key];
    if (!info || !modal) return;
    titleEl.textContent = info.title;
    fields.bank.textContent = info.bank;
    fields.name.textContent = info.name;
    fields.number.textContent = formatNumber(info.number);
    copyBtn.dataset.number = info.number;
    copyBtn.classList.remove('is-copied');

    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function close() {
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    copyBtn.classList.remove('is-copied');
  }

  function copyNumber() {
    const number = copyBtn.dataset.number;
    if (!number) return;
    navigator.clipboard?.writeText(number).then(() => {
      copyBtn.classList.add('is-copied');
      setTimeout(() => copyBtn.classList.remove('is-copied'), 1800);
    }).catch(() => {
      // Fallback for older browsers
      const ta = document.createElement('textarea');
      ta.value = number;
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); copyBtn.classList.add('is-copied'); } catch {}
      document.body.removeChild(ta);
      setTimeout(() => copyBtn.classList.remove('is-copied'), 1800);
    });
  }

  function formatNumber(n) {
    // Group by 4 for readability
    return String(n).replace(/(\d{4})(?=\d)/g, '$1 ');
  }

  return { init, open, close };
})();

export default Gift;
