/* =====================================================
   PUSHP INFRA TECH SERVICES — MAIN JAVASCRIPT
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  /* --------------------------------------------------
     1. NAVBAR SCROLL EFFECT
  -------------------------------------------------- */
  const navbar = document.getElementById('navbar');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  /* --------------------------------------------------
     2. MOBILE HAMBURGER MENU
  -------------------------------------------------- */
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const isOpen = navLinks.classList.contains('open');
    hamburger.setAttribute('aria-expanded', isOpen);
    // Animate hamburger lines
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* --------------------------------------------------
     3. SMOOTH ACTIVE NAV HIGHLIGHT
  -------------------------------------------------- */
  const sections = document.querySelectorAll('section[id]');

  const highlightNav = () => {
    const scrollY = window.scrollY;
    sections.forEach(section => {
      const top    = section.offsetTop - 100;
      const bottom = top + section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (link) {
        if (scrollY >= top && scrollY < bottom) {
          document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNav, { passive: true });

  /* --------------------------------------------------
     4. SCROLL REVEAL ANIMATION
  -------------------------------------------------- */
  // Add reveal class to animatable elements
  const revealTargets = [
    '.service-card',
    '.pillar',
    '.re-card',
    '.tech-img',
    '.float-card',
    '.stat',
    '.maint-feat',
    '.rest-feat',
    '.events-list li',
    '.vendor-pillars .pillar',
    '.contact-form-area',
  ];

  revealTargets.forEach(selector => {
    document.querySelectorAll(selector).forEach((el, i) => {
      el.classList.add('reveal');
      el.style.transitionDelay = `${i * 80}ms`;
    });
  });

  // Also add reveal to major section elements
  document.querySelectorAll('.split-text, .split-image, .tech-text, .vendor-content h2, .vendor-content > p, .maint-content, .events-card, .events-visual, .re-content h2, .re-content > p, .rest-card, .contact-text').forEach(el => {
    el.classList.add('reveal');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // only once
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -60px 0px'
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* --------------------------------------------------
     5. CONTACT FORM SUBMISSION
  -------------------------------------------------- */
  const contactForm   = document.getElementById('contactForm');
  const formSuccess   = document.getElementById('formSuccess');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      btn.textContent = 'Sending...';
      btn.disabled = true;

      // Simulate async submission
      setTimeout(() => {
        btn.textContent = 'Send Message';
        btn.disabled = false;
        formSuccess.style.display = 'block';
        contactForm.reset();
        // Hide success after 5s
        setTimeout(() => { formSuccess.style.display = 'none'; }, 5000);
      }, 1200);
    });
  }

  /* --------------------------------------------------
     6. COUNTER ANIMATION FOR STATS
  -------------------------------------------------- */
  const statNums = document.querySelectorAll('.stat-num');

  const animateCounter = (el) => {
    const text   = el.textContent;
    const num    = parseInt(text.replace(/\D/g, ''));
    const suffix = text.replace(/\d/g, '').trim();
    const duration = 1800;
    const steps    = 60;
    const increment = num / steps;
    let current = 0;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      current += increment;
      if (step >= steps) {
        clearInterval(timer);
        el.textContent = num + suffix;
      } else {
        el.textContent = Math.floor(current) + suffix;
      }
    }, duration / steps);
  };

  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  statNums.forEach(el => statsObserver.observe(el));

  /* --------------------------------------------------
     7. SERVICE CARD HOVER SOUND (subtle visual feedback)
  -------------------------------------------------- */
  document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.borderColor = 'rgba(46,125,50,0.3)';
    });
    card.addEventListener('mouseleave', () => {
      card.style.borderColor = 'transparent';
    });
  });

  /* --------------------------------------------------
     8. HERO: STAGGER FLOAT CARDS ON LOAD
  -------------------------------------------------- */
  document.querySelectorAll('.float-card').forEach((card, i) => {
    card.style.opacity = '0';
    card.style.transform = 'scale(0.8)';
    setTimeout(() => {
      card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'scale(1)';
    }, 600 + i * 120);
  });

  /* --------------------------------------------------
     9. NAV LINK ACTIVE STYLE (CSS injection)
  -------------------------------------------------- */
  const style = document.createElement('style');
  style.textContent = `
    .nav-links a.active { color: var(--green) !important; }
    .nav-links a.active::after { transform: scaleX(1) !important; }
  `;
  document.head.appendChild(style);

  /* --------------------------------------------------
     10. SMOOTH SCROLL POLYFILL (for older browsers)
  -------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  console.log('✅ Pushp Infra Tech Services website loaded successfully.');
});
