// Xivig Landing Page Logic

export function initLandingPage() {
    initScrollProgress();
    initCounterObserver();
    initContactForm();
    initThemeToggle();
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('themeToggleLanding');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const currentTheme = document.body.getAttribute('data-bs-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        document.body.setAttribute('data-bs-theme', newTheme);
        localStorage.setItem('xivig-global-theme', newTheme);
        
        // Update eye icon based on theme
        const icon = toggleBtn.querySelector('i');
        if (icon) {
            icon.className = newTheme === 'dark' ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
        }
        
        console.log(`Landing theme switched to: ${newTheme}`);
    });
    
    // Set initial icon
    const icon = toggleBtn.querySelector('i');
    const initialTheme = document.body.getAttribute('data-bs-theme') || 'dark';
    if (icon) {
        icon.className = initialTheme === 'dark' ? 'bi bi-eye-fill' : 'bi bi-eye-slash-fill';
    }
}

function initScrollProgress() {
    const scrollProgress = document.createElement('div');
    scrollProgress.style.cssText = `
        position:fixed; top:0; left:0; height:3px; 
        background:#6366f1; z-index:2000; 
        width:0%; transition:width 0.1s;
    `;
    document.body.appendChild(scrollProgress);

    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        scrollProgress.style.width = scrolled + "%";

        const nav = document.querySelector('.glass-nav');
        if (nav) {
            nav.style.padding = window.scrollY > 50 ? "8px 0" : "15px 0";
            nav.classList.toggle('shadow-sm', window.scrollY > 50);
        }
    });
}

function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 100;

    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = target % 1 !== 0
                    ? (count + inc).toFixed(1)
                    : Math.ceil(count + inc);
                setTimeout(updateCount, 15);
            } else {
                counter.innerText = target + (target === 99.9 ? '%' : '+');
            }
        };
        updateCount();
    });
}

function initCounterObserver() {
    const statsSection = document.querySelector('#stats');
    if (!statsSection) return;

    const observerOptions = { threshold: 0.5 };
    const statsObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    statsObserver.observe(statsSection);
}

function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        const btn = this.querySelector('button[type="submit"]');
        const successMsg = document.getElementById('formSuccess');

        btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
        btn.disabled = true;

        // Mock send
        setTimeout(() => {
            form.classList.add('d-none');
            successMsg.classList.remove('d-none');
            
            setTimeout(() => {
                // @ts-ignore
                const modal = bootstrap.Modal.getInstance(document.getElementById('contactModal'));
                if (modal) modal.hide();
                
                setTimeout(() => {
                    form.classList.remove('d-none');
                    successMsg.classList.add('d-none');
                    form.reset();
                    btn.innerHTML = '<i class="fa-solid fa-paper-plane me-2"></i> Send Message';
                    btn.disabled = false;
                }, 500);
            }, 2000);
        }, 1500);
    });
}
