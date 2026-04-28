export function initSettings() {
    const body = document.body;

    // --- 1. THEME TOGGLING (SIDEBAR & HEADER) ---
    const sidebarRadios = document.querySelectorAll('input[name="sidebar-bg"]');
    const headerRadios = document.querySelectorAll('input[name="header-bg"]');

    const setSidebarStyle = (style) => {
        body.setAttribute('data-sidebar', style);
        localStorage.setItem('xivig-sidebar-style', style);
    };

    const setGlobalTheme = (theme) => {
        body.setAttribute('data-bs-theme', theme);
        localStorage.setItem('xivig-global-theme', theme);
    };

    sidebarRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setSidebarStyle(e.target.id === 'sidebar-dark' ? 'dark' : 'light');
        });
    });

    headerRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            setGlobalTheme(e.target.id === 'header-dark' ? 'dark' : 'light');
        });
    });


    // --- 2. DROPDOWN ICON CHANGER ---
    const iconRadios = document.querySelectorAll('input[name="menu-icon"]');

    const updateMenuIcons = (selectedId) => {
        const sidebarItems = document.querySelectorAll('.sidebar__item--has-dropdown');
        sidebarItems.forEach(item => {
            item.classList.remove('icon-style-1', 'icon-style-2', 'icon-style-3');
            if (selectedId === 'menu-icon-1') item.classList.add('icon-style-1');
            if (selectedId === 'menu-icon-2') item.classList.add('icon-style-2');
            if (selectedId === 'menu-icon-3') item.classList.add('icon-style-3');
        });
    };

    iconRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            updateMenuIcons(e.target.id);
            localStorage.setItem('xivig-menu-icon', e.target.id);
        });
    });


    // --- 3. RESET FUNCTIONALITY ---
    const resetBtn = document.getElementById('reset-settings');
    resetBtn?.addEventListener('click', () => {
        localStorage.removeItem('xivig-sidebar-style');
        localStorage.removeItem('xivig-global-theme');
        localStorage.removeItem('xivig-menu-icon');
        
        // Revert to defaults
        setSidebarStyle('dark');
        setGlobalTheme('light');
        updateMenuIcons('menu-icon-1');

        // Update Radio Buttons
        const sidebarDark = document.getElementById('sidebar-dark');
        if (sidebarDark) sidebarDark.checked = true;
        
        const headerWhite = document.getElementById('header-white');
        if (headerWhite) headerWhite.checked = true;
        
        const iconDefault = document.getElementById('menu-icon-1');
        if (iconDefault) iconDefault.checked = true;

        // Force a brief delay then reload or just stay on page with updated state
        window.location.reload();
    });


    // --- 4. PERSISTENCE (LOAD ON START) ---

    // Load Sidebar Style
    const savedSidebar = localStorage.getItem('xivig-sidebar-style');
    if (savedSidebar) {
        body.setAttribute('data-sidebar', savedSidebar);
        const radio = document.getElementById(`sidebar-${savedSidebar}`);
        if (radio) radio.checked = true;
    }

    // Load Global Theme
    const savedTheme = localStorage.getItem('xivig-global-theme');
    if (savedTheme) {
        body.setAttribute('data-bs-theme', savedTheme);
        const radio = document.getElementById(`header-${savedTheme === 'dark' ? 'dark' : 'white'}`);
        if (radio) radio.checked = true;
    }

    // Load Icons
    const savedIcon = localStorage.getItem('xivig-menu-icon');
    if (savedIcon) {
        updateMenuIcons(savedIcon);
        const radio = document.getElementById(savedIcon);
        if (radio) radio.checked = true;
    }
}