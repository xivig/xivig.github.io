
// 1. PROJECT STYLES
import 'animate.css/animate.css';
import './scss/auth-bundle.scss';

// 2. VENDOR JS
import * as bootstrap from 'bootstrap';
import * as Popper from '@popperjs/core';

// 3. EXPOSE GLOBALS
window.Popper = Popper;
window.bootstrap = bootstrap;

// 4. CORE & UTILITIES
import { initPreloader } from './scripts/core/preloader.js';
import { initMobileController } from './scripts/core/mobile-controller.js';

function startAuth() {
    initPreloader();
    initMobileController();
}

if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startAuth);
} else {
    startAuth();
}
