const Gift = (() => {
  let modal;
  let accountList;
  let closeButton;
  let previousOverflow = '';
  let returnFocus = null;
  let giftData = {};

  function init(data) {
    giftData = data || {};
    modal = document.getElementById('gift-modal');
    if (!modal) return;

    accountList = modal.querySelector('[data-gift-accounts]');
    closeButton = modal.querySelector('.gift-modal__close');
    document.querySelectorAll('[data-gift-open]').forEach(button => {
      button.addEventListener('click', () => open(button));
    });

    modal.querySelectorAll('[data-close]').forEach(element => {
      element.addEventListener('click', close);
    });

    document.addEventListener('keydown', event => {
      if (event.key === 'Escape' && modal.classList.contains('is-open')) close();
    });
  }

  function open(trigger) {
    const accounts = ['groom', 'bride']
      .map(key => ({ key, ...giftData[key] }))
      .filter(account => account.bank && account.name && account.number);

    if (!accounts.length) {
      console.error('Cannot open wedding gift envelope: account details are missing.');
      return;
    }

    returnFocus = trigger;
    accountList.replaceChildren(...accounts.map(createAccountCard));
    modal.classList.add('is-open');
    modal.setAttribute('aria-hidden', 'false');
    previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeButton.focus();
  }

  function createAccountCard(account) {
    const card = document.createElement('article');
    card.className = 'gift-account';

    const qr = document.createElement('img');
    qr.className = 'gift-account__qr';
    qr.src = account.qrImage;
    qr.alt = `Mã QR chuyển khoản ${account.key === 'groom' ? 'chú rể' : 'cô dâu'}`;
    qr.loading = 'lazy';

    const info = document.createElement('div');
    info.className = 'gift-account__info';

    const label = document.createElement('span');
    label.className = 'gift-account__label';
    label.textContent = account.key === 'groom' ? 'Chú rể' : 'Cô dâu';

    const name = document.createElement('strong');
    name.className = 'gift-account__name';
    name.textContent = account.name;

    const bank = document.createElement('span');
    bank.className = 'gift-account__bank';
    bank.textContent = account.bank;

    const number = document.createElement('button');
    number.className = 'gift-account__number';
    number.type = 'button';
    number.textContent = formatNumber(account.number);
    number.setAttribute('aria-label', `Sao chép số tài khoản ${formatNumber(account.number)}`);
    number.addEventListener('click', () => copyNumber(account.number, number));

    info.append(label, name, bank, number);

    const download = document.createElement('a');
    download.className = 'gift-account__download';
    download.href = account.qrImage;
    download.download = `${account.key}-wedding-qr.png`;
    download.textContent = 'Tải QR';

    card.append(qr, info, download);
    return card;
  }

  function close() {
    if (!modal?.classList.contains('is-open')) return;
    modal.classList.remove('is-open');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = previousOverflow;
    returnFocus?.focus();
    returnFocus = null;
  }

  async function copyNumber(value, button) {
    try {
      await navigator.clipboard.writeText(value);
      button.classList.add('is-copied');
      window.setTimeout(() => button.classList.remove('is-copied'), 1800);
    } catch (error) {
      console.error('Unable to copy the wedding account number.', error);
    }
  }

  function formatNumber(value) {
    return String(value).replace(/\B(?=(\d{4})+(?!\d))/g, ' ');
  }

  return { init, close };
})();

export default Gift;
