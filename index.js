document.addEventListener('DOMContentLoaded', () => {

    initMobileMenu();
    initParticleCanvas();
    initStatsCounters();
    initHeaderScroll();

});

function initMobileMenu() {

    const menuButton = document.getElementById('mobile-menu-btn');
    const navigation = document.getElementById('main-navigation');

    if (!menuButton || !navigation) {
        return;
    }

    menuButton.addEventListener('click', () => {

        const isOpen = menuButton.classList.toggle('active');

        navigation.classList.toggle('active', isOpen);

        menuButton.setAttribute(
            'aria-expanded',
            String(isOpen)
        );

        menuButton.setAttribute(
            'aria-label',
            isOpen ? 'Close navigation menu' : 'Open navigation menu'
        );

    });

    navigation.querySelectorAll('a').forEach((link) => {

        link.addEventListener('click', () => {

            menuButton.classList.remove('active');
            navigation.classList.remove('active');

            menuButton.setAttribute(
                'aria-expanded',
                'false'
            );

            menuButton.setAttribute(
                'aria-label',
                'Open navigation menu'
            );

        });

    });

}

function initParticleCanvas() {

    const canvas = document.getElementById('bg-canvas');

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return;
    }

    const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
    ).matches;

    let particles = [];
    let animationFrameId = null;
    let animationRunning = false;

    function isSmallScreen() {
        return window.innerWidth <= 700;
    }

    function resizeCanvas() {

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        initParticles();

    }

    function initParticles() {

        const particleCount = isSmallScreen()
            ? 0
            : Math.floor(
                (canvas.width * canvas.height) / 25000
            );

        particles = [];

        for (let i = 0; i < particleCount; i++) {

            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                radius: Math.random() * 2.5 + 0.8,
                speedY: -Math.random() * 0.4 - 0.1,
                speedX: (Math.random() - 0.5) * 0.2,
                opacity: Math.random() * 0.5 + 0.15,
                pulseSpeed: Math.random() * 0.02 + 0.005,
                pulseFactor: Math.random() * Math.PI
            });

        }

    }

    function drawParticles() {

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

        particles.forEach((particle) => {

            particle.y += particle.speedY;
            particle.x += particle.speedX;
            particle.pulseFactor += particle.pulseSpeed;

            if (particle.y < -10) {

                particle.y = canvas.height + 10;
                particle.x = Math.random() * canvas.width;

            }

            if (particle.x < -10) {
                particle.x = canvas.width + 10;
            }

            if (particle.x > canvas.width + 10) {
                particle.x = -10;
            }

            const currentOpacity =
                particle.opacity +
                Math.sin(particle.pulseFactor) * 0.15;

            const clampedOpacity =
                Math.max(
                    0.05,
                    Math.min(0.7, currentOpacity)
                );

            ctx.beginPath();

            ctx.arc(
                particle.x,
                particle.y,
                particle.radius,
                0,
                Math.PI * 2
            );

            ctx.fillStyle =
                `rgba(224, 169, 109, ${clampedOpacity})`;

            ctx.shadowColor =
                'rgba(224, 169, 109, 0.3)';

            ctx.shadowBlur = 8;

            ctx.fill();

            ctx.shadowBlur = 0;

        });

    }

    function animateParticles() {

        if (!animationRunning) {
            return;
        }

        drawParticles();

        animationFrameId =
            requestAnimationFrame(animateParticles);

    }

    function stopAnimation() {

        animationRunning = false;

        if (animationFrameId !== null) {

            cancelAnimationFrame(animationFrameId);

            animationFrameId = null;

        }

        ctx.clearRect(
            0,
            0,
            canvas.width,
            canvas.height
        );

    }

    function startAnimation() {

        stopAnimation();

        if (prefersReducedMotion || isSmallScreen()) {
            return;
        }

        animationRunning = true;

        animateParticles();

    }

    let resizeTimeout;

    window.addEventListener('resize', () => {

        clearTimeout(resizeTimeout);

        resizeTimeout = setTimeout(() => {

            resizeCanvas();
            startAnimation();

        }, 150);

    });

    resizeCanvas();
    startAnimation();

}

function initStatsCounters() {

    const statsSection =
        document.querySelector('.stats-section');

    const counters =
        document.querySelectorAll('.counter');

    if (!statsSection || counters.length === 0) {
        return;
    }

    let hasAnimated = false;

    function startCounters() {

        counters.forEach((counter) => {

            const target =
                parseInt(
                    counter.getAttribute('data-target'),
                    10
                );

            if (Number.isNaN(target)) {
                return;
            }

            const duration = 1500;
            const startTime = performance.now();

            function updateCounter(currentTime) {

                const elapsed =
                    currentTime - startTime;

                const progress =
                    Math.min(elapsed / duration, 1);

                const easedProgress =
                    1 - Math.pow(1 - progress, 3);

                const currentValue =
                    Math.floor(
                        target * easedProgress
                    );

                counter.textContent =
                    currentValue.toLocaleString();

                if (progress < 1) {

                    requestAnimationFrame(
                        updateCounter
                    );

                } else {

                    counter.textContent =
                        target.toLocaleString();

                }

            }

            requestAnimationFrame(updateCounter);

        });

    }

    if ('IntersectionObserver' in window) {

        const observer =
            new IntersectionObserver(
                (entries) => {

                    entries.forEach((entry) => {

                        if (
                            entry.isIntersecting &&
                            !hasAnimated
                        ) {

                            hasAnimated = true;

                            startCounters();

                            observer.disconnect();

                        }

                    });

                },
                {
                    threshold: 0.35
                }
            );

        observer.observe(statsSection);

    } else {

        startCounters();

    }

}

function initHeaderScroll() {

    const header =
        document.querySelector('.glass-header');

    if (!header) {
        return;
    }

    function updateHeader() {

        if (window.scrollY > 20) {

            header.style.background =
                'rgba(15, 24, 18, 0.85)';

            header.style.boxShadow =
                '0 10px 30px rgba(0, 0, 0, 0.5)';

        } else {

            header.style.background =
                'rgba(22, 34, 25, 0.65)';

            header.style.boxShadow =
                '0 4px 30px rgba(0, 0, 0, 0.3)';

        }

    }

    window.addEventListener(
        'scroll',
        updateHeader,
        { passive: true }
    );

    updateHeader();

}