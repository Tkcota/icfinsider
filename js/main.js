/* ============================================================
   ICF INSIDER — main.js
   Site-wide JavaScript: nav behavior, scroll effects, forms
   ============================================================ */


/* ------------------------------------------------------------
   1. MOBILE NAV TOGGLE
   Shows/hides the mobile menu when the hamburger is clicked.
   ------------------------------------------------------------ */
(function () {
  const toggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('nav-mobile');

  if (!toggle || !mobileMenu) return; // bail if elements don't exist

  toggle.addEventListener('click', function () {
    const isOpen = mobileMenu.classList.contains('open');

    if (isOpen) {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    } else {
      mobileMenu.classList.add('open');
      toggle.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }
  });

  // Close mobile menu if user clicks a nav link (navigating to a section)
  mobileMenu.querySelectorAll('.nav-link').forEach(function (link) {
    link.addEventListener('click', function () {
      mobileMenu.classList.remove('open');
      toggle.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}());


/* ------------------------------------------------------------
   2. NAV SCROLL EFFECT
   Adds a "scrolled" class to the nav after the user scrolls
   down, which triggers a subtle background blur (see CSS).
   ------------------------------------------------------------ */
(function () {
  const nav = document.getElementById('main-nav');
  if (!nav) return;

  function onScroll() {
    if (window.scrollY > 20) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  }

  // Passive: true tells the browser this listener won't call
  // preventDefault(), so it can scroll without waiting for JS.
  window.addEventListener('scroll', onScroll, { passive: true });
}());


/* ------------------------------------------------------------
   3. EMAIL FORM (homepage)
   POSTs to /api/submit (Cloudflare Pages Function) and shows
   success state on submit. lead_type = 'newsletter' so we can
   distinguish these from contractor/homeowner/manufacturer leads.
   ------------------------------------------------------------ */
(function () {
  const form = document.getElementById('email-form');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const input = form.querySelector('input[type="email"]');
    const email = input ? input.value.trim() : '';
    const btn = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      input.style.borderColor = '#e74c3c';
      input.focus();
      return;
    }

    input.style.borderColor = '';
    btn.textContent = 'Sending...';
    btn.disabled = true;

    // Append lead_type since the homepage form has no hidden field
    const fd = new FormData(form);
    fd.append('lead_type', 'newsletter');

    fetch('/api/submit', {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (response) {
      if (response.ok) {
        btn.textContent = 'Got it!';
        input.value = '';
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
        input.style.borderColor = '#e74c3c';
      }
    })
    .catch(function () {
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
}());


/* ------------------------------------------------------------
   4. GET CONNECTED FORM (state pages + content pages)
   Handles the full lead capture form with optional file upload.
   Submits to /api/submit and shows a success message on completion.
   ------------------------------------------------------------ */
(function () {
  const form = document.getElementById('connect-form');
  if (!form) return;

  const successPanel = document.getElementById('connect-success');

  // Clear error styling when user starts typing
  form.querySelectorAll('input, select, textarea').forEach(function (el) {
    el.addEventListener('input', function () {
      this.style.borderColor = '';
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const nameEl  = form.querySelector('[name="name"]');
    const emailEl = form.querySelector('[name="email"]');
    const phoneEl = form.querySelector('[name="phone"]');
    const btn     = form.querySelector('button[type="submit"]');
    const originalText = btn.textContent;

    // Client-side validation
    let valid = true;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!nameEl.value.trim()) {
      nameEl.style.borderColor = '#e74c3c';
      valid = false;
    }
    if (!emailRegex.test(emailEl.value.trim())) {
      emailEl.style.borderColor = '#e74c3c';
      valid = false;
    }
    if (!phoneEl.value.trim()) {
      phoneEl.style.borderColor = '#e74c3c';
      valid = false;
    }
    if (!valid) return;

    btn.textContent = 'Sending...';
    btn.disabled = true;

    const fd = new FormData(form);

    fetch('/api/submit', {
      method: 'POST',
      body: fd,
      headers: { 'Accept': 'application/json' }
    })
    .then(function (res) { return res.json(); })
    .then(function (data) {
      if (data.ok) {
        // Hide form, show success message
        form.style.display = 'none';
        if (successPanel) successPanel.style.display = 'block';
      } else {
        btn.textContent = originalText;
        btn.disabled = false;
        alert(data.error || 'Something went wrong. Please try again.');
      }
    })
    .catch(function () {
      btn.textContent = originalText;
      btn.disabled = false;
    });
  });
}());


/* ------------------------------------------------------------
   5. SMOOTH SCROLL FOR ANCHOR LINKS
   When you click a link like <a href="#about">, the page
   scrolls smoothly to that section instead of jumping.
   (CSS scroll-behavior: smooth handles most cases, but this
   accounts for the fixed nav height offset.)
   ------------------------------------------------------------ */
(function () {
  const NAV_HEIGHT = 72; // keep in sync with --nav-height in CSS

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href').slice(1); // remove the #
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();

      const top = target.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });
}());
