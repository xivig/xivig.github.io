import '../scss/main.scss';
import * as bootstrap from 'bootstrap';

import 'animate.css';
// This is often more stable than the SCSS import
import '@fortawesome/fontawesome-free/css/all.min.css';

import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Plyr from 'node_modules/plyr/dist/plyr.mjs';

// Inside main.js
import 'bootstrap-icons/font/bootstrap-icons.css';
import './core/script.js';

import {
    initXivig
}
from './core/xivig-core.js'; // Import custom JS

// Run your separate logic
initXivig();

import {
    initPreloader
}
from './core/preloader.js';

import {
    initSidebar
}
from './core/sidebar.js';
import {
    initSettings
}
from './core/settings.js';

import {
    initNotificationSelect
} from './components/NotificationManager.js';

import {
    initLightbox,
    initGalleryFilter
}
from './components/Lightbox.js';

import {
    initPricingToggle
}
from './components/Pricing.js';

import {
    initKanban
}
from './apps/Kanban.js';

import {
    initChatSearch
} from './apps/chat-search.js';
import {
    initMailSelection
} from './apps/mail-logic.js';
import {
    initMediaPlayers
} from './components/video-player.js';
import {
    initSearchApp
} from './apps/search.js';
import {
    initCalendarApp
} from './apps/calendar.js';
import {
    initIconApp
} from './apps/fontawesome-logic.js';

import {
    initIconFilter,
    initIconCopy
} from './apps/bs-icon.js';

window.addEventListener("load", () => {
    initPreloader();
    initSidebar();
    initSettings();
    initNotificationSelect();
    initLightbox();
    initGalleryFilter();
    initPricingToggle();
    initKanban();
    initChatSearch();
    initMailSelection();
    initSearchApp();
    initCalendarApp();
    initIconApp();
    // Initialize Xivig Icon Library Features
    initIconFilter('filter_input', '.fa-hover');
    initIconCopy('.fa-hover');

    console.log('Xivig OS: Icon Library Loaded Successfully.');
    try {
        initMediaPlayers();
    } catch (error) {
        console.error("Elite Media Engine failed to start:", error);
    }

});