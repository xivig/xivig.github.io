// ==========================================================================
// XIVIG ELITE ARCHITECTURE - ULTRA-FAST MODULAR APPLICATION RUNTIME
// Zero render-blocking delays, dynamic code-splitting, instantaneous FCP
// ==========================================================================

// 1. CORE BUNDLE STYLES (Synchronous minimal critical CSS)
import 'animate.css/animate.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './scss/vendors/vendors.scss';
import './scss/admin-bundle.scss';

// 2. CORE RUNTIME DEPENDENCIES
import * as bootstrap from 'bootstrap';
import * as Popper from '@popperjs/core';

// Expose Core Globals
window.Popper = Popper;
window.bootstrap = bootstrap;

// 3. CORE FOUNDATION & UI SERVICES (Always active)
import { initXivig } from './scripts/core/xivig-core.js';
import UiController from './scripts/core/ui-controller.js';
import NotificationService from './scripts/components/sweet-alert.js';
import { initPreloader } from './scripts/core/preloader.js';
import { initSidebar } from './scripts/core/sidebar.js';
import { initSettings } from './scripts/core/settings.js';
import { initMobileController } from './scripts/core/mobile-controller.js';
import { NotificationBadge } from './scripts/components/notification-badge.js';

// Global reference for legacy notifications
window.NotificationService = NotificationService;

