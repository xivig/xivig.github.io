// 1. TOP-LEVEL VENDOR JS (Must be first for globals)
import './scripts/jquery-setup.js';

// 2. VENDOR STYLES (Direct imports for Vite bundling)
import 'animate.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'summernote/dist/summernote-lite.css';
import 'air-datepicker/air-datepicker.css';
import 'timedropper/timedropper.css';

// 3. OTHER VENDOR JS
import * as bootstrap from 'bootstrap';
import * as Popper from '@popperjs/core';
import Plyr from 'plyr';
import 'summernote/dist/summernote-lite.js';
import AirDatepicker from 'air-datepicker';
import 'timedropper';
import Cropper from 'cropperjs';

// 4. EXPOSE GLOBALS
window.Popper = Popper;
window.bootstrap = bootstrap;
window.Cropper = Cropper;
window.AirDatepicker = AirDatepicker;

// 5. CORE & UTILITIES
import { initXivig } from './scripts/xivig-core.js';
import UiController from './scripts/UiController.js';
import NotificationService from './scripts/sweet-alert.js';
import { initPreloader } from './scripts/preloader.js';
import { initSidebar } from './scripts/sidebar.js';
import { initSettings } from './scripts/settings.js';

// 6. FEATURES
import { initNotificationSelect } from './scripts/NotificationManager.js';
import { initLightbox, initGalleryFilter } from './scripts/Lightbox.js';
import { initPricingToggle } from './scripts/Pricing.js';
import { initKanban } from './scripts/Kanban.js';
import { initChatSearch } from './scripts/chat-search.js';
import { initMailSelection } from './scripts/mail-logic.js';
import { initMediaPlayers } from './scripts/video-player.js';
import { initSearchApp } from './scripts/search.js';
import { initCalendarApp } from './scripts/calendar.js';
import { initIconApp } from './scripts/fontawesome-logic.js';
import { initIconFilter, initIconCopy } from './scripts/bs-icon.js';
import { initHelpSupport } from './scripts/help-support.js';
import { initAccountOnboarding } from './scripts/account-onboarding.js';
import { initAccountSettings } from './scripts/account-settings.js';
import { initFormAdv } from './scripts/form-adv.js';
import { initVectorMap } from './scripts/vector-map.js';
import { initStoreSettings } from './scripts/store-settings.js';
import { initTaskManager } from './scripts/task-manager.js';

// 7. CHARTS
import { EChartModule } from './scripts/Echart.js';
import ChartManager from './scripts/ChartManager.js';
import HighchartManager from './scripts/HighchartManager.js';
import ApexchartManager from './scripts/ApexchartManager.js';

// Global reference for legacy scripts
window.NotificationService = NotificationService;

const App = {
    init() {
        console.log("🚀 Elite Architect Engine Starting...");
        
        try {
            initXivig();
            UiController.init();
            initPreloader();
            initSidebar();
            initSettings();
            
            // App Modules
            initNotificationSelect();
            initLightbox();
            initGalleryFilter();
            initPricingToggle();
            initKanban();
            initChatSearch();
            initMailSelection();
            initSearchApp();
            initCalendarApp();
            
            // Icon Systems
            initIconApp();
            initIconFilter('filter_input', 'bsIconContainer');
            
            // New Modules
            initHelpSupport();
            initAccountOnboarding();
            initAccountSettings();
            initFormAdv();
            initVectorMap();
            initStoreSettings();
            initTaskManager();
            
            if (window.AOS) {
                AOS.init({ duration: 1000, once: true, offset: 50 });
            }
            
            initMediaPlayers();
            initNotifications();
            Dashboard.init();

        } catch (error) {
            console.error("❌ App Initialization Failed:", error);
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

const Dashboard = {
    state: { chartjs: {}, echarts: {}, highcharts: {}, apexcharts: {} },
    init() {
        if (!document.getElementById('accordion-menu')) return;
        
        console.log("📊 Dashboard Initializing...");
        try {
            const safeInit = (name, initFn) => {
                try { return initFn(); } catch (e) { console.warn(`⚠️ ${name} init failed:`, e); return {}; }
            };
            this.state.chartjs = safeInit('Chart.js', () => ChartManager.initAll());
            this.state.echarts = safeInit('ECharts', () => EChartModule.initAll());
            this.state.highcharts = safeInit('Highcharts', () => HighchartManager.initAll());
            this.state.apexcharts = safeInit('ApexCharts', () => ApexchartManager.initAll());
        } catch (error) {
            console.error('❌ Dashboard failure:', error);
        }
    }
};

window.addEventListener("load", () => {
    App.init();
});

window.Dashboard = Dashboard;
window.App = App;
