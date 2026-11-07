/**
 * Xivig Atelier Studio (Settings Panel) Module
 * Controls Theme Atmosphere, Signature Accent Hue, Typography Scale,
 * Sidebar Style, and Menu Dropdown Icons.
 */

export function initSettings() {
    const html = document.documentElement;
    const body = document.body;

    // --- Helper: Convert HEX to RGB string ---
    const hexToRgb = (hex) => {
        let c = hex.replace('#', '');
        if (c.length === 3) {
            c = c.split('').map(x => x + x).join('');
        }
        const num = parseInt(c, 16);
        return `${(num >> 16) & 255}, ${(num >> 8) & 255}, ${num & 255}`;
    };

    // --- 1. VISUAL ATMOSPHERE & GLOBAL THEME ---
    const atmosphereTiles = document.querySelectorAll('.atelier-atmosphere-tile');
    const atmosphereLabel = document.getElementById('atelier-atmosphere-label');
    const headerThemeToggle = document.getElementById('header-theme-toggle');
    const themeRadioLight = document.getElementById('theme-light-btn');
    const themeRadioDark = document.getElementById('theme-dark-btn');

    const atmosphereNames = {
        light: 'Porcelain Couture',
        dark: 'Noir Velvet',
        auto: 'Horizon System'
    };

    const updateHeaderThemeIcon = (theme) => {
        if (!headerThemeToggle) return;
        const darkIcon = headerThemeToggle.querySelector('.theme-icon-dark');
        const lightIcon = headerThemeToggle.querySelector('.theme-icon-light');
        if (theme === 'dark') {
            darkIcon?.classList.add('d-none');
            lightIcon?.classList.remove('d-none');
        } else {
            darkIcon?.classList.remove('d-none');
            lightIcon?.classList.add('d-none');
        }
    };

    const applyThemeMode = (mode) => {
        let effectiveTheme = mode;
        if (mode === 'auto') {
            effectiveTheme = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
        }
        html.setAttribute('data-bs-theme', effectiveTheme);
        updateHeaderThemeIcon(effectiveTheme);

        if (effectiveTheme === 'dark') {
            if (themeRadioDark) themeRadioDark.checked = true;
        } else {
            if (themeRadioLight) themeRadioLight.checked = true;
        }
    };

    const setVisualAtmosphere = (mode, save = true) => {
        atmosphereTiles.forEach(tile => {
            const isMatch = tile.getAttribute('data-atmosphere') === mode;
            tile.classList.toggle('active', isMatch);
        });

        if (atmosphereLabel) {
            atmosphereLabel.textContent = atmosphereNames[mode] || 'Porcelain Couture';
        }

        applyThemeMode(mode);

        if (save) {
            localStorage.setItem('xivig-global-theme', mode);
        }
    };

    atmosphereTiles.forEach(tile => {
        tile.addEventListener('click', () => {
            const mode = tile.getAttribute('data-atmosphere') || 'light';
            setVisualAtmosphere(mode);
        });
    });

    const themeRadios = document.querySelectorAll('input[name="global-theme-toggle"]');
    themeRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setVisualAtmosphere(e.target.value);
            }
        });
    });

    // Listen for OS scheme change when in auto mode
    if (window.matchMedia) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
            const currentMode = localStorage.getItem('xivig-global-theme') || 'light';
            if (currentMode === 'auto') {
                applyThemeMode('auto');
            }
        });
    }

    // Header 1-click Quick Toggle
    headerThemeToggle?.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-bs-theme') || 'light';
        const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
        setVisualAtmosphere(nextTheme);
    });

    // --- 2. SIDEBAR STYLE (LIGHT / DARK) ---
    const sidebarRadios = document.querySelectorAll('input[name="sidebar-style-toggle"]');
    const setSidebarStyle = (style, save = true) => {
        body.setAttribute('data-sidebar', style);
        html.setAttribute('data-sidebar', style);
        const radio = document.getElementById(`sidebar-${style}-btn`);
        if (radio) radio.checked = true;
        if (save) {
            localStorage.setItem('xivig-sidebar-style', style);
        }
    };

    sidebarRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                setSidebarStyle(e.target.value);
            }
        });
    });

    // --- 3. MENU DROPDOWN ICON (CHEVRON, PLUS, DOUBLE CHEVRON) ---
    const iconRadios = document.querySelectorAll('input[name="menu-dropdown-icon"]');

    const updateMenuIcons = (selectedId, save = true) => {
        body.setAttribute('data-menu-icon', selectedId);
        html.setAttribute('data-menu-icon', selectedId);

        const sidebarItems = document.querySelectorAll('.sidebar__item--has-dropdown, .sidebar__sub-item--has-dropdown');
        sidebarItems.forEach(item => {
            item.classList.remove('icon-style-1', 'icon-style-2', 'icon-style-3');
            if (selectedId === 'menu-icon-1') item.classList.add('icon-style-1');
            if (selectedId === 'menu-icon-2') item.classList.add('icon-style-2');
            if (selectedId === 'menu-icon-3') item.classList.add('icon-style-3');
        });

        const targetRadio = document.getElementById(selectedId);
        if (targetRadio) targetRadio.checked = true;

        if (save) {
            localStorage.setItem('xivig-menu-icon', selectedId);
        }
    };

    iconRadios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            if (e.target.checked) {
                updateMenuIcons(e.target.value);
            }
        });
    });

    // --- 4. SIGNATURE ACCENT HUE ---
    const swatches = document.querySelectorAll('.atelier-swatch');
    const accentLabel = document.getElementById('atelier-accent-label');

    const setAccentHue = (colorHex, colorName, save = true) => {
        swatches.forEach(swatch => {
            const isMatch = swatch.getAttribute('data-accent')?.toLowerCase() === colorHex.toLowerCase();
            swatch.classList.toggle('active', isMatch);
            let checkIcon = swatch.querySelector('i');
            if (isMatch) {
                if (!checkIcon) {
                    checkIcon = document.createElement('i');
                    checkIcon.className = 'bi bi-check-lg';
                    swatch.appendChild(checkIcon);
                }
            } else if (checkIcon) {
                checkIcon.remove();
            }
        });

        if (accentLabel) {
            accentLabel.textContent = colorName;
        }

        const rgb = hexToRgb(colorHex);
        html.style.setProperty('--xv-brand', colorHex);
        html.style.setProperty('--xv-brand-rgb', rgb);
        html.style.setProperty('--elite-primary', colorHex);
        html.style.setProperty('--elite-primary-rgb', rgb);
        html.style.setProperty('--xivig-primary', colorHex);
        html.style.setProperty('--primary-accent', colorHex);
        html.style.setProperty('--primary-hover', colorHex);
        html.style.setProperty('--bs-primary', colorHex);
        html.style.setProperty('--bs-primary-rgb', rgb);

        if (save) {
            localStorage.setItem('xivig-accent-color', colorHex);
            localStorage.setItem('xivig-accent-name', colorName);
        }
    };

    swatches.forEach(swatch => {
        swatch.addEventListener('click', () => {
            const color = swatch.getAttribute('data-accent');
            const name = swatch.getAttribute('data-name');
            if (color && name) {
                setAccentHue(color, name);
            }
        });
    });

    // --- 5. INTERFACE TYPOGRAPHY SCALE ---
    const typeButtons = document.querySelectorAll('.atelier-type-btn');

    const setTypographyScale = (scalePct, save = true) => {
        typeButtons.forEach(btn => {
            const isMatch = btn.getAttribute('data-scale') === String(scalePct);
            btn.classList.toggle('active', isMatch);
        });

        if (scalePct === '100' || scalePct === 100) {
            html.style.fontSize = '';
        } else {
            html.style.fontSize = `${scalePct}%`;
        }

        if (save) {
            localStorage.setItem('xivig-typography-scale', String(scalePct));
        }
    };

    typeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const scale = btn.getAttribute('data-scale') || '100';
            setTypographyScale(scale);
        });
    });

    // --- 6. RESTORE ATELIER PREFERENCES ---
    const resetBtn = document.getElementById('reset-settings');
    resetBtn?.addEventListener('click', () => {
        localStorage.removeItem('xivig-global-theme');
        localStorage.removeItem('xivig-sidebar-style');
        localStorage.removeItem('xivig-menu-icon');
        localStorage.removeItem('xivig-accent-color');
        localStorage.removeItem('xivig-accent-name');
        localStorage.removeItem('xivig-typography-scale');

        // Restore Defaults
        setVisualAtmosphere('light', false);
        setSidebarStyle('dark', false);
        updateMenuIcons('menu-icon-1', false);
        setAccentHue('#4F6BFF', 'Luminous Indigo', false);
        setTypographyScale('100', false);
    });

    // --- 7. INITIALIZE FROM LOCALSTORAGE ---
    const savedTheme = localStorage.getItem('xivig-global-theme') || 'light';
    setVisualAtmosphere(savedTheme, false);

    const savedSidebar = localStorage.getItem('xivig-sidebar-style') || 'dark';
    setSidebarStyle(savedSidebar, false);

    const savedMenuIcon = localStorage.getItem('xivig-menu-icon') || 'menu-icon-1';
    updateMenuIcons(savedMenuIcon, false);

    const savedAccentColor = localStorage.getItem('xivig-accent-color') || '#4F6BFF';
    const savedAccentName = localStorage.getItem('xivig-accent-name') || 'Luminous Indigo';
    setAccentHue(savedAccentColor, savedAccentName, false);

    const savedScale = localStorage.getItem('xivig-typography-scale') || '100';
    setTypographyScale(savedScale, false);
}
