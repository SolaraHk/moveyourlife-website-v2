(() => {
  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const revealItems = Array.from(document.querySelectorAll('[data-reveal]'));
  if (prefersReduced || !('IntersectionObserver' in window)) {
    revealItems.forEach((el) => el.classList.add('is-visible'));
  } else {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.12 }
    );

    revealItems.forEach((el, index) => {
      el.style.transitionDelay = `${Math.min(index * 35, 240)}ms`;
      observer.observe(el);
    });
  }

  const anchorLinks = Array.from(document.querySelectorAll('a[href^="#"]'));
  const getTargetTop = (target) => {
    const header = document.querySelector('.site-header');
    const headerOffset = header ? header.getBoundingClientRect().height + 28 : 0;
    return target.getBoundingClientRect().top + window.scrollY - headerOffset;
  };

  const createFallbackScroll = (target) => {
    window.scrollTo({ top: getTargetTop(target), behavior: prefersReduced ? 'auto' : 'smooth' });
  };

  const noLenisPreview = new URLSearchParams(window.location.search).has('no-lenis');
  let lenis;
  if (!prefersReduced && !noLenisPreview && window.Lenis) {
    lenis = new window.Lenis({
      duration: 1.08,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.86,
      touchMultiplier: 1.15,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
  }

  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const id = link.getAttribute('href');
      if (!id || id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;

      event.preventDefault();
      if (lenis) {
        lenis.scrollTo(target, { offset: -94, duration: 1.08 });
      } else {
        createFallbackScroll(target);
      }
      history.pushState(null, '', id);
    });
  });

  const cards = Array.from(document.querySelectorAll('.hero-card, .case-card, .award-list article'));
  cards.forEach((card) => {
    card.addEventListener('mousemove', (event) => {
      if (prefersReduced || window.innerWidth < 900) return;
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      card.style.setProperty('--tilt-x', `${(-y * 4).toFixed(2)}deg`);
      card.style.setProperty('--tilt-y', `${(x * 4).toFixed(2)}deg`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.removeProperty('--tilt-x');
      card.style.removeProperty('--tilt-y');
    });
  });
})();
