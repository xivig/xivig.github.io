/**
 * XIVIG Elite Analytics Overview Module
 * Handles high-fidelity chart rendering, period filtering, and live telemetry.
 */

import ApexCharts from 'apexcharts';

export const initAnalyticsOverview = () => {
    const growthChartEl = document.querySelector("#growthChart");
    const userDistChartEl = document.querySelector("#userDistChart");
    const velocityBarChartEl = document.querySelector("#velocityBarChart");

    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' || 
                   document.body.getAttribute('data-bs-theme') === 'dark';
    
    const textColor = isDark ? '#94A3B8' : '#64748B';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    let growthChart = null;

    // 1. Growth & Velocity Area Chart
    if (growthChartEl) {
        const datasets = {
            '7d': {
                categories: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
                data: [42, 68, 55, 84, 91, 128, 142],
                secondary: [28, 44, 38, 59, 62, 85, 96]
            },
            '30d': {
                categories: ["W1", "W2", "W3", "W4"],
                data: [310, 485, 620, 890],
                secondary: [220, 340, 430, 580]
            },
            '90d': {
                categories: ["Month 1", "Month 2", "Month 3"],
                data: [1420, 2180, 3450],
                secondary: [980, 1540, 2280]
            }
        };

        const growthOptions = {
            series: [
                { name: 'Active Velocity', data: datasets['30d'].data },
                { name: 'Target Baseline', data: datasets['30d'].secondary }
            ],
            chart: {
                height: 340,
                type: 'area',
                toolbar: { show: false },
                fontFamily: 'inherit',
                animations: { enabled: true, easing: 'easeinout', speed: 600 }
            },
            colors: ['#4F6BFF', '#10B981'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.35,
                    opacityTo: 0.05,
                    stops: [0, 90, 100]
                }
            },
            dataLabels: { enabled: false },
            stroke: { curve: 'smooth', width: [3, 2], dashArray: [0, 4] },
            grid: {
                borderColor: gridColor,
                strokeDashArray: 4,
                padding: { left: 10, right: 10 }
            },
            xaxis: {
                categories: datasets['30d'].categories,
                labels: { style: { colors: textColor, fontSize: '12px' } },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                labels: {
                    style: { colors: textColor, fontSize: '12px' },
                    formatter: (val) => val >= 1000 ? `${(val / 1000).toFixed(1)}k` : val
                }
            },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: { formatter: (val) => `${val} points` }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                labels: { colors: textColor }
            }
        };

        growthChart = new ApexCharts(growthChartEl, growthOptions);
        growthChart.render();

        // Connect Dropdown Period Selector
        document.querySelectorAll('.growth-period-select').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const period = btn.dataset.period || '30d';
                const label = btn.textContent.trim();
                const dropdownBtn = document.getElementById('growthPeriodDropdown');
                if (dropdownBtn) dropdownBtn.textContent = label;

                if (datasets[period] && growthChart) {
                    growthChart.updateOptions({
                        xaxis: { categories: datasets[period].categories }
                    });
                    growthChart.updateSeries([
                        { name: 'Active Velocity', data: datasets[period].data },
                        { name: 'Target Baseline', data: datasets[period].secondary }
                    ]);
                }
            });
        });
    }

    // 2. Global Regional Distribution Donut Chart
    if (userDistChartEl) {
        const distOptions = {
            series: [58, 27, 15],
            chart: {
                height: 270,
                type: 'donut',
                fontFamily: 'inherit'
            },
            labels: ['Enterprise Architects', 'Full-Stack Developers', 'Systems Admins'],
            colors: ['#4F6BFF', '#20C5D7', '#8B5CF6'],
            legend: {
                position: 'bottom',
                fontSize: '12px',
                labels: { colors: textColor },
                markers: { radius: 12 }
            },
            stroke: {
                width: 2,
                colors: [isDark ? '#111C2E' : '#FFFFFF']
            },
            plotOptions: {
                pie: {
                    donut: {
                        size: '72%',
                        labels: {
                            show: true,
                            total: {
                                show: true,
                                label: 'Total Users',
                                fontSize: '13px',
                                color: textColor,
                                formatter: () => '142k'
                            },
                            value: {
                                fontSize: '24px',
                                fontWeight: 800,
                                color: isDark ? '#FFFFFF' : '#111827'
                            }
                        }
                    }
                }
            },
            dataLabels: { enabled: false },
            tooltip: {
                theme: isDark ? 'dark' : 'light',
                y: { formatter: (val) => `${val}% of network` }
            }
        };

        new ApexCharts(userDistChartEl, distOptions).render();
    }

    // 3. Optional Velocity Horizontal Bar Chart
    if (velocityBarChartEl) {
        const barOptions = {
            series: [{
                name: 'Deployments',
                data: [92, 78, 64, 49, 38]
            }],
            chart: {
                type: 'bar',
                height: 220,
                toolbar: { show: false },
                fontFamily: 'inherit'
            },
            plotOptions: {
                bar: {
                    horizontal: true,
                    borderRadius: 6,
                    barHeight: '55%'
                }
            },
            colors: ['#4F6BFF'],
            dataLabels: { enabled: false },
            xaxis: {
                categories: ['Cloud Run', 'Edge CDN', 'Kubernetes', 'Storage S3', 'Postgres'],
                labels: { style: { colors: textColor } }
            },
            yaxis: {
                labels: { style: { colors: textColor } }
            },
            grid: { borderColor: gridColor }
        };
        new ApexCharts(velocityBarChartEl, barOptions).render();
    }
};
