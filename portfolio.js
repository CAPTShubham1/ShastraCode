/* ============================================================
   SHASTRACODE — Portfolio v2.0 — Premium JS
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    initCursor();
    initParticles();
    initNavbar();
    initHamburger();
    initReveal();
    initSkillBars();
    initTypewriter();
    initActiveNavLinks();
    initNavHighlight();
    initCounterAnimation();
});

/* ============================================================
   CUSTOM CURSOR
   ============================================================ */
function initCursor() {
    const cursor   = document.getElementById('pfCursor');
    const follower = document.getElementById('pfCursorFollower');
    if (!cursor || !follower) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.left = mouseX + 'px';
        cursor.style.top  = mouseY + 'px';
    });

    // Smooth follower
    (function animateFollower() {
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top  = followerY + 'px';
        requestAnimationFrame(animateFollower);
    })();

    // Hover state on interactive elements
    const hoverTargets = document.querySelectorAll(
        'a, button, .pf-service-card, .pf-project-card, .pf-tech-card, .pf-contact-card, .pf-highlight-item'
    );
    hoverTargets.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('pf-cursor-hover');
            follower.classList.add('pf-cursor-hover');
        });
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('pf-cursor-hover');
            follower.classList.remove('pf-cursor-hover');
        });
    });
}

/* ============================================================
   PARTICLES CANVAS
   ============================================================ */
function initParticles() {
    const canvas = document.getElementById('pfParticles');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H, particles = [];

    const PARTICLE_COUNT = 80;
    const COLORS = ['rgba(0,212,255,0.4)', 'rgba(168,85,247,0.3)', 'rgba(249,115,22,0.25)', 'rgba(34,197,94,0.25)'];

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }
    window.addEventListener('resize', resize, { passive: true });
    resize();

    // Create particles
    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(createParticle());
    }

    function createParticle() {
        return {
            x: Math.random() * W,
            y: Math.random() * H,
            r: Math.random() * 1.5 + 0.3,
            vx: (Math.random() - 0.5) * 0.25,
            vy: (Math.random() - 0.5) * 0.25,
            color: COLORS[Math.floor(Math.random() * COLORS.length)],
            alpha: Math.random() * 0.5 + 0.1,
        };
    }

    let animFrame;
    function draw() {
        ctx.clearRect(0, 0, W, H);

        // Draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 120) {
                    ctx.beginPath();
                    ctx.strokeStyle = `rgba(0,212,255,${0.04 * (1 - dist / 120)})`;
                    ctx.lineWidth = 0.5;
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }

        // Draw particles
        particles.forEach(p => {
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = p.color;
            ctx.fill();

            // Move
            p.x += p.vx;
            p.y += p.vy;

            // Wrap
            if (p.x < -10) p.x = W + 10;
            if (p.x > W + 10) p.x = -10;
            if (p.y < -10) p.y = H + 10;
            if (p.y > H + 10) p.y = -10;
        });

        animFrame = requestAnimationFrame(draw);
    }

    // Only draw when page is visible
    document.addEventListener('visibilitychange', () => {
        if (document.hidden) {
            cancelAnimationFrame(animFrame);
        } else {
            draw();
        }
    });

    draw();
}

/* ============================================================
   NAVBAR — scroll effects
   ============================================================ */
function initNavbar() {
    const nav = document.getElementById('pf-navbar');
    if (!nav) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            nav.classList.add('pf-scrolled');
        } else {
            nav.classList.remove('pf-scrolled');
        }
    }, { passive: true });
}

/* ============================================================
   HAMBURGER
   ============================================================ */
