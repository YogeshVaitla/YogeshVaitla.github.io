/* ============================
   PORTFOLIO — Enhanced Interactive Effects
   ============================ */

document.addEventListener('DOMContentLoaded', () => {

    // ========== FOOTER YEAR ==========
    const footerYear = document.getElementById('footerYear');
    if (footerYear) footerYear.textContent = new Date().getFullYear();

    // ========== PRELOADER ==========
    const preloader = document.getElementById('preloader');
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 800);
    });
    // Fallback if load already fired
    if (document.readyState === 'complete') {
        setTimeout(() => preloader.classList.add('hidden'), 800);
    }

    // ========== DETECT TOUCH DEVICE ==========
    const isTouchDevice = window.matchMedia('(hover: none) and (pointer: coarse)').matches;

    // ========== CUSTOM CURSOR (Desktop Only) ==========
    if (!isTouchDevice) {
        const cursorDot = document.getElementById('cursor-dot');
        const cursorOutline = document.getElementById('cursor-outline');
        let cursorX = 0, cursorY = 0;
        let outlineX = 0, outlineY = 0;

        document.addEventListener('mousemove', (e) => {
            cursorX = e.clientX;
            cursorY = e.clientY;
            cursorDot.style.left = cursorX - 3 + 'px';
            cursorDot.style.top = cursorY - 3 + 'px';
        });

        function animateCursor() {
            outlineX += (cursorX - outlineX) * 0.12;
            outlineY += (cursorY - outlineY) * 0.12;
            cursorOutline.style.left = outlineX + 'px';
            cursorOutline.style.top = outlineY + 'px';
            requestAnimationFrame(animateCursor);
        }
        animateCursor();

        // Hover effect
        const interactiveElements = document.querySelectorAll('a, button, .competency-card, .contact-card, .btn, .edu-card, .tag, .highlight-pill, .orbit-item');
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => cursorOutline.classList.add('hovering'));
            el.addEventListener('mouseleave', () => cursorOutline.classList.remove('hovering'));
        });

        // ========== MOUSE GLOW ==========
        const mouseGlow = document.getElementById('mouseGlow');
        document.addEventListener('mousemove', (e) => {
            mouseGlow.style.left = e.clientX + 'px';
            mouseGlow.style.top = e.clientY + 'px';
        });

        // ========== CARD GLOW FOLLOW ==========
        document.querySelectorAll('.competency-card, .contact-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width) * 100;
                const y = ((e.clientY - rect.top) / rect.height) * 100;
                card.style.setProperty('--mouse-x', x + '%');
                card.style.setProperty('--mouse-y', y + '%');
            });
        });
    } // end desktop-only block

    // ========== TYPING EFFECT ==========
    const typedTextEl = document.getElementById('typedText');
    const phrases = [
        'Quality Engineering & DevOps Professional',
        'CI/CD Pipeline Builder',
        'Observability & Monitoring Expert',
        'Manual Testing Specialist',
        'Grafana Dashboard Designer',
        'Release Reliability Engineer'
    ];
    let phraseIndex = 0, charIndex = 0, isDeleting = false;

    function typeEffect() {
        const phrase = phrases[phraseIndex];
        let speed;

        if (isDeleting) {
            typedTextEl.textContent = phrase.substring(0, charIndex - 1);
            charIndex--;
            speed = 25;
        } else {
            typedTextEl.textContent = phrase.substring(0, charIndex + 1);
            charIndex++;
            speed = 50;
        }

        if (!isDeleting && charIndex === phrase.length) {
            speed = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            speed = 500;
        }

        setTimeout(typeEffect, speed);
    }
    setTimeout(typeEffect, 1500);

    // ========== NAVBAR ==========
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    // Hamburger
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');
    hamburger.addEventListener('click', () => {
        const isActive = hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        hamburger.setAttribute('aria-expanded', String(isActive));
    });
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
            hamburger.setAttribute('aria-expanded', 'false');
        });
    });

    // Active nav
    const sections = document.querySelectorAll('section[id]');
    const navLinkEls = document.querySelectorAll('.nav-link:not(.nav-link--cta)');
    function highlightNav() {
        const scrollPos = window.scrollY + 160;
        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');
            if (scrollPos >= top && scrollPos < top + height) {
                navLinkEls.forEach(link => {
                    link.classList.toggle('active', link.getAttribute('href') === '#' + id);
                });
            }
        });
    }
    window.addEventListener('scroll', highlightNav);

    // ========== SCROLL REVEAL ==========
    const revealEls = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right, .reveal-timeline');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => revealObserver.observe(el));

    // ========== ANIMATED SKILL BARS ==========
    const skillFills = document.querySelectorAll('.skill-fill');
    const skillObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fill = entry.target;
                const width = fill.getAttribute('data-width');
                fill.style.setProperty('--skill-width', width);
                fill.classList.add('animate');
                skillObserver.unobserve(fill);
            }
        });
    }, { threshold: 0.3 });
    skillFills.forEach(bar => skillObserver.observe(bar));

    // ========== HERO STAT COUNTERS ==========
    const statNumbers = document.querySelectorAll('.stat-number');
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-target'));
                animateCount(el, 0, target, 1800);
                statObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    statNumbers.forEach(el => statObserver.observe(el));

    function animateCount(el, start, end, duration) {
        const startTime = performance.now();
        function update(now) {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            el.textContent = Math.round(start + (end - start) * eased);
            if (progress < 1) requestAnimationFrame(update);
        }
        requestAnimationFrame(update);
    }

    // Stat bar fill animation
    const statBarFills = document.querySelectorAll('.stat-bar-fill');
    const statBarObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                statBarObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    statBarFills.forEach(el => statBarObserver.observe(el));

    // ========== TIMELINE PROGRESS BAR ==========
    const timelineProgress = document.getElementById('timelineProgress');
    const timeline = document.querySelector('.timeline');

    function updateTimelineProgress() {
        if (!timeline || !timelineProgress) return;
        const rect = timeline.getBoundingClientRect();
        const windowHeight = window.innerHeight;
        const timelineTop = rect.top;
        const timelineHeight = rect.height;

        if (timelineTop < windowHeight && rect.bottom > 0) {
            const progress = Math.min(Math.max((windowHeight - timelineTop) / (timelineHeight + windowHeight * 0.5), 0), 1);
            timelineProgress.style.height = (progress * 100) + '%';
        }
    }
    window.addEventListener('scroll', updateTimelineProgress);
    updateTimelineProgress();

    // ========== PARTICLE CANVAS ==========
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    let animationId;
    let mouseParticle = { x: -1000, y: -1000 };

    function resizeCanvas() {
        const section = canvas.closest('.hero');
        canvas.width = section.offsetWidth;
        canvas.height = section.offsetHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Track mouse for particle interaction
    canvas.closest('.hero').addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseParticle.x = e.clientX - rect.left;
        mouseParticle.y = e.clientY - rect.top;
    });

    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.baseSize = Math.random() * 1.8 + 0.4;
            this.size = this.baseSize;
            this.vx = (Math.random() - 0.5) * 0.35;
            this.vy = (Math.random() - 0.5) * 0.35;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.hue = Math.random() > 0.7 ? 270 : 188; // Purple or cyan
        }

        update() {
            this.x += this.vx;
            this.y += this.vy;

            // Mouse repulsion
            const dx = this.x - mouseParticle.x;
            const dy = this.y - mouseParticle.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 120) {
                const force = (120 - dist) / 120;
                this.x += (dx / dist) * force * 2;
                this.y += (dy / dist) * force * 2;
                this.size = this.baseSize + force * 2;
            } else {
                this.size += (this.baseSize - this.size) * 0.05;
            }

            // Wrap
            if (this.x < 0) this.x = canvas.width;
            if (this.x > canvas.width) this.x = 0;
            if (this.y < 0) this.y = canvas.height;
            if (this.y > canvas.height) this.y = 0;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            if (this.hue === 270) {
                ctx.fillStyle = `rgba(168, 85, 247, ${this.opacity})`;
            } else {
                ctx.fillStyle = `rgba(0, 229, 255, ${this.opacity})`;
            }
            ctx.fill();
        }
    }

    const particleCount = Math.min(90, Math.floor((canvas.width * canvas.height) / 10000));
    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function drawConnections() {
        const maxDist = 130;
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < maxDist) {
                    const alpha = (1 - dist / maxDist) * 0.12;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }

            // Connect to mouse
            const mDx = particles[i].x - mouseParticle.x;
            const mDy = particles[i].y - mouseParticle.y;
            const mDist = Math.sqrt(mDx * mDx + mDy * mDy);
            if (mDist < 150) {
                const alpha = (1 - mDist / 150) * 0.2;
                ctx.beginPath();
                ctx.moveTo(particles[i].x, particles[i].y);
                ctx.lineTo(mouseParticle.x, mouseParticle.y);
                ctx.strokeStyle = `rgba(168, 85, 247, ${alpha})`;
                ctx.lineWidth = 0.8;
                ctx.stroke();
            }
        }
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => { p.update(); p.draw(); });
        drawConnections();
        animationId = requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Pause when off-screen
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (!animationId) animateParticles();
            } else {
                if (animationId) { cancelAnimationFrame(animationId); animationId = null; }
            }
        });
    }, { threshold: 0.05 });
    heroObserver.observe(document.getElementById('hero'));

    // ========== SMOOTH SCROLL ==========
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({ top: target.offsetTop - 70, behavior: 'smooth' });
            }
        });
    });

    // ========== MAGNETIC BUTTONS (Desktop Only) ==========
    if (!isTouchDevice) {
        document.querySelectorAll('.magnetic-btn').forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left - rect.width / 2;
                const y = e.clientY - rect.top - rect.height / 2;
                btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = '';
            });
        });

        // ========== TILT EFFECT ON COMPETENCY CARDS ==========
        document.querySelectorAll('.competency-card').forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width;
                const y = (e.clientY - rect.top) / rect.height;
                const rotateX = (y - 0.5) * -8;
                const rotateY = (x - 0.5) * 8;
                card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = '';
            });
        });
    }

    // ========== BACK TO TOP + SCROLL PROGRESS ==========
    const backToTopBtn = document.getElementById('backToTop');
    const progressRingFill = document.getElementById('progressRingFill');
    const circumference = 2 * Math.PI * 20; // r=20

    function updateScrollProgress() {
        const scrollTop = window.scrollY;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = Math.min(scrollTop / docHeight, 1);
        const offset = circumference - progress * circumference;
        progressRingFill.style.strokeDashoffset = offset;

        // Show/hide button
        backToTopBtn.classList.toggle('visible', scrollTop > 400);
    }
    window.addEventListener('scroll', updateScrollProgress);

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ========== CONFETTI EASTER EGG ==========
    const confettiCanvas = document.getElementById('confettiCanvas');
    const confettiCtx = confettiCanvas.getContext('2d');
    let confettiParticles = [];
    let confettiRunning = false;

    function resizeConfetti() {
        confettiCanvas.width = window.innerWidth;
        confettiCanvas.height = window.innerHeight;
    }
    resizeConfetti();
    window.addEventListener('resize', resizeConfetti);

    class ConfettiPiece {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 8 + 4;
            this.vx = (Math.random() - 0.5) * 16;
            this.vy = Math.random() * -18 - 6;
            this.gravity = 0.45;
            this.rotation = Math.random() * 360;
            this.rotationSpeed = (Math.random() - 0.5) * 12;
            this.opacity = 1;
            this.decay = Math.random() * 0.008 + 0.006;
            const colors = ['#00e5ff', '#a855f7', '#22d3ee', '#f97316', '#ef4444', '#22c55e', '#eab308', '#ec4899'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.shape = Math.random() > 0.5 ? 'rect' : 'circle';
        }

        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;
            this.vx *= 0.98;
            this.rotation += this.rotationSpeed;
            this.opacity -= this.decay;
        }

        draw(ctx) {
            if (this.opacity <= 0) return;
            ctx.save();
            ctx.translate(this.x, this.y);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            if (this.shape === 'rect') {
                ctx.fillRect(-this.size / 2, -this.size / 4, this.size, this.size / 2);
            } else {
                ctx.beginPath();
                ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
                ctx.fill();
            }
            ctx.restore();
        }
    }

    function launchConfetti(originX, originY) {
        for (let i = 0; i < 150; i++) {
            confettiParticles.push(new ConfettiPiece(originX, originY));
        }
        if (!confettiRunning) {
            confettiRunning = true;
            animateConfetti();
        }
    }

    function animateConfetti() {
        confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        confettiParticles.forEach(p => { p.update(); p.draw(confettiCtx); });
        confettiParticles = confettiParticles.filter(p => p.opacity > 0 && p.y < confettiCanvas.height + 50);

        if (confettiParticles.length > 0) {
            requestAnimationFrame(animateConfetti);
        } else {
            confettiRunning = false;
            confettiCtx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
        }
    }

    // Attach confetti to the primary CTA button
    const heroCTA = document.querySelector('.btn-primary');
    if (heroCTA) {
        heroCTA.addEventListener('click', (e) => {
            const rect = heroCTA.getBoundingClientRect();
            launchConfetti(rect.left + rect.width / 2, rect.top + rect.height / 2);
        });
    }

    // ========== PARALLAX FLOATING SHAPES ==========
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY;
        document.querySelectorAll('.shape').forEach((shape, i) => {
            const speed = 0.02 + i * 0.01;
            shape.style.transform = `translateY(${scrollY * speed}px)`;
        });
    });

});
