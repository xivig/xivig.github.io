/**
 * Form Pickers Module
 * Handles Datepickers, Timepickers, and Color Pickers
 */
import AirDatepicker from 'air-datepicker';
import dayjs from 'dayjs';

// Reusable English Locale
const enLocale = {
    days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    daysShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
    daysMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    months: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
    monthsShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    today: 'Today',
    clear: 'Clear',
    dateFormat: 'MM/dd/yyyy',
    timeFormat: 'hh:mm aa',
    firstDay: 0
};

export const initFormPickers = () => {
    initDatePickers();
    initTimePickers();
    initColorPickers();
    initLiveClocks();
};

/**
 * Air Datepicker Initializations
 */
const initDatePickers = () => {
    // 1. Default Datepicker
    if (document.getElementById('air-datepicker')) {
        new AirDatepicker('#air-datepicker', {
            locale: enLocale, 
            autoClose: true
        });
    }

    // 2. Date and Time (Clock Input)
    if (document.getElementById('clock-input')) {
        new AirDatepicker('#clock-input', {
            locale: enLocale,
            timepicker: true,
            autoClose: false,
            buttons: ['today', 'clear'],
            dateFormat: 'yyyy-MM-dd',
            timeFormat: 'HH:mm'
        });
    }

    // 3. Inline Datepicker
    const outputDate = document.getElementById('output-date');
    if (document.getElementById('inline-datepicker')) {
        new AirDatepicker('#inline-datepicker', {
            locale: enLocale,
            inline: true,
            onSelect({date}) {
                if (outputDate && date) {
                    outputDate.innerText = dayjs(date).format('dddd, MMM D, YYYY');
                }
            }
        });
    }

    // 4. Month Picker
    const monthOutput = document.getElementById('month-output');
    if (document.getElementById('month-picker')) {
        new AirDatepicker('#month-picker', {
            locale: enLocale,
            view: 'months',
            minView: 'months',
            dateFormat: 'MMMM yyyy',
            autoClose: true,
            onSelect({date}) {
                if (monthOutput && date) {
                    monthOutput.innerText = dayjs(date).format('MMMM YYYY');
                }
            }
        });
    }

    // 5. Range Picker
    if (document.getElementById('range-picker')) {
        new AirDatepicker('#range-picker', {
            locale: enLocale, 
            range: true, 
            autoClose: true
        });
    }
};

/**
 * Time Pickers (using legacy timedropper with Vanilla safety)
 */
const initTimePickers = () => {
    // Check for jQuery and the timedropper plugin
    if (window.jQuery && typeof window.jQuery.fn.timeDropper !== 'undefined') {
        window.jQuery('.td-input').timeDropper({
            format: 'hh:mm A',
            primaryColor: '#0071e3',
            setCurrentTime: false,
            meridians: true,
            // CRITICAL: Set animation to false or fadein to prevent "hanging"
            init_animation: 'fadein',
            autosize: false,
            // Force the overlay to remove itself on selection
            onSelect: function () {
                window.jQuery('.td-overlay').fadeOut(100, function () {
                    window.jQuery(this).remove();
                });
            }
        });
    } else {
        // Vanilla Fallback if jQuery is missing
        const timeSelectors = ['.td-input', '#time-delivery', '#train-departure', '#alarm-clock', '#quick-entry'];
        timeSelectors.forEach(selector => {
            const els = document.querySelectorAll(selector);
            els.forEach(el => {
                new AirDatepicker(el, {
                    locale: enLocale,
                    onlyTimepicker: true,
                    timepicker: true,
                    timeFormat: 'hh:mm aa',
                    autoClose: true
                });
            });
        });
    }
};

/**
 * Color Pickers Logic
 */
const initColorPickers = () => {
    const simplePicker = document.getElementById('simple-picker');
    const simpleInput = document.getElementById('simple-input');
    if (simplePicker && simpleInput) {
        simplePicker.addEventListener('input', (e) => simpleInput.value = e.target.value.toUpperCase());
        simpleInput.addEventListener('input', (e) => {
            const val = e.target.value;
            if (/^#[0-9A-F]{6}$/i.test(val)) simplePicker.value = val;
        });
    }

    const applePicker = document.getElementById('appleColorPicker');
    const colorValue = document.getElementById('colorValue');
    if (applePicker && colorValue) {
        applePicker.addEventListener('input', (e) => {
            const val = e.target.value.toUpperCase();
            colorValue.value = val;
            document.documentElement.style.setProperty('--apple-accent', val);
        });
    }

    const rgbaPicker = document.getElementById('rgba-picker');
    const rgbaOpacity = document.getElementById('rgba-opacity');
    const rgbaOutput = document.getElementById('rgba-output');
    const opacityVal = document.getElementById('opacity-val');

    const updateRGBA = () => {
        if (!rgbaPicker || !rgbaOpacity || !rgbaOutput) return;
        const hex = rgbaPicker.value;
        const alpha = rgbaOpacity.value;
        const r = parseInt(hex.slice(1, 3), 16);
        const g = parseInt(hex.slice(3, 5), 16);
        const b = parseInt(hex.slice(5, 7), 16);
        const rgbaColor = `rgba(${r}, ${g}, ${b}, ${alpha})`;
        rgbaOutput.value = rgbaColor;
        if (opacityVal) opacityVal.innerText = `${Math.round(alpha * 100)}%`;
        rgbaOutput.style.borderColor = rgbaColor;
    };

    if (rgbaPicker) rgbaPicker.addEventListener('input', updateRGBA);
    if (rgbaOpacity) rgbaOpacity.addEventListener('input', updateRGBA);
    if (rgbaPicker) updateRGBA();

    const gradStart = document.getElementById('grad-start-picker');
    const gradEnd = document.getElementById('grad-end-picker');
    const gradStartInp = document.getElementById('grad-start-input');
    const gradEndInp = document.getElementById('grad-end-input');
    const gradPreview = document.getElementById('gradient-result-preview');

    const updateGradient = () => {
        if (!gradStart || !gradEnd || !gradPreview) return;
        const start = gradStart.value;
        const end = gradEnd.value;
        if (gradStartInp) gradStartInp.value = start.toUpperCase();
        if (gradEndInp) gradEndInp.value = end.toUpperCase();
        gradPreview.style.background = `linear-gradient(90deg, ${start}, ${end})`;
    };

    if (gradStart) gradStart.addEventListener('input', updateGradient);
    if (gradEnd) gradEnd.addEventListener('input', updateGradient);
    if (gradStart) updateGradient();
};

/**
 * Live Clocks using Day.js
 */
const initLiveClocks = () => {
    const liveClock = document.getElementById('live-clock');
    const liveClock1 = document.getElementById('live-clock1');
    
    const update = () => {
        const now = dayjs();
        if (liveClock) {
            // Using textContent for time part and a separate span for AM/PM to avoid mangled text
            const timeStr = now.format('h:mm:ss');
            const amPm = now.format('A');
            liveClock.innerHTML = `${timeStr} <span class="fs-4 ms-1 opacity-50">${amPm}</span>`;
        }
        if (liveClock1) {
            liveClock1.innerText = now.format('ddd, MMM D, YYYY');
        }
    };

    if (liveClock || liveClock1) {
        setInterval(update, 1000);
        update();
    }
};

