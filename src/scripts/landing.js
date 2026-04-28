/**
 * Landing page specific logic
 */
export function initLandingPage() {
    const themeToggle = document.getElementById('themeToggleLanding');
    const html = document.documentElement;

    if (themeToggle) {
        // Load initial theme from localStorage
        const savedTheme = localStorage.getItem('xivig-global-theme') || 'dark'; // Default landing to dark as per SCSS
        html.setAttribute('data-bs-theme', savedTheme);

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-bs-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            html.setAttribute('data-bs-theme', newTheme);
            localStorage.setItem('xivig-global-theme', newTheme);
        });
    }

    // Sticky Navbar logic for glass-nav
    const nav = document.querySelector('.glass-nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                nav.classList.add('py-2', 'shadow-lg');
                nav.style.background = 'var(--glass-nav-bg)';
            } else {
                nav.classList.remove('py-2', 'shadow-lg');
            }
        }, { passive: true });
    }
}
