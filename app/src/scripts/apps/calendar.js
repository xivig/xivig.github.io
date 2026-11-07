import { Calendar } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';
import interactionPlugin, { Draggable } from '@fullcalendar/interaction';
import bootstrap5Plugin from '@fullcalendar/bootstrap5';

export const initCalendarApp = () => {
    const calendarEl = document.getElementById('calendar');
    const containerEl = document.getElementById('external-events');
    const addBtn = document.getElementById('add-new-event');
    const inputTitle = document.getElementById('new-event-title');
    const colorBtns = document.querySelectorAll('.color-btn');

    if (!calendarEl) return;

    let selectedColor = 'bg-primary';

    // 1. Initialize Draggable items from left sidebar
    if (containerEl) {
        new Draggable(containerEl, {
            itemSelector: '.fc-event',
            eventData: (eventEl) => ({
                title: eventEl.innerText.trim(),
                className: eventEl.getAttribute('data-class') || 'bg-primary'
            })
        });
    }

    const today = new Date();
    const curYear = today.getFullYear();
    const curMonth = today.getMonth();

    // Sample events with Elite palette
    const initialEvents = [
        {
            id: 'ev-1',
            title: 'Q3 Architectural Sync',
            start: new Date(curYear, curMonth, 3, 10, 0),
            end: new Date(curYear, curMonth, 3, 11, 30),
            className: 'fc-event-indigo',
            category: 'work'
        },
        {
            id: 'ev-2',
            title: 'Design System Sprint Review',
            start: new Date(curYear, curMonth, 7, 14, 0),
            end: new Date(curYear, curMonth, 7, 15, 30),
            className: 'fc-event-cyan',
            category: 'meeting'
        },
        {
            id: 'ev-3',
            title: 'Core API Gateway Release 2.4',
            start: new Date(curYear, curMonth, 12, 9, 0),
            end: new Date(curYear, curMonth, 12, 12, 0),
            className: 'fc-event-purple',
            category: 'release'
        },
        {
            id: 'ev-4',
            title: 'Security Vulnerability Patching',
            start: new Date(curYear, curMonth, 15, 11, 0),
            end: new Date(curYear, curMonth, 15, 13, 0),
            className: 'fc-event-danger',
            category: 'urgent'
        },
        {
            id: 'ev-5',
            title: 'Quarterly Team All-Hands',
            start: new Date(curYear, curMonth, 18, 15, 0),
            end: new Date(curYear, curMonth, 18, 17, 0),
            className: 'fc-event-warning',
            category: 'meeting'
        },
        {
            id: 'ev-6',
            title: 'Product Launch Stage 1',
            start: new Date(curYear, curMonth, 22, 10, 0),
            end: new Date(curYear, curMonth, 22, 11, 30),
            className: 'fc-event-success',
            category: 'personal'
        },
        {
            id: 'ev-7',
            title: 'Database Failover Test',
            start: new Date(curYear, curMonth, 26, 16, 0),
            end: new Date(curYear, curMonth, 26, 18, 0),
            className: 'fc-event-danger',
            category: 'urgent'
        }
    ];

    // 2. Initialize FullCalendar
    const calendar = new Calendar(calendarEl, {
        plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, bootstrap5Plugin],
        themeSystem: 'bootstrap5',
        initialView: 'dayGridMonth',
        headerToolbar: {
            left: 'prev,next today',
            center: 'title',
            right: 'dayGridMonth,timeGridWeek,timeGridDay,listMonth'
        },
        editable: true,
        droppable: true,
        selectable: true,
        selectMirror: true,
        dayMaxEvents: 3,
        events: initialEvents,
        drop: (info) => {
            const dropRemoveCheckbox = document.getElementById('drop-remove');
            if (dropRemoveCheckbox && dropRemoveCheckbox.checked) {
                info.draggedEl.remove();
            }
        },
        dateClick: (info) => {
            openEventModal(info.dateStr);
        },
        eventClick: (info) => {
            alert(`Event: ${info.event.title}\nStarts: ${info.event.start.toLocaleString()}`);
        }
    });

    calendar.render();

    // 3. Quick Color Picker Logic
    colorBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            colorBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            selectedColor = btn.getAttribute('data-color') || 'bg-primary';
        });
    });

    // 4. Add Quick Draggable Event
    if (addBtn && inputTitle && containerEl) {
        addBtn.addEventListener('click', () => {
            const title = inputTitle.value.trim();
            if (!title) return;

            const newEvent = document.createElement('div');
            newEvent.className = `fc-event ${selectedColor} text-white p-2 mb-2 rounded-2 cursor-move d-flex align-items-center justify-content-between`;
            newEvent.setAttribute('data-class', selectedColor);
            newEvent.innerHTML = `
                <span>${title}</span>
                <i class="bi bi-grip-vertical opacity-50 small"></i>
            `;

            containerEl.prepend(newEvent);
            inputTitle.value = '';
        });
    }

    // 5. Modal Integration for Page Header CTA "Create event"
    const eventModalEl = document.getElementById('createEventModal');
    let bsEventModal = null;
    if (eventModalEl && window.bootstrap) {
        bsEventModal = new window.bootstrap.Modal(eventModalEl);
    }

    const openEventModal = (prefillDate = '') => {
        if (!bsEventModal) return;
        const dateInput = document.getElementById('modalEventDate');
        if (dateInput && prefillDate) {
            dateInput.value = prefillDate;
        }
        bsEventModal.show();
    };

    // Listen to primary page action button
    const pagePrimaryActionBtn = document.getElementById('pagePrimaryActionBtn');
    if (pagePrimaryActionBtn) {
        pagePrimaryActionBtn.addEventListener('click', () => {
            openEventModal();
        });
    }

    // Modal Form Submit
    const eventForm = document.getElementById('createEventForm');
    if (eventForm) {
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('modalEventTitle')?.value.trim();
            const date = document.getElementById('modalEventDate')?.value;
            const category = document.getElementById('modalEventCategory')?.value || 'fc-event-indigo';

            if (!title || !date) return;

            calendar.addEvent({
                title: title,
                start: date,
                allDay: true,
                className: category
            });

            eventForm.reset();
            bsEventModal?.hide();
        });
    }

    // 6. Category Filter Checkboxes
    const categoryCheckboxes = document.querySelectorAll('.calendar-category-filter');
    categoryCheckboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            const activeCategories = Array.from(categoryCheckboxes)
                .filter(c => c.checked)
                .map(c => c.value);

            calendar.getEvents().forEach(ev => {
                const cat = ev.extendedProps.category;
                if (!cat || activeCategories.includes(cat)) {
                    ev.setProp('display', 'auto');
                } else {
                    ev.setProp('display', 'none');
                }
            });
        });
    });
};
