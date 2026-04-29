/**
 * Analytics Overview Module
 * Handles chart initialization for the analytics overview page.
 */

import ApexCharts from 'apexcharts';

export const initAnalyticsOverview = () => {
    const growthChartEl = document.querySelector("#growthChart");
    const userDistChartEl = document.querySelector("#userDistChart");

    if (growthChartEl) {
        const growthOptions = {
            series: [{ name: 'Velocity', data: [31, 40, 28, 51, 42, 109, 100] }],
            chart: { height: 350, type: 'area', toolbar: { show: false }, sparkline: { enabled: false } },
            colors: ['#6366f1'],
            fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.1, stops: [0, 90, 100] } },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: 3 },
            xaxis: { categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"] }
        };
        new ApexCharts(growthChartEl, growthOptions).render();
    }

    if (userDistChartEl) {
        const distOptions = {
            series: [44, 55, 13],
            chart: { height: 250, type: 'donut' },
            labels: ['Developers', 'Clients', 'Admins'],
            colors: ['#6366f1', '#f59e0b', '#10b981'],
            legend: { position: 'bottom' },
            dataLabels: { enabled: false }
        };
        new ApexCharts(userDistChartEl, distOptions).render();
    }
};
