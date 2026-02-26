/* =========================================
   KOTI RESORTS — JAVASCRIPT
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // =====================
  // 1. LOADER
  // =====================
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('hidden');
      document.body.style.overflow = 'auto';
      initAnimations();
      animateCounters();
    }, 2200);
  });
  document.body.style.overflow = 'hidden';

  // =====================
  // 2. CUSTOM CURSOR
  // =====================
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursor-follower');
  let mouseX = 0, mouseY = 0;
  let followerX = 0, followerY = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
  });

  function animateCursor() {
    followerX += (mouseX - followerX) * 0.12;
    followerY += (mouseY - followerY) * 0.12;
    follower.style.left = followerX + 'px';
    follower.style.top = followerY + 'px';
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  document.querySelectorAll('a, button, .room-card, .vibe-card, .exp-card, .gallery-item').forEach(el => {
    el.addEventListener('mouseenter', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(2.5)';
      cursor.style.background = 'var(--coral)';
      follower.style.width = '60px';
      follower.style.height = '60px';
      follower.style.borderColor = 'var(--coral)';
    });
    el.addEventListener('mouseleave', () => {
      cursor.style.transform = 'translate(-50%,-50%) scale(1)';
      cursor.style.background = 'var(--gold)';
      follower.style.width = '36px';
      follower.style.height = '36px';
      follower.style.borderColor = 'var(--gold)';
    });
  });

  // =====================
  // 3. NAVBAR SCROLL
  // =====================
  const navbar = document.getElementById('navbar');
  const stickyBar = document.getElementById('sticky-bar');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (scrollY > 80) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }

    if (scrollY > 600) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }

    // Parallax hero
    const heroLayer = document.querySelector('.layer-1');
    if (heroLayer) {
      heroLayer.style.transform = `scale(1.05) translateY(${scrollY * 0.3}px)`;
    }

    // Scroll-reveal
    checkReveal();
  });

  // =====================
  // 4. HAMBURGER MENU
  // =====================
  const hamburger = document.getElementById('hamburger');
  const navLinks = document.getElementById('nav-links');

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 6px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -6px)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  // =====================
  // 5. SCROLL REVEAL
  // =====================
  function initAnimations() {
    checkReveal();
  }

  function checkReveal() {
    const elements = document.querySelectorAll('.reveal-up');
    elements.forEach((el, idx) => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      if (rect.top < windowHeight - 80) {
        setTimeout(() => el.classList.add('visible'), (idx % 4) * 100);
      }
    });
  }

  // Initial check
  setTimeout(checkReveal, 100);
  window.addEventListener('scroll', checkReveal);

  // =====================
  // 6. ANIMATED COUNTERS
  // =====================
  function animateCounters() {
    const counters = document.querySelectorAll('[data-count]');
    counters.forEach(counter => {
      const target = parseFloat(counter.getAttribute('data-count'));
      const isDecimal = target % 1 !== 0;
      const duration = 2000;
      const start = performance.now();

      function update(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        const ease = 1 - Math.pow(1 - progress, 3);
        const current = target * ease;

        if (isDecimal) {
          counter.textContent = current.toFixed(1);
        } else {
          counter.textContent = Math.floor(current).toLocaleString();
        }

        if (progress < 1) requestAnimationFrame(update);
        else {
          if (isDecimal) counter.textContent = target.toFixed(1);
          else counter.textContent = target.toLocaleString();
          // Add suffix
          if (counter.nextElementSibling && counter.nextElementSibling.textContent === '★ Rating') {
            // fine
          }
        }
      }
      requestAnimationFrame(update);
    });
  }

  // =====================
  // 7. PARTICLES
  // =====================
  function createParticles() {
    const container = document.getElementById('particles');
    if (!container) return;
    for (let i = 0; i < 30; i++) {
      const p = document.createElement('div');
      p.className = 'particle';
      p.style.cssText = `
        left: ${Math.random() * 100}%;
        animation-duration: ${5 + Math.random() * 10}s;
        animation-delay: ${Math.random() * 8}s;
        width: ${1 + Math.random() * 3}px;
        height: ${1 + Math.random() * 3}px;
        opacity: ${0.2 + Math.random() * 0.5};
      `;
      container.appendChild(p);
    }
  }
  createParticles();

  // =====================
  // 8. SWIPER INIT
  // =====================
  if (typeof Swiper !== 'undefined') {
    new Swiper('.testi-swiper', {
      slidesPerView: 1,
      spaceBetween: 24,
      loop: true,
      autoplay: { delay: 4500, disableOnInteraction: false },
      pagination: {
        el: '.testi-pagination',
        clickable: true,
      },
      navigation: {
        prevEl: '.testi-prev',
        nextEl: '.testi-next',
      },
      breakpoints: {
        640: { slidesPerView: 1 },
        900: { slidesPerView: 2 },
        1200: { slidesPerView: 3 },
      },
    });
  }

  // =====================
  // 9. SMOOTH SCROLL
  // =====================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const href = anchor.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // =====================
  // 10. DEFAULT DATES
  // =====================
  function setDefaultDates() {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const dayAfter = new Date(today);
    dayAfter.setDate(dayAfter.getDate() + 3);

    const fmt = d => d.toISOString().split('T')[0];

    document.querySelectorAll('input[type="date"]').forEach((inp, i) => {
      if (i % 2 === 0) inp.value = fmt(tomorrow);
      else inp.value = fmt(dayAfter);
      inp.min = fmt(today);
    });
  }
  setDefaultDates();

  // =====================
  // 11. ACTIVE NAV LINK
  // =====================
  const sections = document.querySelectorAll('section[id]');
  const navItems = document.querySelectorAll('.nav-links a');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 200;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navItems.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === `#${current}`) {
        link.style.color = 'var(--gold)';
      }
    });
  });

  // =====================
  // 12. MAGNETIC BUTTONS
  // =====================
  document.querySelectorAll('.btn-primary, .nav-cta').forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translateY(-3px) translate(${x * 0.15}px, ${y * 0.15}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  // =====================
  // 13. ROOM CARD TILT
  // =====================
  document.querySelectorAll('.room-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `
        translateY(-8px) 
        perspective(800px) 
        rotateY(${x * 6}deg) 
        rotateX(${-y * 6}deg)
      `;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

  // =====================
  // 14. GALLERY HOVER EFFECT
  // =====================
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(item => {
    item.addEventListener('mouseenter', () => {
      galleryItems.forEach(other => {
        if (other !== item) {
          other.style.filter = 'brightness(0.5)';
          other.style.transform = 'scale(0.97)';
        }
      });
    });
    item.addEventListener('mouseleave', () => {
      galleryItems.forEach(other => {
        other.style.filter = '';
        other.style.transform = '';
      });
    });
  });

  // =====================
  // 15. STAGGERED REVEAL
  // =====================
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const siblings = entry.target.parentElement.querySelectorAll('.reveal-up');
        siblings.forEach((el, i) => {
          setTimeout(() => el.classList.add('visible'), i * 120);
        });
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  document.querySelectorAll('.reveal-up').forEach(el => observer.observe(el));

});

// =====================
// GLOBAL FUNCTIONS
// =====================

// Vibe Selector
function setVibe(el, vibe) {
  document.querySelectorAll('.vibe-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');

  document.querySelectorAll('.vibe-hl-content').forEach(c => c.classList.remove('active'));
  const target = document.querySelector(`.${vibe}-content`);
  if (target) target.classList.add('active');
}

// Lightbox
function openLightbox(el) {
  const bg = el.style.backgroundImage;
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  lightboxImg.style.backgroundImage = bg;
  lightbox.classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}

// Close lightbox on escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeModal();
  }
});

// Booking Form Submit
function submitBooking(e) {
  e.preventDefault();
  const btn = e.target.querySelector('button[type="submit"]');
  btn.innerHTML = '<span>Processing...</span> <i class="fa-solid fa-spinner fa-spin"></i>';
  btn.style.opacity = '0.8';

  setTimeout(() => {
    btn.innerHTML = '<span>Confirm Booking Request</span> <i class="fa-solid fa-arrow-right"></i>';
    btn.style.opacity = '1';
    e.target.reset();
    document.getElementById('success-modal').classList.add('open');
    document.getElementById('modal-backdrop').classList.add('open');

    // Reset dates
    const today = new Date();
    const tomorrow = new Date(today); tomorrow.setDate(today.getDate() + 1);
    const dayAfter = new Date(today); dayAfter.setDate(today.getDate() + 3);
    const fmt = d => d.toISOString().split('T')[0];
    e.target.querySelectorAll('input[type="date"]').forEach((inp, i) => {
      inp.value = i % 2 === 0 ? fmt(tomorrow) : fmt(dayAfter);
    });
  }, 1800);
}

function closeModal() {
  document.getElementById('success-modal').classList.remove('open');
  document.getElementById('modal-backdrop').classList.remove('open');
}

// Sticky bar availability check
function handleBooking() {
  const checkin = document.getElementById('checkin').value;
  const checkout = document.getElementById('checkout').value;
  if (!checkin || !checkout) {
    alert('Please select your check-in and check-out dates.');
    return;
  }
  document.querySelector('#booking').scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// Add some interactive sparkle on hero headline
document.addEventListener('DOMContentLoaded', () => {
  const titleBig = document.querySelector('.title-big');
  if (titleBig) {
    titleBig.addEventListener('mousemove', (e) => {
      const rect = titleBig.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      titleBig.style.background = `radial-gradient(circle at ${x}% ${y}%, #F0C97A, transparent 60%)`;
      titleBig.style.webkitBackgroundClip = 'text';
      titleBig.style.webkitTextFillColor = 'transparent';
      titleBig.style.webkitTextStroke = '0px';
    });
    titleBig.addEventListener('mouseleave', () => {
      titleBig.style.background = '';
      titleBig.style.webkitBackgroundClip = '';
      titleBig.style.webkitTextFillColor = '';
      titleBig.style.webkitTextStroke = '2px var(--ivory)';
    });
  }
});

// Floating label inputs
document.querySelectorAll('.form-group input, .form-group textarea, .form-group select').forEach(input => {
  input.addEventListener('focus', () => {
    input.parentElement.querySelector('label').style.color = 'var(--gold-light)';
  });
  input.addEventListener('blur', () => {
    input.parentElement.querySelector('label').style.color = '';
  });
});

// Newsletter form
document.querySelector('.footer-newsletter button')?.addEventListener('click', () => {
  const input = document.querySelector('.footer-newsletter input');
  if (!input.value || !input.value.includes('@')) {
    input.style.borderColor = 'var(--coral)';
    input.placeholder = 'Please enter a valid email';
    setTimeout(() => {
      input.style.borderColor = '';
      input.placeholder = 'Your email for exclusive offers';
    }, 2000);
    return;
  }
  input.value = '';
  input.placeholder = '✓ You\'re in! Check your inbox.';
  input.style.borderColor = 'var(--sage)';
  setTimeout(() => {
    input.placeholder = 'Your email for exclusive offers';
    input.style.borderColor = '';
  }, 3500);
});

// Add scroll progress indicator
const progressBar = document.createElement('div');
progressBar.style.cssText = `
  position: fixed;
  top: 0; left: 0;
  height: 3px;
  background: linear-gradient(90deg, var(--gold), var(--coral));
  z-index: 99999;
  transition: width 0.1s linear;
  width: 0%;
`;
document.body.appendChild(progressBar);

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});

// Room card entrance animation on scroll
const roomObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, idx) => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }, idx * 150);
      roomObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.room-card').forEach((card, i) => {
  card.style.opacity = '0';
  card.style.transform = 'translateY(40px)';
  card.style.transition = 'opacity 0.7s ease, transform 0.7s ease, box-shadow 0.4s ease';
  roomObserver.observe(card);
});

// Vibe cards stagger
const vibeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const cards = document.querySelectorAll('.vibe-card');
      cards.forEach((card, i) => {
        setTimeout(() => {
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, i * 150);
      });
      vibeObserver.disconnect();
    }
  });
}, { threshold: 0.1 });

const vibeSection = document.querySelector('.vibe-cards');
if (vibeSection) {
  document.querySelectorAll('.vibe-card').forEach(c => {
    c.style.opacity = '0';
    c.style.transform = 'translateY(30px)';
    c.style.transition = 'opacity 0.6s ease, transform 0.6s ease, border-color 0.4s ease, box-shadow 0.4s ease';
  });
  vibeObserver.observe(vibeSection);
}
