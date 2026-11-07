import NotificationService from '../components/sweet-alert.js';

/**
 * Help & Support Module - Elite Interactive Experience
 * Real-time keystroke FAQ filtering, category switching, and ticket management.
 */
export const initHelpSupport = () => {
    const container = document.querySelector('.help-support-module');
    if (!container) return;

    const menuLinks = container.querySelectorAll('.menu-link');
    const faqTitle = container.querySelector('.faq-title');
    const faqDescription = container.querySelector('.faq-description');
    const accordionContainer = document.getElementById('faqAccordion');
    const searchInput = document.getElementById('helpSearchInput');
    const searchCountBadge = document.getElementById('searchCountBadge');

    const contentMap = {
        'architecture': {
            title: 'Platform Architecture & Modularity',
            desc: 'Understand the zero-blocking modular runtime, Vite bundler, SCSS tokens, and Vanilla JS foundation.',
            faqs: [
                {
                    q: 'How does the XIVIG modular runtime achieve instant First Contentful Paint (FCP)?',
                    a: 'XIVIG uses conditional lazy feature mounting in <code>main.js</code>. Rather than bundling all page code into a monolithic script, each page only evaluates DOM selectors and dynamically imports its corresponding module via <code>import()</code> when targets exist.',
                    badge: 'Architecture'
                },
                {
                    q: 'Where are the Atelier design tokens defined and customized?',
                    a: 'Design tokens are located in <code>app/src/scss/base/_variables.scss</code> and exposed via CSS variables (e.g. <code>--xv-brand: #4059E8</code>). All components utilize these tokens for automatic dark and light theme adaptability.',
                    badge: 'Theming'
                },
                {
                    q: 'Can I use custom JavaScript libraries without jQuery?',
                    a: 'Yes. XIVIG is 100% Vanilla JS and zero jQuery. You can import modern ESM modules such as ApexCharts, Chart.js, MapLibre, SortableJS, and Fancybox directly through npm or Vite.',
                    badge: 'Vanilla JS'
                }
            ]
        },
        'deployment': {
            title: 'Edge Deployments & CI/CD Pipelines',
            desc: 'Continuous delivery protocols, Docker orchestration, and automated static exports.',
            faqs: [
                {
                    q: 'How do I compile the production bundle for deployment?',
                    a: 'Run <code>npm run build</code> or <code>npx vite build</code>. The build pipeline bundles all SCSS, compiles assets, optimizes images, and outputs to <code>dist/</code> and <code>docs/</code> with complete relative path integrity.',
                    badge: 'Build'
                },
                {
                    q: 'How are multi-region edge nodes synchronized?',
                    a: 'Edge nodes in us-east-1, eu-west-1, and ap-northeast-1 utilize Anycast BGP routing combined with Cloud CDN edge caching. Real-time telemetry is reported directly into the System Metrics dashboard.',
                    badge: 'Networking'
                },
                {
                    q: 'Does XIVIG support GitHub Pages and custom domain deployments?',
                    a: 'Yes. The <code>docs/</code> directory is automatically generated and optimized for GitHub Pages or static host providers (Netlify, Vercel, Cloudflare Pages) with zero extra server dependencies.',
                    badge: 'GitHub Pages'
                }
            ]
        },
        'security': {
            title: 'Authentication, Zero Trust & Security',
            desc: 'Enterprise security standards, two-factor authentication, and PCI-DSS compliance.',
            faqs: [
                {
                    q: 'How is data encrypted in transit and at rest?',
                    a: 'All edge traffic requires TLS 1.3 encryption with modern cipher suites. Stored configurations, tokens, and telemetry utilize AES-256 GCM encryption at rest.',
                    badge: 'Encryption'
                },
                {
                    q: 'How do I configure Two-Factor Authentication (2FA)?',
                    a: 'Navigate to the Profile &gt; Security Settings tab to enable TOTP (Google Authenticator, Authy). A backup recovery key matrix is generated immediately upon activation.',
                    badge: 'Auth'
                },
                {
                    q: 'What is the role of the Zero Trust security token?',
                    a: 'API requests require ephemeral cryptographic bearer tokens that are validated against active IAM access control policies before proxy routing to downstream microservices.',
                    badge: 'Zero Trust'
                }
            ]
        },
        'billing': {
            title: 'Billing, Invoices & Licensing',
            desc: 'Commercial licensing, seat management, automated invoices, and enterprise SLA.',
            faqs: [
                {
                    q: 'What is included with the XIVIG Elite License?',
                    a: 'The Elite License provides full source code access, unlimited commercial deployments, all 85+ production pages, Figma token design files, and priority SLA direct support.',
                    badge: 'License'
                },
                {
                    q: 'How do I download VAT and enterprise tax invoices?',
                    a: 'Invoices are generated upon settlement and available as downloadable PDFs from Store Settings or Account Billing with instant email dispatch.',
                    badge: 'Invoices'
                },
                {
                    q: 'What does the 99.98% SLA uptime guarantee cover?',
                    a: 'Our Enterprise SLA guarantees 99.98% cluster edge availability across all edge nodes. Credits are automatically applied if network availability falls below threshold.',
                    badge: 'SLA'
                }
            ]
        },
        'api': {
            title: 'REST APIs, Webhooks & Telemetry',
            desc: 'Integrate external services, subscribe to webhook events, and consume JSON endpoints.',
            faqs: [
                {
                    q: 'What are the rate limits for the XIVIG REST API?',
                    a: 'Production tier allows up to 10,000 requests per minute per API key. Bursting headroom of up to 15,000 req/min is supported for streaming analytics telemetry.',
                    badge: 'Rate Limits'
                },
                {
                    q: 'How do I listen for real-time deployment webhooks?',
                    a: 'Register an endpoint in Store Settings &gt; Webhooks. XIVIG transmits signed HMAC-SHA256 payloads for events like <code>deployment.succeeded</code>, <code>alert.critical</code>, and <code>invoice.paid</code>.',
                    badge: 'Webhooks'
                }
            ]
        }
    };

    let activeCategory = 'architecture';

    const renderFaqs = (faqs, highlightQuery = '') => {
        if (!accordionContainer) return;
        if (!faqs || faqs.length === 0) {
            accordionContainer.innerHTML = `
                <div class="card card-box border-0 shadow-sm rounded-4 p-5 text-center">
                    <i class="bi bi-search fs-1 text-muted opacity-50 mb-3"></i>
                    <h5 class="fw-bold text-main">No Matching Results Found</h5>
                    <p class="text-muted small mb-3">We couldn't find any questions matching "${highlightQuery}". Try adjusting your keywords or submit a priority ticket.</p>
                    <div>
                        <button type="button" class="btn btn-primary rounded-pill px-4 extra-small fw-bold" data-bs-toggle="modal" data-bs-target="#ticketModal">
                            <i class="bi bi-ticket-perforated me-1"></i> Open Support Ticket
                        </button>
                    </div>
                </div>
            `;
            return;
        }

        accordionContainer.innerHTML = faqs.map((faq, index) => {
            let qText = faq.q;
            let aText = faq.a;

            if (highlightQuery) {
                const regex = new RegExp(`(${highlightQuery.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
                qText = qText.replace(regex, '<mark class="bg-warning bg-opacity-25 text-dark fw-bold px-1 rounded">$1</mark>');
                aText = aText.replace(regex, '<mark class="bg-warning bg-opacity-25 text-dark fw-bold px-1 rounded">$1</mark>');
            }

            return `
                <div class="accordion-item card-box border-0 shadow-sm rounded-4 mb-3 overflow-hidden">
                    <h2 class="accordion-header" id="heading-${index}">
                        <button class="accordion-button ${index === 0 ? '' : 'collapsed'} bg-transparent p-4 fw-bold text-main" type="button" data-bs-toggle="collapse" data-bs-target="#q-${index}" aria-expanded="${index === 0 ? 'true' : 'false'}">
                            <span class="badge bg-primary-subtle text-primary rounded-pill px-2.5 py-1 extra-small fw-bold me-3">${faq.badge || 'FAQ'}</span>
                            <span class="flex-grow-1">${qText}</span>
                        </button>
                    </h2>
                    <div id="q-${index}" class="accordion-collapse collapse ${index === 0 ? 'show' : ''}" data-bs-parent="#faqAccordion">
                        <div class="accordion-body px-4 pb-4 pt-0 text-muted" style="line-height: 1.7;">
                            ${aText}
                        </div>
                    </div>
                </div>
            `;
        }).join('');
    };

    // Category click handler
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const type = link.dataset.type;
            if (!contentMap[type]) return;

            activeCategory = type;
            menuLinks.forEach(l => l.classList.remove('active', 'btn-primary'));
            link.classList.add('active');

            if (faqTitle) faqTitle.innerText = contentMap[type].title;
            if (faqDescription) faqDescription.innerText = contentMap[type].desc;

            if (searchInput) searchInput.value = '';
            if (searchCountBadge) searchCountBadge.classList.add('d-none');

            renderFaqs(contentMap[type].faqs);
        });
    });

    // Real-time live keystroke search across all FAQs
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.trim().toLowerCase();

            if (!query) {
                if (searchCountBadge) searchCountBadge.classList.add('d-none');
                if (faqTitle) faqTitle.innerText = contentMap[activeCategory].title;
                if (faqDescription) faqDescription.innerText = contentMap[activeCategory].desc;
                renderFaqs(contentMap[activeCategory].faqs);
                return;
            }

            // Search across ALL categories
            const matches = [];
            Object.keys(contentMap).forEach(catKey => {
                contentMap[catKey].faqs.forEach(item => {
                    const qLower = item.q.toLowerCase();
                    const aLower = item.a.toLowerCase();
                    if (qLower.includes(query) || aLower.includes(query)) {
                        matches.push({ ...item, categoryKey: catKey });
                    }
                });
            });

            if (searchCountBadge) {
                searchCountBadge.innerText = `${matches.length} Match${matches.length === 1 ? '' : 'es'}`;
                searchCountBadge.classList.remove('d-none');
            }

            if (faqTitle) faqTitle.innerText = `Search Results: "${query}"`;
            if (faqDescription) faqDescription.innerText = `Showing all matching questions across documentation categories`;

            renderFaqs(matches, query);
        });
    }

    // Quick tag pills click
    document.querySelectorAll('.quick-filter-pill').forEach(pill => {
        pill.addEventListener('click', () => {
            const tag = pill.getAttribute('data-tag');
            if (searchInput) {
                searchInput.value = tag;
                searchInput.dispatchEvent(new Event('input'));
            }
        });
    });

    // Ticket Form Submission
    const ticketForm = document.getElementById('ticket-form');
    ticketForm?.addEventListener('submit', (e) => {
        e.preventDefault();
        const subject = document.getElementById('ticket-subject')?.value;
        const urgency = document.getElementById('ticket-urgency')?.value || 'P2 - High';

        const modalEl = document.getElementById('ticketModal');
        const modal = modalEl ? bootstrap.Modal.getInstance(modalEl) : null;
        modal?.hide();

        NotificationService.success(
            'Support Ticket Submitted',
            `Ticket #XIV-${Math.floor(1000 + Math.random() * 9000)} created with priority ${urgency}. Our solution architects will respond within 15 minutes.`
        );

        ticketForm.reset();
    });

    // Initial render
    renderFaqs(contentMap[activeCategory].faqs);
};
