/**
 * AJAX-based Icon Filtering for FontAwesome 6
 * High-performance search, style categorization, and instant copy
 */

export const initIconApp = async () => {
    const searchInput = document.getElementById('iconFilterInput') || document.getElementById('faSearchInput');
    const container = document.getElementById('iconContainer');
    const clearBtn = document.getElementById('clearIconSearch');
    const resultsCount = document.getElementById('faResultsCount');
    const styleFilters = document.getElementById('faStyleFilters');

    if (!container) return;

    let allIcons = [];
    let activeStyle = 'all';
    let searchQuery = '';
    let currentLimit = 300;

    // 1. Fetch JSON data with resilient multi-path fallbacks
    try {
        const root = window.XIVIG_ROOT || '';
        const candidatePaths = [
            root ? `${root}data/fa-icons.json` : null,
            '/data/fa-icons.json',
            'data/fa-icons.json',
            './data/fa-icons.json',
            '../../data/fa-icons.json',
            '../data/fa-icons.json',
            '../../../data/fa-icons.json',
            'public/data/fa-icons.json'
        ].filter(Boolean);

        let response = null;
        for (const p of candidatePaths) {
            try {
                const res = await fetch(p);
                if (res.ok) {
                    const ct = res.headers.get('content-type') || '';
                    if (ct.includes('application/json') || ct.includes('text/plain') || !ct) {
                        response = res;
                        break;
                    }
                }
            } catch (err) {}
        }

        if (!response) {
            throw new Error('Unable to resolve fa-icons.json from any known path.');
        }

        const data = await response.json();

        // Flatten data into style variations
        let solidCount = 0;
        let regularCount = 0;
        let brandsCount = 0;

        Object.keys(data).forEach(name => {
            const icon = data[name];
            if (icon.svgs && icon.svgs.classic) {
                Object.keys(icon.svgs.classic).forEach(style => {
                    const prefix = style === 'brands' ? 'fa-brands' : (style === 'solid' ? 'fa-solid' : 'fa-regular');
                    if (style === 'solid') solidCount++;
                    else if (style === 'regular') regularCount++;
                    else if (style === 'brands') brandsCount++;

                    allIcons.push({
                        name,
                        prefix,
                        style,
                        label: icon.label || name,
                        terms: (icon.search && Array.isArray(icon.search.terms)) ? icon.search.terms : []
                    });
                });
            }
        });

        // Update badges
        const bAll = document.getElementById('badgeAll');
        const bSolid = document.getElementById('badgeSolid');
        const bRegular = document.getElementById('badgeRegular');
        const bBrands = document.getElementById('badgeBrands');

        if (bAll) bAll.textContent = allIcons.length.toLocaleString();
        if (bSolid) bSolid.textContent = solidCount.toLocaleString();
        if (bRegular) bRegular.textContent = regularCount.toLocaleString();
        if (bBrands) bBrands.textContent = brandsCount.toLocaleString();

    } catch (err) {
        console.warn('FontAwesome JSON fetch failed, loading curated fallback icons:', err);
        allIcons = getCuratedFallbackIcons();
    }

    // 2. Render & Filter logic
    const getFilteredList = () => {
        return allIcons.filter(icon => {
            const matchesStyle = activeStyle === 'all' || icon.style === activeStyle;
            if (!matchesStyle) return false;
            if (!searchQuery) return true;
            return icon.name.includes(searchQuery) ||
                   icon.label.toLowerCase().includes(searchQuery) ||
                   icon.terms.some(t => t.toLowerCase().includes(searchQuery));
        });
    };

    const render = () => {
        const filtered = getFilteredList();
        const total = filtered.length;
        const displayList = filtered.slice(0, currentLimit);

        if (resultsCount) {
            resultsCount.textContent = total === 0
                ? 'No icons found matching your query.'
                : `Showing ${displayList.length.toLocaleString()} of ${total.toLocaleString()} icons`;
        }

        if (total === 0) {
            container.innerHTML = `
                <div class="col-12 text-center py-5">
                    <div class="mb-3 text-muted">
                        <i class="fa-solid fa-face-meh fs-1"></i>
                    </div>
                    <h5 class="fw-bold">No icons found</h5>
                    <p class="text-muted small">Try searching with a different keyword or switch the style filter.</p>
                </div>`;
            return;
        }

        const cardsHtml = displayList.map(icon => `
            <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 icon-item animate__animated animate__fadeIn" data-name="${icon.name}">
                <div class="fa-hover border rounded-3 p-3 transition-all d-flex align-items-center" role="button" title="Click to copy <i class='${icon.prefix} fa-${icon.name}'></i>">
                    <div class="icon-preview me-3 shadow-sm rounded p-2 text-primary text-center" style="width: 44px; height: 44px; display: flex; align-items: center; justify-content: center;">
                        <i class="${icon.prefix} fa-${icon.name} fs-5"></i>
                    </div>
                    <div class="text-truncate">
                        <div class="icon-class text-dark small fw-bold text-truncate">${icon.name}</div>
                        <span class="text-muted" style="font-size: 0.72rem;">${icon.prefix}</span>
                    </div>
                </div>
            </div>
        `).join('');

        const loadMoreHtml = total > currentLimit ? `
            <div class="col-12 text-center py-4">
                <button type="button" class="btn btn-outline-primary rounded-pill px-4" id="faLoadMoreBtn">
                    Load More (${(total - currentLimit).toLocaleString()} remaining)
                </button>
            </div>
        ` : '';

        container.innerHTML = `
            <div class="row g-3">
                ${cardsHtml}
                ${loadMoreHtml}
            </div>
        `;

        // Attach copy listener
        const items = container.querySelectorAll('.fa-hover');
        items.forEach(card => {
            card.addEventListener('click', () => {
                const iconElement = card.querySelector('.icon-preview i');
                if (!iconElement) return;
                const classStr = iconElement.className;
                const snippet = `<i class="${classStr}"></i>`;
                copyToClipboard(snippet);
                showToast(classStr);
            });
        });

        // Attach load more listener
        const loadMoreBtn = document.getElementById('faLoadMoreBtn');
        if (loadMoreBtn) {
            loadMoreBtn.addEventListener('click', () => {
                currentLimit += 300;
                render();
            });
        }
    };

    // 3. Setup Filter Tabs
    if (styleFilters) {
        styleFilters.addEventListener('click', (e) => {
            const btn = e.target.closest('.fa-filter-btn');
            if (!btn) return;
            styleFilters.querySelectorAll('.fa-filter-btn').forEach(b => {
                b.classList.remove('btn-primary', 'active');
                b.classList.add('btn-outline-secondary');
                const badge = b.querySelector('.badge');
                if (badge) {
                    badge.classList.remove('bg-white', 'text-primary');
                    badge.classList.add('bg-secondary-subtle', 'text-secondary');
                }
            });
            btn.classList.remove('btn-outline-secondary');
            btn.classList.add('btn-primary', 'active');
            const badge = btn.querySelector('.badge');
            if (badge) {
                badge.classList.remove('bg-secondary-subtle', 'text-secondary');
                badge.classList.add('bg-white', 'text-primary');
            }

            activeStyle = btn.dataset.style || 'all';
            currentLimit = 300;
            render();
        });
    }

    // 4. Setup Search
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            searchQuery = e.target.value.toLowerCase().trim();
            if (clearBtn) {
                clearBtn.classList.toggle('d-none', !searchQuery);
            }
            currentLimit = 300;
            render();
        });
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            if (searchInput) {
                searchInput.value = '';
                searchQuery = '';
                clearBtn.classList.add('d-none');
                currentLimit = 300;
                render();
                searchInput.focus();
            }
        });
    }

    // Initial render
    render();
};

