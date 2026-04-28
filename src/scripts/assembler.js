import '../scss/style.scss';
import * as bootstrap from 'bootstrap';

import 'animate.css';
// This is often more stable than the SCSS import
import '@fortawesome/fontawesome-free/css/all.min.css';

import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Plyr from 'node_modules/plyr/dist/plyr.mjs';

// Inside main.js
import 'bootstrap-icons/font/bootstrap-icons.css';
import './script.js';

import {
    initXivig
}
from './xivig-core.js'; // Import custom JS

// Run your separate logic
initXivig();

import {
    initPreloader
}
from './preloader.js';

import {
    initSidebar
}
from './sidebar.js';
import {
    initSettings
}
from './settings.js';

import {
    initNotificationSelect
} from './NotificationManager.js';

import {
    initLightbox,
    initGalleryFilter
}
from './Lightbox.js';

import {
    initPricingToggle
}
from './Pricing.js';

import {
    initKanban
}
from './Kanban.js';

import {
    initChatSearch
} from './chat-search.js';
import {
    initMailSelection
} from './mail-logic.js';
import {
    initMediaPlayers
} from './video-player.js';
import {
    initSearchApp
} from './search.js';
import {
    initCalendarApp
} from './calendar.js';
import {
    initIconApp
} from './fontawesome-logic.js';

import {
    initIconFilter,
    initIconCopy
} from './bs-icon.js';

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