function initHamburger() {
    const btn  = document.getElementById('pfHamburger');
    const nav  = document.getElementById('pfMobileNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('open');
        btn.classList.toggle('active', isOpen);
        btn.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    nav.querySelectorAll('.pf-mob-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('open');
            btn.classList.remove('active');
            btn.setAttribute('aria-expanded', 'false');
            document.body.style.overflow = '';
        });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && !btn.contains(e.target)) {
            nav.classList.remove('open');
            btn.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
}

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */
function initReveal() {
    const els = document.querySelectorAll('.pf-reveal');
    if (!els.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Stagger siblings
                const siblings = Array.from(
                    entry.target.parentElement?.querySelectorAll('.pf-reveal') || []
                );
                const idx = siblings.indexOf(entry.target);
                setTimeout(() => {
                    entry.target.classList.add('pf-visible');
                }, idx * 80);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -50px 0px' });

    els.forEach(el => observer.observe(el));
}

/* ============================================================
   SKILL BAR ANIMATION
   ============================================================ */
function initSkillBars() {
    const fills = document.querySelectorAll('.pf-skill-fill');
    if (!fills.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const targetW = fill.dataset.w || '0%';
                setTimeout(() => {
                    fill.style.width = targetW;
                }, 250);
                observer.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });

    fills.forEach(fill => observer.observe(fill));
}

/* ============================================================
   TYPEWRITER EFFECT
   ============================================================ */
function initTypewriter() {
    const el = document.getElementById('pfTypewriter');
    if (!el) return;

    const words = [
        'modern web apps',
        'Java backends',
        'Python services',
        'React interfaces',
        'SQL databases',
        'future engineers',
    ];

    let wordIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let delay = 120;

    function type() {
        const currentWord = words[wordIdx % words.length];

        if (isDeleting) {
            el.textContent = currentWord.slice(0, charIdx - 1);
            charIdx--;
            delay = 60;
        } else {
            el.textContent = currentWord.slice(0, charIdx + 1);
            charIdx++;
            delay = 100;
        }

        if (!isDeleting && charIdx === currentWord.length) {
            delay = 1800;
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            wordIdx++;
            delay = 300;
        }

        setTimeout(type, delay);
    }

    // Start with slight delay
    setTimeout(type, 600);
}

/* ============================================================
   ACTIVE NAV LINKS (scroll spy)
   ============================================================ */
function initActiveNavLinks() {
    const sections = document.querySelectorAll('section[id], header[id]');
    const navLinks = document.querySelectorAll('.pf-nav-link[data-section]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                navLinks.forEach(link => {
                    link.classList.toggle('active', link.dataset.section === entry.target.id);
                });
            }
        });
    }, { threshold: 0.35 });

    sections.forEach(section => observer.observe(section));
}

/* ============================================================
   SMOOTH NAV HIGHLIGHT (desktop)
   ============================================================ */
function initNavHighlight() {
    // Add magnetic effect to the CTA button
    const cta = document.querySelector('.pf-nav-cta');
    if (!cta) return;

    cta.addEventListener('mousemove', (e) => {
        const rect = cta.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        cta.style.transform = `translateY(-1px) translate(${x * 0.2}px, ${y * 0.2}px)`;
    });
    cta.addEventListener('mouseleave', () => {
        cta.style.transform = '';
    });
}

/* ============================================================
   COUNTER ANIMATION (avatar stats)
   ============================================================ */
function initCounterAnimation() {
    const nums = document.querySelectorAll('.pf-as-num');
    if (!nums.length) return;

    const targets = { '10+': 10, '1K+': 1000, '2+': 2 };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const raw = el.textContent;
                const suffix = raw.includes('K') ? 'K+' : (raw.includes('+') ? '+' : '');
                const end = parseInt(raw);
                if (isNaN(end)) return;

                let start = 0;
                const duration = 1200;
                const startTime = performance.now();

                function update(now) {
                    const elapsed = now - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                    start = Math.floor(eased * end);
                    el.textContent = start + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                }

                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    nums.forEach(el => observer.observe(el));
}

/* ============================================================
   SMOOTH SCROLL for anchor links
   ============================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
        const targetId = anchor.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            const navH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--nav-h')) || 72;
            const top = target.getBoundingClientRect().top + window.scrollY - navH;
            window.scrollTo({ top, behavior: 'smooth' });
        }
    });
});

/* ============================================================
   PARALLAX GLOWS (subtle, performance-safe)
   ============================================================ */
(function initParallax() {
    const glows = document.querySelectorAll('.pf-glow');
    if (!glows.length || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            requestAnimationFrame(() => {
                const scrollY = window.scrollY;
                glows.forEach((glow, i) => {
                    const speed = (i + 1) * 0.06;
                    glow.style.transform = `translateY(${scrollY * speed}px)`;
                });
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
})();