const App = {
    async init() {
        // Fast-path preloader dismissal
        try {
            initPreloader();
        } catch (e) {
            console.warn("Preloader bypass:", e);
        }

        // Global structural shell
        try {
            initXivig();
            UiController.init();
            initSidebar();
            initSettings();
            initMobileController();
            window.headerBadge = new NotificationBadge('header-notification-badge');
        } catch (error) {
            console.error("Shell initialization error:", error);
        }

        // Conditional Lazy Feature Mounting (Only executes when DOM targets exist)
        this.mountConditionalModules();
    },

    async mountConditionalModules() {
        // 1. Alert Triggers
        initNotifications();

        // 2. Notification Drawer
        if (document.querySelector('.notification-select-all')) {
            const { initNotificationSelect } = await import('./scripts/components/notification-manager.js');
            initNotificationSelect();
        }

        // 3. Lightbox & Gallery
        if (document.querySelector('[data-fancybox], .gallery-filter, .filter-btn, #gallery-grid')) {
            const { initLightbox, initGalleryFilter } = await import('./scripts/components/lightbox.js');
            initLightbox();
            initGalleryFilter();
        }

        // 4. Pricing Toggle
        if (document.getElementById('pricingSwitch') || document.querySelector('.pricing-card')) {
            const { initPricingToggle } = await import('./scripts/components/pricing.js');
            initPricingToggle();
        }

        // 5. Kanban Board
        if (document.querySelector('.kanban-wrapper, .kanban-column, #todo, #inprogress')) {
            const { initKanban } = await import('./scripts/apps/Kanban.js');
            initKanban();
        }

        // 6. Task Manager
        if (document.querySelector('.task-manager-module, #taskListContainer')) {
            const { initTaskManager } = await import('./scripts/apps/task-manager.js');
            initTaskManager();
        }

        // 7. Calendar
        if (document.getElementById('calendar')) {
            const { initCalendarApp } = await import('./scripts/apps/calendar.js');
            initCalendarApp();
        }

        // 8. Chat Application
        if (document.getElementById('chat-search') || document.querySelector('.chat-module')) {
            const { initChatSearch } = await import('./scripts/apps/chat-search.js');
            initChatSearch();
        }

        // 9. Mail Application
        if (document.querySelector('.mail-list, #mail-container, .mail-sidebar, #composeForm')) {
            const { initMailSelection, initComposeMail } = await import('./scripts/apps/mail-logic.js');
            initMailSelection();
            if (initComposeMail) initComposeMail();
        }

        // 10. Search Application
        if (document.getElementById('search-input') || document.querySelector('.search-results')) {
            const { initSearchApp } = await import('./scripts/apps/search.js');
            initSearchApp();
        }

        // 11. Icon Suites
        if (document.getElementById('faSearchInput')) {
            const { initIconApp } = await import('./scripts/apps/fontawesome-logic.js');
            initIconApp();
        }
        if (document.getElementById('filter_input') && document.getElementById('bsIconContainer')) {
            const { initIconFilter } = await import('./scripts/apps/bs-icon.js');
            initIconFilter('filter_input', 'bsIconContainer');
        }

        // 12. Video Players
        if (document.querySelector('video, audio, .plyr')) {
            const { initMediaPlayers } = await import('./scripts/components/video-player.js');
            initMediaPlayers();
        }

        // 13. DataTables
        if (document.querySelector('#example, .dataTable, table.table-hover[id]')) {
            const { initDataTables } = await import('./scripts/components/data-table.js');
            initDataTables();
        }

        // 14. Vector Map
        if (document.getElementById('map') || document.getElementById('map-vector') || document.querySelector('.vector-map, .vector-map-module')) {
            const { initVectorMap } = await import('./scripts/components/vector-map.js');
            initVectorMap();
        }

        // 15. Store Settings
        if (document.getElementById('storeSettingsForm') || document.getElementById('shippingMatrixTable')) {
            const { initStoreSettings } = await import('./scripts/pages/store-settings.js');
            initStoreSettings();
        }

        // 16. Form Wizards
        if (document.querySelector('[data-wizard], #smartwizard')) {
            const { initFormWizard } = await import('./scripts/forms/form-wizard.js');
            initFormWizard();
        }

        // 17. Form Pickers & Advanced Inputs
        if (document.querySelector('.color-picker, .flatpickr, .air-datepicker, input[type="date"]')) {
            const { initFormPickers } = await import('./scripts/forms/form-pickers.js');
            initFormPickers();
        }
        if (document.querySelector('.cleave-input, [data-cleave], .advanced-form')) {
            const { initFormAdv } = await import('./scripts/forms/form-adv.js');
            initFormAdv();
        }

        // 18. Image Plugins
        if (document.getElementById('cropper-image')) {
            const { initImageCropper } = await import('./scripts/forms/form-plugins.js');
            initImageCropper();
        }
        if (document.querySelector('.dropzone, #myDropzone')) {
            const { initImageDropzone } = await import('./scripts/forms/form-plugins.js');
            initImageDropzone();
        }
        if (document.getElementById('summernote') || document.getElementById('editor')) {
            const { initSummernote } = await import('./scripts/forms/form-plugins.js');
            initSummernote();
        }

        // 19. Specialized Pages
        if (document.querySelector('.maintenance-container')) {
            const { initMaintenance } = await import('./scripts/pages/maintenance.js');
            initMaintenance();
        }
        if (document.querySelector('.analytics-dashboard, #growthChart, #userDistChart')) {
            try {
                const { initAnalyticsOverview } = await import('./scripts/pages/analytics.js');
                initAnalyticsOverview();
            } catch (e) {
                console.error("Analytics Overview init error:", e);
            }
        }
        if (document.querySelector('.system-metrics-container, #realtimeChart, #cpuChart')) {
            try {
                const { initSystemMetrics } = await import('./scripts/pages/system-metrics.js');
                initSystemMetrics();
            } catch (e) {
                console.error("System Metrics init error:", e);
            }
        }

        // 20. Dashboard v1 (Modular Telemetry & Charts)
        if (document.getElementById('activities-chart') || document.getElementById('revenueSparkline') || document.getElementById('deploymentSparkline')) {
            try {
                const { initDashboard } = await import('./scripts/pages/dashboard.js');
                initDashboard();
            } catch (e) {
                console.warn("Dashboard v1 init skipped:", e);
            }
        }

        // 21. Dashboard v2
        if (document.getElementById('scatterChart') || document.getElementById('performanceRadial')) {
            try {
                const { initDashboardV2 } = await import('./scripts/pages/dashboard-v2.js');
                initDashboardV2();
            } catch (e) {
                console.warn("Dashboard v2 init skipped:", e);
            }
        }

        // 22. Dedicated Chart Pages (ECharts, Highcharts, ApexCharts, Chart.js)
        if (document.querySelector('.echart, #echart, [id*="echart"], #barChart, #miniPie, #trafficPie, #deviceArea')) {
            try {
                const { EChartModule } = await import('./scripts/charts/echart.js');
                EChartModule.initAll();
            } catch (e) {
                console.error("ECharts init error:", e);
            }
        }
        if (document.querySelector('#highchart, .highchart, [id*="highchart"], #highchartLine, #highchartArea')) {
            try {
                const { default: HighchartManager } = await import('./scripts/charts/highchart-manager.js');
                HighchartManager.initAll();
            } catch (e) {
                console.error("Highcharts init error:", e);
            }
        }
        if (document.querySelector('#apex-chart, .apex-chart, [id*="apex"], #apexSpline, #apexColumn')) {
            try {
                const { default: ApexchartManager } = await import('./scripts/charts/apexchart-manager.js');
                ApexchartManager.initAll();
            } catch (e) {
                console.error("Apexcharts init error:", e);
            }
        }
        if (document.querySelector('canvas.chartjs, #myChart, [id*="chartjs"], #verticalBar, #horizontalBar, #groupedBar, #stackedBar, #lineChart, #areaChart')) {
            try {
                const { default: ChartManager } = await import('./scripts/charts/chart-manager.js');
                ChartManager.initAll();
            } catch (e) {
                console.error("Chart.js init error:", e);
            }
        }

        // 23. Admin Settings
        if (document.getElementById('sortable-sidebar') || document.querySelector('.admin-settings')) {
            try {
                const { initAdminSettings } = await import('./scripts/pages/admin-settings.js');
                initAdminSettings();
            } catch (e) {
                console.error("Admin Settings init error:", e);
            }
        }

        // 24. Help & Support
        if (document.querySelector('.help-support-module') || document.getElementById('faqAccordion')) {
            try {
                const { initHelpSupport } = await import('./scripts/pages/help-support.js');
                initHelpSupport();
            } catch (e) {
                console.error("Help Support init error:", e);
            }
        }

        // 25. Profile Page
        if (document.querySelector('.profile-module') || document.getElementById('pills-profile-tab')) {
            try {
                const { initProfile } = await import('./scripts/pages/profile.js');
                initProfile();
            } catch (e) {
                console.error("Profile init error:", e);
            }
        }
    }
};

const initNotifications = () => {
    const selectors = {
        'sa-basic': () => NotificationService.basic('Elite Notification', 'This is a clean, modular alert.'),
        'sa-success': () => NotificationService.success('Task Finished', 'Data synchronized successfully.'),
        'sa-error': () => NotificationService.error('System Error', 'Unable to reach the secure server.'),
        'sa-warning': () => {
            NotificationService.confirm('Delete Record?', 'This action is permanent.')
                .then(res => res.isConfirmed && NotificationService.success('Deleted', 'File removed.'));
        },
        'custom-html-alert': () => NotificationService.basic('Rich Content', 'You can use <b>HTML</b> and <br> custom layouts.'),
        'ajax-alert': () => {
            const mockApi = () => new Promise(resolve => setTimeout(resolve, 2500));
            NotificationService.loader('Fetching Data', 'Talking to Xivig API...', mockApi);
        }
    };
    Object.entries(selectors).forEach(([id, action]) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', action);
    });
};

window.App = App;

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
        App.init();
    });
} else {
    App.init();
}