async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
    } catch (e) {}

    try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        return true;
    } catch (e) {
        return false;
    }
}

function showToast(classStr) {
    let toast = document.querySelector('.xivig-copy-toast');
    if (toast) toast.remove();

    toast = document.createElement('div');
    toast.className = 'xivig-copy-toast fixed-bottom mb-4 mx-auto bg-dark text-white p-2 px-4 rounded-pill shadow-lg text-center animate__animated animate__fadeInUp';
    toast.style.width = 'fit-content';
    toast.style.zIndex = '9999';
    toast.innerHTML = `<i class="fa-solid fa-circle-check text-success me-2"></i> Copied: <code>&lt;i class="${classStr}"&gt;&lt;/i&gt;</code>`;

    document.body.appendChild(toast);

    setTimeout(() => {
        toast.classList.replace('animate__fadeInUp', 'animate__fadeOutDown');
        setTimeout(() => toast.remove(), 500);
    }, 2200);
}

function getCuratedFallbackIcons() {
    const common = [
        { name: 'house', prefix: 'fa-solid', style: 'solid', label: 'house', terms: ['home'] },
        { name: 'user', prefix: 'fa-solid', style: 'solid', label: 'user', terms: ['person', 'profile'] },
        { name: 'magnifying-glass', prefix: 'fa-solid', style: 'solid', label: 'search', terms: ['find'] },
        { name: 'gear', prefix: 'fa-solid', style: 'solid', label: 'gear', terms: ['settings'] },
        { name: 'bell', prefix: 'fa-solid', style: 'solid', label: 'bell', terms: ['notification'] },
        { name: 'envelope', prefix: 'fa-solid', style: 'solid', label: 'envelope', terms: ['mail', 'email'] },
        { name: 'check', prefix: 'fa-solid', style: 'solid', label: 'check', terms: ['ok'] },
        { name: 'xmark', prefix: 'fa-solid', style: 'solid', label: 'xmark', terms: ['close'] },
        { name: 'trash', prefix: 'fa-solid', style: 'solid', label: 'trash', terms: ['delete'] },
        { name: 'heart', prefix: 'fa-solid', style: 'solid', label: 'heart', terms: ['like'] },
        { name: 'star', prefix: 'fa-solid', style: 'solid', label: 'star', terms: ['rate'] },
        { name: 'calendar', prefix: 'fa-solid', style: 'solid', label: 'calendar', terms: ['date'] },
        { name: 'chart-simple', prefix: 'fa-solid', style: 'solid', label: 'chart', terms: ['analytics'] },
        { name: 'circle-info', prefix: 'fa-solid', style: 'solid', label: 'info', terms: ['help'] },
        { name: 'download', prefix: 'fa-solid', style: 'solid', label: 'download', terms: ['save'] },
        { name: 'upload', prefix: 'fa-solid', style: 'solid', label: 'upload', terms: ['import'] },
        { name: 'pen-to-square', prefix: 'fa-solid', style: 'solid', label: 'edit', terms: ['write'] },
        { name: 'github', prefix: 'fa-brands', style: 'brands', label: 'github', terms: ['code'] },
        { name: 'twitter', prefix: 'fa-brands', style: 'brands', label: 'twitter', terms: ['social'] },
        { name: 'linkedin', prefix: 'fa-brands', style: 'brands', label: 'linkedin', terms: ['career'] },
        { name: 'facebook', prefix: 'fa-brands', style: 'brands', label: 'facebook', terms: ['social'] },
        { name: 'google', prefix: 'fa-brands', style: 'brands', label: 'google', terms: ['search'] }
    ];
    return common;
}
