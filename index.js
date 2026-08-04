/**
 * PAG (Perfect Agro Group) - Home Page Interactive Logic
 * File: index.js
 */

document.addEventListener('DOMContentLoaded', () => {
    // -------------------------------------------------------------------
    // 1. Organic Ambient Particle Canvas Effect
    // -------------------------------------------------------------------
    const canvas = document.getElementById('bg-canvas');
    if (canvas) {
        const ctx = canvas.getContext('2d');
        let particles = [];
        let animationFrameId;

        // Dynamically adjust canvas dimensions on window resize
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            initParticles();
        }

        // Initialize bio-spore floating particles with organic properties
        function initParticles() {
            const particleCount = Math.floor((canvas.width * canvas.height) / 25000);
            particles = [];

            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    radius: Math.random() * 2.5 + 0.8,
                    speedY: -Math.random() * 0.4 - 0.1, // Slow upward organic float
                    speedX: (Math.random() - 0.5) * 0.2, // Subtle horizontal sway
                    opacity: Math.random() * 0.5 + 0.15,
                    pulseSpeed: Math.random() * 0.02 + 0.005,
                    pulseFactor: Math.random() * Math.PI
                });
            }
        }

        // Render loop for smooth floating animation
        function animateParticles() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            particles.forEach((p) => {
                // Update positions
                p.y += p.speedY;
                p.x += p.speedX;
                p.pulseFactor += p.pulseSpeed;

                // Reset positions when floating off-screen
                if (p.y < -10) {
                    p.y = canvas.height + 10;
                    p.x = Math.random() * canvas.width;
                }
                if (p.x < -10) p.x = canvas.width + 10;
                if (p.x > canvas.width + 10) p.x = -10;

                // Dynamic opacity pulse
                const currentOpacity = p.opacity + Math.sin(p.pulseFactor) * 0.15;
                const clampedOpacity = Math.max(0.05, Math.min(0.7, currentOpacity));

                // Draw particle node
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(224, 169, 109, ${clampedOpacity})`;
                ctx.shadowColor = 'rgba(224, 169, 109, 0.3)';
                ctx.shadowBlur = 8;
                ctx.fill();
                ctx.shadowBlur = 0; // Reset shadow blur for performance
            });

            animationFrameId = requestAnimationFrame(animateParticles);
        }

        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        animateParticles();
    }

    // -------------------------------------------------------------------
    // 2. IntersectionObserver-Triggered Dynamic Stats Counter
    // -------------------------------------------------------------------
    const statsSection = document.querySelector('.stats-section');
    const counters = document.querySelectorAll('.counter');
    let hasAnimated = false;

    function startCounters() {
        counters.forEach((counter) => {
            const target = parseInt(counter.getAttribute('data-target'), 10);
            const duration = 2000; // Total duration in milliseconds
            const frameRate = 1000 / 60; // 60 FPS
            const totalFrames = Math.round(duration / frameRate);
            let currentFrame = 0;

            // Ease-out exponential timing curve for high-end feel
            const easeOutExpo = (t) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

            const updateCounter = () => {
                currentFrame++;
                const progress = currentFrame / totalFrames;
                const currentCount = Math.floor(target * easeOutExpo(progress));

                if (currentFrame <= totalFrames) {
                    counter.innerText = currentCount.toLocaleString();
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target.toLocaleString();
                }
            };

            requestAnimationFrame(updateCounter);
        });
    }

    if (statsSection && counters.length > 0) {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !hasAnimated) {
                        hasAnimated = true;
                        startCounters();
                    }
                });
            },
            { threshold: 0.35 }
        );

        observer.observe(statsSection);
    }

    // -------------------------------------------------------------------
    // 3. Subtle Header Glassmorphism Scroll Elevation
    // -------------------------------------------------------------------
    const header = document.querySelector('.glass-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                header.style.background = 'rgba(15, 24, 18, 0.85)';
                header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            } else {
                header.style.background = 'rgba(22, 34, 25, 0.65)';
                header.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.3)';
            }
        });
    }
});