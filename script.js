// Hamburger Menu Toggle
document.addEventListener('DOMContentLoaded', function () {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const menuOverlay = document.querySelector('.menu-overlay') || createMenuOverlay();

    // Create menu overlay if it doesn't exist
    function createMenuOverlay() {
        const overlay = document.createElement('div');
        overlay.classList.add('menu-overlay');
        document.body.appendChild(overlay);
        return overlay;
    }

    // Toggle menu on hamburger click
    if (navToggle) {
        navToggle.addEventListener('click', function (e) {
            e.stopPropagation();
            navToggle.classList.toggle('active');
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
    }

    // Close menu when clicking on overlay
    if (menuOverlay) {
        menuOverlay.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    }

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function (e) {
        if (!e.target.closest('.nav-menu') && !e.target.closest('.nav-toggle')) {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        }
    });
});

// Form Submission
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            // Get form values
            const name = this.querySelector('input[type="text"]').value;
            const email = this.querySelector('input[type="email"]').value;
            const message = this.querySelector('textarea').value;

            // Validate
            if (!name || !email || !message) {
                alert('Please fill in all fields');
                return;
            }

            // Here you would typically send the form data to a server
            console.log('Form submitted:', { name, email, message });
            alert('Thank you for your message! We will get back to you soon.');

            // Reset form
            this.reset();
        });
    }
});

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            document.querySelector(href).scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll-triggered reveal animations
document.addEventListener('DOMContentLoaded', function () {
    const revealSelectors = [
        '.stat',
        '.service-card',
        '.policy-card',
        '.skill-item',
        '.testimonial-card',
        '.pricing-card',
        '.about-text',
        '.cancel-box'
    ].join(', ');

    const revealEls = document.querySelectorAll(revealSelectors);
    revealEls.forEach(el => el.classList.add('reveal'));

    // Count-up animation for stat numbers (e.g. 500+, 95%, 20+)
    function animateCount(el) {
        const raw = el.textContent.trim();
        const match = raw.match(/\d+/);
        if (!match) return;

        const target = parseInt(match[0], 10);
        const suffix = raw.slice(match.index + match[0].length);
        const prefix = raw.slice(0, match.index);
        const duration = 1400;
        const start = performance.now();

        function tick(now) {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            const current = Math.round(eased * target);
            el.textContent = prefix + current + suffix;
            if (progress < 1) {
                requestAnimationFrame(tick);
            } else {
                el.textContent = prefix + target + suffix;
            }
        }
        requestAnimationFrame(tick);
    }

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('in-view');

                    if (entry.target.classList.contains('stat')) {
                        const numberEl = entry.target.querySelector('.stat-number');
                        if (numberEl && !numberEl.dataset.counted) {
                            numberEl.dataset.counted = 'true';
                            animateCount(numberEl);
                        }
                    }

                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });

        revealEls.forEach(el => observer.observe(el));
    } else {
        // Fallback: no IntersectionObserver support, just show everything
        revealEls.forEach(el => el.classList.add('in-view'));
    }
});