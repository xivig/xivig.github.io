/**
 * Xivig Architect Sidebar Module
 * Handles responsive toggling, desktop shrinking, and accordion logic.
 */
export function initSidebar() {
    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const toggleBtn = document.querySelector('.menu-icon'); // The hamburger
    const closeBtn = document.getElementById('sidebar-close');

    // 1. TOGGLE LOGIC
    const toggleSidebar = () => {
        if (window.innerWidth < 1200) {
            // Mobile: Slide in/out
            sidebar ?.classList.toggle('open');
            overlay ?.classList.toggle('show');
            body.style.overflow = sidebar ?.classList.contains('open') ? 'hidden' : '';
        } else {
            // Desktop: Shrink the layout
            body.classList.toggle('sidebar--collapsed');
        }
    };

    const closeMobileSidebar = () => {
        sidebar ?.classList.remove('open');
        overlay ?.classList.remove('show');
        body.style.overflow = '';
    };

    // 2. EVENT LISTENERS
    toggleBtn ?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSidebar();
    });

    overlay ?.addEventListener('click', closeMobileSidebar);
    closeBtn ?.addEventListener('click', closeMobileSidebar);

    // 3. ACCORDION MENU (Efficient Event Delegation)
    const menu = document.getElementById('accordion-menu');

    menu ?.addEventListener('click', (e) => {
        const link = e.target.closest('.sidebar__link');
        if (!link) return;

        const parentItem = link.parentElement;

        // Only trigger accordion if it has a dropdown
        if (parentItem.classList.contains('sidebar__item--has-dropdown')) {
            e.preventDefault();

            // Close other open menus at the same level (Optional Architect Feel)
            const siblingMenus = parentItem.parentElement.querySelectorAll('.sidebar__item.show');
            siblingMenus.forEach(item => {
                if (item !== parentItem) item.classList.remove('show');
            });

            // Toggle current menu
            parentItem.classList.toggle('show');
        }
    });

    // 4. RESIZE HANDLER
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            closeMobileSidebar();
        } else {
            body.classList.remove('sidebar--collapsed');
        }
    });
}