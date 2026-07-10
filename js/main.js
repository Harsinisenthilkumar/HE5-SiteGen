/**
 * HE5 SiteGen — Main JavaScript
 * Handles: Navbar, Mobile Menu, Scroll Reveal, Count-Up, Active Links
 */

// ─────────────────────────────────────────────
// Navbar Scroll Effect
// ─────────────────────────────────────────────
(function initNavbar() {
  const navbar = document.querySelector('.navbar');
  if (!navbar) return;

  let ticking = false;

  function handleScroll() {
    if (!ticking) {
      requestAnimationFrame(() => {
        if (window.scrollY > 40) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
        ticking = false;
      });
      ticking = true;
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // init
})();

// ─────────────────────────────────────────────
// Mobile Menu
// ─────────────────────────────────────────────
(function initMobileMenu() {
  const hamburger = document.querySelector('.hamburger');
  const mobileMenu = document.querySelector('.mobile-menu');
  if (!hamburger || !mobileMenu) return;

  function openMenu() {
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    mobileMenu.style.display = 'flex';
    requestAnimationFrame(() => {
      mobileMenu.classList.add('open');
    });
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => {
      if (!mobileMenu.classList.contains('open')) {
        mobileMenu.style.display = '';
      }
    }, 400);
  }

  hamburger.addEventListener('click', () => {
    if (hamburger.classList.contains('open')) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  // Close on mobile nav link click
  document.querySelectorAll('.mobile-nav-link').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  // Close on ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('open')) {
      closeMenu();
    }
  });
})();

// ─────────────────────────────────────────────
// Scroll Reveal (Intersection Observer)
// ─────────────────────────────────────────────
(function initScrollReveal() {
  const elements = document.querySelectorAll('.reveal, .reveal-stagger');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px',
    }
  );

  elements.forEach(el => observer.observe(el));
})();

// ─────────────────────────────────────────────
// Count-Up Animation for Stats
// ─────────────────────────────────────────────
(function initCountUp() {
  const counters = document.querySelectorAll('[data-count]');
  if (!counters.length) return;

  function animateCounter(el) {
    const target = el.dataset.count;
    const isFloat = target.includes('.');
    const suffix = el.dataset.suffix || '';
    const prefix = el.dataset.prefix || '';
    const numTarget = parseFloat(target);
    const duration = 2000;
    const start = performance.now();

    function update(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = numTarget * eased;

      if (isFloat) {
        el.textContent = prefix + current.toFixed(1) + suffix;
      } else {
        el.textContent = prefix + Math.floor(current).toLocaleString() + suffix;
      }

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = prefix + (isFloat ? numTarget.toFixed(1) : numTarget.toLocaleString()) + suffix;
      }
    }

    requestAnimationFrame(update);
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  counters.forEach(el => observer.observe(el));
})();

// ─────────────────────────────────────────────
// Active Navigation Highlighting
// ─────────────────────────────────────────────
(function initActiveNav() {
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';

  document.querySelectorAll('.nav-link, .mobile-nav-link').forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    const linkPage = href.split('/').pop();
    if (
      linkPage === currentPath ||
      (currentPath === '' && linkPage === 'index.html') ||
      (currentPath === 'index.html' && linkPage === 'index.html')
    ) {
      link.classList.add('active');
    }
  });
})();

// ─────────────────────────────────────────────
// Smooth Anchor Scrolling
// ─────────────────────────────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ─────────────────────────────────────────────
// Hero Typing Effect
// ─────────────────────────────────────────────
(function initTypingEffect() {
  const promptEl = document.querySelector('.prompt-text-content');
  if (!promptEl) return;

  const phrases = [
    "I run a cozy Italian restaurant in downtown Chicago with 20 years of history...",
    "I'm a freelance photographer specializing in wedding and portrait photography...",
    "We're a boutique fitness studio offering yoga, pilates, and HIIT classes...",
    "I'm a real estate agent in Miami focusing on luxury waterfront properties...",
    "We run a healthcare clinic providing primary care and wellness services...",
  ];

  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let isPaused = false;

  function type() {
    const currentPhrase = phrases[phraseIndex];

    if (isPaused) {
      setTimeout(type, 1500);
      isPaused = false;
      return;
    }

    if (!isDeleting) {
      promptEl.textContent = currentPhrase.slice(0, charIndex + 1);
      charIndex++;

      if (charIndex === currentPhrase.length) {
        isDeleting = true;
        isPaused = true;
      }
    } else {
      promptEl.textContent = currentPhrase.slice(0, charIndex - 1);
      charIndex--;

      if (charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }

    const speed = isDeleting ? 30 : 55;
    setTimeout(type, speed);
  }

  type();
})();
