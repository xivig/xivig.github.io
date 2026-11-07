/**
 * Landing Page Controller
 * Handles Theme Toggling (Dark/Light mode), Glass Navbar scroll transitions,
 * Telemetry counters, and Contact Sales inquiry modal workflows.
 */
export function initLandingPage() {
    const html = document.documentElement;
    const themeToggle = document.getElementById('themeToggleLanding') || document.querySelector('.theme-toggle-eye');

    const updateToggleUI = (theme) => {
        if (!themeToggle) return;
        const darkIcon = themeToggle.querySelector('.theme-icon-dark');
        const lightIcon = themeToggle.querySelector('.theme-icon-light');

        if (theme === 'dark') {
            darkIcon?.classList.add('d-none');
            lightIcon?.classList.remove('d-none');
            themeToggle.setAttribute('title', 'Switch to Light Mode');
            themeToggle.setAttribute('aria-label', 'Switch to Light Mode');
        } else {
            darkIcon?.classList.remove('d-none');
            lightIcon?.classList.add('d-none');
            themeToggle.setAttribute('title', 'Switch to Dark Mode');
            themeToggle.setAttribute('aria-label', 'Switch to Dark Mode');
        }
    };

    if (themeToggle) {
        // Synchronize with existing theme from html attribute or localStorage
        const activeTheme = html.getAttribute('data-bs-theme') || localStorage.getItem('xivig-global-theme') || 'light';
        html.setAttribute('data-bs-theme', activeTheme);
        updateToggleUI(activeTheme);

        themeToggle.addEventListener('click', (e) => {
            e.preventDefault();
            const currentTheme = html.getAttribute('data-bs-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';

            html.setAttribute('data-bs-theme', nextTheme);
            localStorage.setItem('xivig-global-theme', nextTheme);
            updateToggleUI(nextTheme);
        });

        // Cross-tab synchronization
        window.addEventListener('storage', (e) => {
            if (e.key === 'xivig-global-theme' && e.newValue) {
                html.setAttribute('data-bs-theme', e.newValue);
                updateToggleUI(e.newValue);
            }
        });
    }

    // 2. Sticky Glass Navbar Scroll Transition
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                nav.classList.add('py-2', 'shadow-lg');
            } else {
                nav.classList.remove('py-2', 'shadow-lg');
            }
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        handleScroll();
    }

    // 3. Counter Animation Logic
    const counters = document.querySelectorAll('.counter');
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const counter = entry.target;
                    const target = parseFloat(counter.getAttribute('data-target'));
                    const duration = 1800; // 1.8s duration
                    const stepTime = 20;
                    const steps = duration / stepTime;
                    const increment = target / steps;
                    let current = 0;

                    const timer = setInterval(() => {
                        current += increment;
                        if (current >= target) {
                            counter.innerText = target % 1 === 0 ? target : target.toFixed(1);
                            clearInterval(timer);
                        } else {
                            counter.innerText = target % 1 === 0 ? Math.floor(current) : current.toFixed(1);
                        }
                    }, stepTime);

                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.35 });

        counters.forEach(counter => counterObserver.observe(counter));
    }

    // 4. Contact Modal Form Interactivity
    const contactForm = document.getElementById('contactForm');
    const formSuccess = document.getElementById('formSuccess');
    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            contactForm.classList.add('d-none');
            formSuccess.classList.remove('d-none');

            setTimeout(() => {
                contactForm.reset();
                contactForm.classList.remove('d-none');
                formSuccess.classList.add('d-none');
                if (window.bootstrap) {
                    const modalEl = document.getElementById('contactModal');
                    const modal = window.bootstrap.Modal.getInstance(modalEl);
                    if (modal) modal.hide();
                }
            }, 3000);
        });
    }
}
