const Book = (() => {
  const state = {
    pages: [],
    current: 0,
    frame: 0,
    opening: false,
    autoScrollEnabled: false,
    autoScrollTimer: 0,
    autoScrollFrame: 0,
    autoScrollStart: 0,
    autoScrollFrom: 0,
    autoScrollTo: 0,
    autoScrollDuration: 0,
    previousScrollBehavior: ''
  };

  function getPageIndexAtViewport() {
    const focusY = window.innerHeight * 0.35;
    let nearestIndex = 0;
    let nearestDistance = Infinity;

    state.pages.forEach((page, index) => {
      const rect = page.getBoundingClientRect();
      if (rect.top <= focusY && rect.bottom >= focusY) {
        nearestIndex = index;
        nearestDistance = 0;
        return;
      }

      const distance = Math.min(Math.abs(rect.top - focusY), Math.abs(rect.bottom - focusY));
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });

    return nearestIndex;
  }

  function updateNavigation() {
    state.current = getPageIndexAtViewport();
    const dots = document.querySelectorAll('.book-nav__dot');

    dots.forEach((dot, index) => {
      const active = index === state.current;
      dot.classList.toggle('is-active', active);
      dot.setAttribute('aria-current', active ? 'location' : 'false');
    });

    const previous = document.querySelector('.book-nav__arrow--prev');
    const next = document.querySelector('.book-nav__arrow--next');
    if (previous) previous.disabled = state.current === 0;
    if (next) next.disabled = state.current >= state.pages.length - 1;
  }

  function scheduleNavigationUpdate() {
    if (state.frame) return;
    state.frame = window.requestAnimationFrame(() => {
      state.frame = 0;
      updateNavigation();
    });
  }

  function scrollToPage(index) {
    const page = state.pages[index];
    if (!page) return;

    page.scrollIntoView({
      behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
      block: 'start'
    });
  }

  function stopAutoScroll() {
    state.autoScrollEnabled = false;
    window.clearTimeout(state.autoScrollTimer);
    window.cancelAnimationFrame(state.autoScrollFrame);
    state.autoScrollTimer = 0;
    state.autoScrollFrame = 0;

    document.documentElement.style.scrollBehavior = state.previousScrollBehavior;
    state.previousScrollBehavior = '';
  }

  function onUserInteraction() {
    if (state.autoScrollEnabled) stopAutoScroll();
  }

  function animateAutoScroll(timestamp) {
    if (!state.autoScrollEnabled) return;

    const progress = Math.min((timestamp - state.autoScrollStart) / state.autoScrollDuration, 1);
    document.documentElement.scrollTop =
      state.autoScrollFrom + (state.autoScrollTo - state.autoScrollFrom) * progress;

    if (progress < 1) {
      state.autoScrollFrame = window.requestAnimationFrame(animateAutoScroll);
    } else {
      stopAutoScroll();
    }
  }

  function startAutoScroll() {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    state.autoScrollEnabled = true;
    state.previousScrollBehavior = document.documentElement.style.scrollBehavior;
    state.autoScrollTimer = window.setTimeout(() => {
      state.autoScrollFrom = window.scrollY;
      state.autoScrollTo = Math.max(
        document.documentElement.scrollHeight - window.innerHeight,
        0
      );
      const distance = state.autoScrollTo - state.autoScrollFrom;
      if (distance <= 0) {
        stopAutoScroll();
        return;
      }

      document.documentElement.style.scrollBehavior = 'auto';
      state.autoScrollStart = performance.now();
      state.autoScrollDuration = Math.min(Math.max(distance * 18, 45000), 90000);
      state.autoScrollFrame = window.requestAnimationFrame(animateAutoScroll);
    }, 0);
  }

  function buildDots() {
    const container = document.querySelector('.book-nav__dots');
    if (!container) return;

    container.innerHTML = '';
    state.pages.forEach((page, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'book-nav__dot';
      const titleElement = page.querySelector('h1, h2') || page.querySelector('.section-kicker');
      const title = titleElement?.textContent.trim();
      dot.setAttribute('aria-label', title ? `Đi đến phần: ${title}` : `Đi đến phần ${index + 1}`);
      dot.addEventListener('click', () => scrollToPage(index));
      container.appendChild(dot);
    });
  }

  function openInvitation() {
    const book = document.querySelector('.book');
    const coverScreen = document.querySelector('.cover-screen');
    if (!book || !coverScreen || state.opening || book.classList.contains('opened')) return;

    state.opening = true;
    book.classList.add('is-opening');
    coverScreen.classList.add('is-opening');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const delay = reducedMotion ? 0 : 1250;

    window.setTimeout(() => {
      book.classList.remove('is-opening');
      book.classList.add('opened');
      coverScreen.classList.remove('is-opening');
      coverScreen.classList.add('is-hidden');
      document.documentElement.classList.remove('cover-locked');
      document.body.classList.add('invitation-open');
      document.dispatchEvent(new Event('invitation:opened'));
      state.opening = false;
      scrollToPage(0);
      updateNavigation();
      startAutoScroll();
    }, delay);
  }

  function init() {
    const book = document.querySelector('.book');
    if (!book) return;

    state.pages = Array.from(book.querySelectorAll('.page:not(.page--cover)'));
    window.scrollTo(0, 0);
    document.documentElement.classList.add('cover-locked');
    buildDots();

    const coverScreen = document.querySelector('.cover-screen');
    if (coverScreen) coverScreen.addEventListener('click', openInvitation);

    const previous = document.querySelector('.book-nav__arrow--prev');
    const next = document.querySelector('.book-nav__arrow--next');
    if (previous) previous.addEventListener('click', () => scrollToPage(state.current - 1));
    if (next) next.addEventListener('click', () => scrollToPage(state.current + 1));

    window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
    window.addEventListener('resize', scheduleNavigationUpdate);
    window.addEventListener('pointerdown', onUserInteraction, { passive: true });
    window.addEventListener('wheel', onUserInteraction, { passive: true });
    window.addEventListener('touchstart', onUserInteraction, { passive: true });
    window.addEventListener('keydown', onUserInteraction, true);
    document.addEventListener('visibilitychange', () => {
      if (document.hidden) onUserInteraction();
    });
    updateNavigation();
  }

  return { init };
})();

export default Book;
