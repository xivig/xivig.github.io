/**
 * Xivig Architect Sidebar Module
 * Handles responsive toggling, desktop shrinking, and accordion logic.
 */
export function initSidebar() {
    // 0. DYNAMIC SIDEBAR RENDERING
    const renderSidebar = async () => {
        const menuContainer = document.getElementById('accordion-menu');
        if (!menuContainer) return;

        let config = JSON.parse(localStorage.getItem('xivig_sidebar_config'));
        
        if (!config) {
            try {
                const response = await fetch('/data/sidebar-config.json');
                config = await response.json();
                localStorage.setItem('xivig_sidebar_config', JSON.stringify(config));
            } catch (err) {
                console.warn('⚠️ Dynamic sidebar config not found, falling back to static HTML.');
                return;
            }
        }

        // Clear existing menu
        menuContainer.innerHTML = '';

        const createMenuItem = (item, isSubmenu = false) => {
            const li = document.createElement('li');
            li.className = isSubmenu 
                ? `sidebar__sub-item ${item.hasSubmenu ? 'sidebar__sub-item--has-dropdown' : ''}`
                : `sidebar__item ${item.hasSubmenu ? 'sidebar__item--has-dropdown' : ''}`;
            
            let submenuHtml = '';
            if (item.hasSubmenu && item.submenu) {
                submenuHtml = `
                    <div class="sidebar__submenu-wrapper">
                        <ul class="sidebar__submenu">
                            ${item.submenu.map(sub => createMenuItem(sub, true).outerHTML).join('')}
                        </ul>
                    </div>
                `;
            }

            const linkClass = isSubmenu ? 'sidebar__sub-link' : 'sidebar__link';
            const iconHtml = item.icon ? `<span class="sidebar__icon ${item.icon}"></span>` : '';
            
            li.innerHTML = `
                <a href="${item.hasSubmenu ? 'javascript:;' : item.path}" class="${linkClass}">
                    ${iconHtml}
                    <span class="sidebar__text">${item.label}</span>
                </a>
                ${submenuHtml}
            `;
            return li;
        };

        config.forEach(item => {
            menuContainer.appendChild(createMenuItem(item));
        });

        // Add Logout at the very end
        const logoutLi = document.createElement('li');
        logoutLi.className = 'sidebar__item mt-auto';
        logoutLi.innerHTML = `
            <a href="/pages/auth/login.html" class="sidebar__link sidebar__link--logout text-danger">
                <span class="sidebar__icon bi bi-box-arrow-right"></span>
                <span class="sidebar__text">Logout</span>
            </a>
        `;
        menuContainer.appendChild(logoutLi);
    };

    // 0.1 BRANDING SYNC (Apply settings from admin panel)
    const applyBranding = () => {
        const branding = JSON.parse(localStorage.getItem('xivig_branding'));
        const logo = localStorage.getItem('xivig_logo');

        if (branding) {
            const sidebarTitle = document.querySelector('.sidebar__title');
            if (sidebarTitle) sidebarTitle.innerText = branding.title;
            document.documentElement.style.setProperty('--elite-primary', branding.accent);
        }

        if (logo) {
            const sidebarLogo = document.querySelector('.sidebar__logo');
            if (sidebarLogo) sidebarLogo.src = logo;
        }
    };

    renderSidebar(); // Build the menu
    applyBranding(); // Style it

    // 0.2 LIVE UPDATE LISTENERS
    window.addEventListener('sidebarUpdated', renderSidebar);
    window.addEventListener('brandingUpdated', applyBranding);

    const body = document.body;
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.mobile-menu-overlay');
    const toggleBtn = document.querySelector('.menu-icon'); // The hamburger
    const closeBtn = document.getElementById('sidebar-close');

    // 1. TOGGLE LOGIC
    const updateToggleIcon = () => {
        const icon = toggleBtn?.querySelector('i');
        if (!icon) return;

        if (body.classList.contains('sidebar--collapsed') || sidebar?.classList.contains('open')) {
            icon.classList.replace('bi-list', 'bi-text-indent-left');
        } else {
            icon.classList.replace('bi-text-indent-left', 'bi-list');
        }
    };

    const toggleSidebar = () => {
        if (window.innerWidth < 1200) {
            // Mobile: Slide in/out
            sidebar?.classList.toggle('open');
            overlay?.classList.toggle('show');
            body.style.overflow = sidebar?.classList.contains('open') ? 'hidden' : '';
        } else {
            // Desktop: Shrink the layout
            body.classList.toggle('sidebar--collapsed');
        }
        updateToggleIcon();
    };

    const closeMobileSidebar = () => {
        sidebar?.classList.remove('open');
        overlay?.classList.remove('show');
        body.style.overflow = '';
        updateToggleIcon();
    };

    // 2. EVENT LISTENERS
    toggleBtn?.addEventListener('click', (e) => {
        e.preventDefault();
        toggleSidebar();
    });

    overlay?.addEventListener('click', closeMobileSidebar);
    closeBtn?.addEventListener('click', closeMobileSidebar);

    // 3. RIGHT OFFCANVAS ICON TOGGLE
    const rightOc = document.getElementById('rightSidebar');
    const rightOcBtn = document.querySelector('[data-bs-target="#rightSidebar"]');
    
    if (rightOc && rightOcBtn) {
        const icon = rightOcBtn.querySelector('i');
        rightOc.addEventListener('show.bs.offcanvas', () => {
            icon?.classList.replace('bi-gear', 'bi-x-lg');
        });
        rightOc.addEventListener('hide.bs.offcanvas', () => {
            icon?.classList.replace('bi-x-lg', 'bi-gear');
        });
    }

    // 4. ACCORDION MENU (Efficient Event Delegation)
    const menu = document.getElementById('accordion-menu');

    menu?.addEventListener('click', (e) => {
        const link = e.target.closest('.sidebar__link, .sidebar__sub-link');
        if (!link) return;

        const parentItem = link.parentElement;

        // Only trigger accordion if it has a dropdown
        if (parentItem.classList.contains('sidebar__item--has-dropdown') || parentItem.classList.contains('sidebar__sub-item--has-dropdown')) {
            e.preventDefault();

            // Close other open menus at the same level
            const siblingMenus = parentItem.parentElement.querySelectorAll(':scope > .sidebar__item.show, :scope > .sidebar__sub-item.show');
            siblingMenus.forEach(item => {
                if (item !== parentItem) item.classList.remove('show');
            });

            // Toggle current menu
            parentItem.classList.toggle('show');
        }
    });

    // 5. ACTIVE LINK LOGIC (Auto-highlight current page)
    const currentPath = window.location.pathname;
    const allLinks = document.querySelectorAll('.sidebar__link, .sidebar__sub-link');
    
    allLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (!href || href === 'javascript:;' || href === '#') return;

        // Check if the current path matches the href (handling potential root/index differences)
        const isHomePage = (currentPath === '/' || currentPath === '/index.html') && (href === '/' || href === '/index.html');
        const isMatch = currentPath.includes(href) || isHomePage;

        if (isMatch) {
            // If it's a sub-link, highlight it and open parent
            if (link.classList.contains('sidebar__sub-link')) {
                link.classList.add('active');
                const parentItem = link.closest('.sidebar__item--has-dropdown');
                if (parentItem) {
                    parentItem.classList.add('show', 'active');
                }
            } else {
                // If it's a top-level link
                link.parentElement.classList.add('active');
            }
        }
    });

    // 6. RESIZE HANDLER
    window.addEventListener('resize', () => {
        if (window.innerWidth >= 1200) {
            closeMobileSidebar();
        } else {
            body.classList.remove('sidebar--collapsed');
            updateToggleIcon();
        }
    });
}