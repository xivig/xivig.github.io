import './scss/style.scss';

// import * as Popper from '@popperjs/core';
// window.Popper = Popper;

import * as bootstrap from 'bootstrap';
// import * as bootstrap from 'bootstrap/dist/js/bootstrap.bundle.min.js';
// window.bootstrap = bootstrap; // Forces it into the global scope for all modules
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import * as Popper from '@popperjs/core';
window.Popper = Popper;
window.bootstrap = bootstrap;

import {
    Tooltip,
    Dropdown
} from 'bootstrap';


import 'animate.css';
// This is often more stable than the SCSS import
import '@fortawesome/fontawesome-free/css/all.min.css';

import "@fancyapps/ui/dist/fancybox/fancybox.css";

import Plyr from '../node_modules/plyr/dist/plyr.min.mjs';

// Inside main.js
import 'bootstrap-icons/font/bootstrap-icons.css';
import './scripts/script.js';

import {
    initXivig
}
from './scripts/xivig-core.js'; // Import custom JS

// Run your separate logic
initXivig();

import {
    initPreloader
}
from './scripts/preloader.js';

import {
    initSidebar
}
from './scripts/sidebar.js';
import {
    initSettings
}
from './scripts/settings.js';

import {
    initNotificationSelect
} from './scripts/NotificationManager.js';

import {
    initLightbox,
    initGalleryFilter
}
from './scripts/Lightbox.js';

import {
    initPricingToggle
}
from './scripts/Pricing.js';

import {
    initKanban
}
from './scripts/Kanban.js';

import {
    initChatSearch
} from './scripts/chat-search.js';
import {
    initMailSelection
} from './scripts/mail-logic.js';
import {
    initMediaPlayers
} from './scripts/video-player.js';
import {
    initSearchApp
} from './scripts/search.js';
import {
    initCalendarApp
} from './scripts/calendar.js';
import {
    initIconApp
} from './scripts/fontawesome-logic.js';

import {
    initIconFilter,
    initIconCopy
} from './scripts/bs-icon.js';
import UiController from './scripts/UiController.js';
import NotificationService from './scripts/sweet-alert.js';

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
    document.addEventListener('DOMContentLoaded', () => {
        // NotificationService.success('Connection Active', 'The service is working!');
        // Initialize global UI elements
        UiController.init();
        console.log("🚀 Xivig UI Core Initialized");

        console.log('Xivig OS: Icon Library Loaded Successfully.');
        try {
            initMediaPlayers();
        } catch (error) {
            console.error("Elite Media Engine failed to start:", error);
        }

    });

    document.addEventListener('DOMContentLoaded', () => {
        // Example: Attaching to your buttons
        const btnSuccess = document.getElementById('sa-success');
        if (btnSuccess) {
            btnSuccess.onclick = () => NotificationService.success('Great Job!', 'Changes saved.');
        }

        const btnDelete = document.getElementById('sa-warning');
        if (btnDelete) {
            btnDelete.onclick = async () => {
                const result = await NotificationService.confirm('Are you sure?', 'This is permanent.');
                if (result.isConfirmed) {
                    NotificationService.success('Deleted!', 'File removed.');
                }
            };
        }

        // Advanced: AJAX/Loader example
        const btnSync = document.getElementById('ajax-alert');
        if (btnSync) {
            btnSync.onclick = () => NotificationService.loader(
                'Syncing Nodes',
                'Connecting to Architect OS...',
                () => new Promise(resolve => setTimeout(resolve, 2000)) // Mock API call
            );
        }
    });
});

const initNotifications = () => {
    const selectors = {
        'sa-basic': () => NotificationService.basic('Elite Notification', 'This is a clean, modular alert.'),
        'sa-success': () => NotificationService.success('Task Finished', 'Data synchronized successfully.'),
        'sa-error': () => NotificationService.error('System Error', 'Unable to reach the secure server.'),
        'sa-warning': () => {
            NotificationService.confirm('Delete Record?', 'This action is permanent.')
                .then(res => res.isConfirmed && NotificationService.success('Deleted', 'File removed.'));
        },
        'custom-html-alert': () => {
            NotificationService.basic('Rich Content', 'You can use <b>HTML</b> and <br> custom layouts.');
        },
        'ajax-alert': () => {
            // Simulated API Call
            const mockApi = () => new Promise(resolve => setTimeout(resolve, 2500));
            NotificationService.loader('Fetching Data', 'Talking to Xivig API...', mockApi);
        }
    };

    // Attach listeners dynamically
    Object.entries(selectors).forEach(([id, action]) => {
        const btn = document.getElementById(id);
        if (btn) btn.addEventListener('click', action);
    });
};

document.addEventListener('DOMContentLoaded', initNotifications);