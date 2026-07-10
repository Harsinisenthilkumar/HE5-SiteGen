/**
 * HE5 SiteGen — Testimonials Carousel
 */
(function initTestimonialsCarousel() {
  const track       = document.querySelector('.testimonials-track');
  const dotsWrap    = document.querySelector('.carousel-dots');
  const prevBtn     = document.querySelector('#carousel-prev');
  const nextBtn     = document.querySelector('#carousel-next');

  if (!track) return;

  const cards       = Array.from(track.children);
  let currentIndex  = 0;
  let autoTimer     = null;
  let cardsPerView  = getCardsPerView();

  function getCardsPerView() {
    if (window.innerWidth >= 1024) return 3;
    if (window.innerWidth >= 768)  return 2;
    return 1;
  }

  const maxIndex = Math.max(0, cards.length - cardsPerView);

  // Build dots
  function buildDots() {
    if (!dotsWrap) return;
    dotsWrap.innerHTML = '';
    const total = maxIndex + 1;
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('button');
      dot.className = 'carousel-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', `Go to slide ${i + 1}`);
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
  }

  function updateDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('.carousel-dot').forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  function goTo(index) {
    currentIndex = Math.max(0, Math.min(index, maxIndex));
    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap       = 24; // var(--space-6)
    track.style.transform = `translateX(-${currentIndex * (cardWidth + gap)}px)`;
    updateDots();
  }

  function next() {
    goTo(currentIndex < maxIndex ? currentIndex + 1 : 0);
  }

  function prev() {
    goTo(currentIndex > 0 ? currentIndex - 1 : maxIndex);
  }

  function startAuto() {
    stopAuto();
    autoTimer = setInterval(next, 5000);
  }

  function stopAuto() {
    if (autoTimer) {
      clearInterval(autoTimer);
      autoTimer = null;
    }
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { stopAuto(); next(); startAuto(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { stopAuto(); prev(); startAuto(); });

  // Pause on hover
  track.addEventListener('mouseenter', stopAuto);
  track.addEventListener('mouseleave', startAuto);

  // Touch/swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
    stopAuto();
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      diff > 0 ? next() : prev();
    }
    startAuto();
  }, { passive: true });

  // Resize handler
  window.addEventListener('resize', () => {
    cardsPerView = getCardsPerView();
    goTo(Math.min(currentIndex, Math.max(0, cards.length - cardsPerView)));
    buildDots();
  });

  buildDots();
  startAuto();
})();
