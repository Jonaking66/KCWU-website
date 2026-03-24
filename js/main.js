/* =============================================
   KCWU — main.js (Upgraded)
   ============================================= */

document.addEventListener("DOMContentLoaded", () => {

  // ── YEAR ──────────────────────────────────────
  document.querySelectorAll('[id^="year"]').forEach(el => {
    el.textContent = new Date().getFullYear();
  });

  // ── ACTIVE NAV LINK ───────────────────────────
  const currentPage = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-list a').forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // ── NAV TOGGLE (mobile) ───────────────────────
  const navToggle = document.getElementById("navToggle");
  const nav       = document.getElementById("mainNav");
  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      nav.classList.toggle("open");
    });
    // Close nav when a link is clicked on mobile
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => nav.classList.remove('open'));
    });
  }

  // ── HEADER SCROLL CLASS ───────────────────────
  const header = document.querySelector('.site-header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    }, { passive: true });
  }

  // ── HERO SLIDER ───────────────────────────────
  const slides    = document.querySelectorAll('.slide');
  const nextBtn   = document.querySelector('.next');
  const prevBtn   = document.querySelector('.prev');
  const dots      = document.querySelectorAll('.dot');

  if (slides.length && nextBtn && prevBtn) {
    let current     = 0;
    const total     = slides.length;
    let autoTimer   = null;

    function showSlide(index) {
      slides.forEach((s, i) => s.classList.toggle('active', i === index));
      dots.forEach((d, i)  => d.classList.toggle('active-dot', i === index));
    }

    function advance() {
      current = (current + 1) % total;
      showSlide(current);
    }

    function startAuto() {
      stopAuto();
      autoTimer = setInterval(advance, 5000);
    }

    function stopAuto() {
      if (autoTimer) clearInterval(autoTimer);
    }

    nextBtn.addEventListener('click', () => { advance(); startAuto(); });
    prevBtn.addEventListener('click', () => {
      current = (current - 1 + total) % total;
      showSlide(current);
      startAuto();
    });

    dots.forEach(dot => {
      dot.addEventListener('click', () => {
        current = parseInt(dot.dataset.slide);
        showSlide(current);
        startAuto();
      });
    });

    startAuto();
  }

  // ── SCROLL REVEAL ─────────────────────────────
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // fire once
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(el => {
    revealObserver.observe(el);
  });

  // ── STAT COUNTER ANIMATION ────────────────────
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const el     = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        const duration = 1600;
        const start  = performance.now();

        function tick(now) {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          // ease-out cubic
          const eased = 1 - Math.pow(1 - progress, 3);
          el.textContent = Math.round(eased * target) + suffix;
          if (progress < 1) requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-number[data-target]').forEach(el => {
    counterObserver.observe(el);
  });

  // ── CONTACT FORM ──────────────────────────────
  const form = document.getElementById("contactForm");
  if (form) {
    const status = form.querySelector(".form-status");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (status) {
        status.textContent = "Message sent successfully!";
        status.style.color = "#1167b1";
      }
      form.reset();
      setTimeout(() => {
        if (status) status.textContent = "";
      }, 4000);
    });
  }

});
