
// 1. PROJECT STYLES
import 'animate.css/animate.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import './scss/home-bundle.scss';

// 2. VENDOR JS
import * as bootstrap from 'bootstrap';
import * as Popper from '@popperjs/core';

// 3. EXPOSE GLOBALS
window.Popper = Popper;
window.bootstrap = bootstrap;

// 4. CORE & UTILITIES
import { initXivig } from './scripts/core/xivig-core.js';
import { initPreloader } from './scripts/core/preloader.js';
import { initLightbox, initGalleryFilter } from './scripts/components/lightbox.js';
import { initPricingToggle } from './scripts/components/pricing.js';
import { initMaintenance } from './scripts/pages/maintenance.js';
import { initMobileController } from './scripts/core/mobile-controller.js';
import { initLandingPage } from './scripts/pages/landing.js';

function startHome() {
    initPreloader();
    initXivig();
    initLandingPage();
    initLightbox();
    initGalleryFilter();
    initPricingToggle();
    initMaintenance();
    initMobileController();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startHome);
} else {
    startHome();
}
