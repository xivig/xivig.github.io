import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

const ChartManager = (() => {
    const isDark = () => document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
                          document.body.classList.contains('dark-theme');

    const getColors = () => {
        const dark = isDark();
        return {
            text: dark ? '#94a3b8' : '#64748b',
            grid: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)'
        };
    };

    const createChart = (id, config) => {
        const canvas = document.getElementById(id);
        if (!canvas) return null;

        const existing = Chart.getChart(canvas);
        if (existing) existing.destroy();

        const themeColors = getColors();

        const defaultOptions = {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: { color: themeColors.text, font: { family: 'inherit', size: 12 } }
                },
                tooltip: {
                    backgroundColor: isDark() ? '#1e293b' : '#0f172a',
                    titleColor: '#ffffff',
                    bodyColor: '#e2e8f0',
                    padding: 10,
                    cornerRadius: 8
                }
            },
            scales: {
                x: {
                    grid: { color: themeColors.grid },
                    ticks: { color: themeColors.text }
                },
                y: {
                    grid: { color: themeColors.grid },
                    ticks: { color: themeColors.text }
                }
            },
            animation: { duration: 800 }
        };

        // Merge custom options
        const mergedOptions = {
            ...defaultOptions,
            ...config.options,
            plugins: { ...defaultOptions.plugins, ...(config.options?.plugins || {}) },
            scales: config.options?.scales ? { ...defaultOptions.scales, ...config.options.scales } : defaultOptions.scales
        };

        return new Chart(canvas, {
            type: config.type,
            data: config.data,
            options: mergedOptions
        });
    };

    return {
        initAll: () => {
            // 1. Vertical Bar
            createChart('verticalBar', {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'Gross Sales ($k)',
                        data: [28, 45, 36, 62, 54, 78],
                        backgroundColor: '#4059E8',
                        borderRadius: 6
                    }]
                }
            });

            // 2. Horizontal Bar
            createChart('horizontalBar', {
                type: 'bar',
                options: { indexAxis: 'y' },
                data: {
                    labels: ['Platform Eng', 'AI Inference', 'Cloud Edge', 'Security', 'SRE'],
                    datasets: [{
                        label: 'Budget Allocated ($k)',
                        data: [140, 185, 110, 95, 130],
                        backgroundColor: '#10B981',
                        borderRadius: 6
                    }]
                }
            });

            // 3. Grouped Bar
            createChart('groupedBar', {
                type: 'bar',
                data: {
                    labels: ['Q1', 'Q2', 'Q3', 'Q4'],
                    datasets: [
                        { label: 'FY2025 Targets', data: [45, 60, 55, 80], backgroundColor: 'rgba(64, 89, 232, 0.4)', borderRadius: 6 },
                        { label: 'FY2026 Actuals', data: [58, 82, 74, 98], backgroundColor: '#4059E8', borderRadius: 6 }
                    ]
                }
            });

            // 4. Stacked Bar
            createChart('stackedBar', {
                type: 'bar',
                options: {
                    scales: {
                        x: { stacked: true },
                        y: { stacked: true }
                    }
                },
                data: {
                    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
                    datasets: [
                        { label: 'Direct Edge', data: [18, 24, 15, 29, 35, 20], backgroundColor: '#4059E8', borderRadius: 4 },
                        { label: 'CDN Cache', data: [28, 35, 30, 42, 48, 32], backgroundColor: '#06B6D4', borderRadius: 4 },
                        { label: 'Gateway API', data: [12, 18, 14, 20, 22, 15], backgroundColor: '#F59E0B', borderRadius: 4 }
                    ]
                }
            });

            // 5. Line Chart
            createChart('lineChart', {
                type: 'line',
                data: {
                    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6'],
                    datasets: [{
                        label: 'Active Architects',
                        data: [18, 34, 28, 56, 48, 72],
                        borderColor: '#8B5CF6',
                        backgroundColor: '#8B5CF6',
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4
                    }]
                }
            });

            // 6. Area Chart
            createChart('areaChart', {
                type: 'line',
                data: {
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
                    datasets: [{
                        label: 'ARR Acceleration ($k)',
                        data: [25, 42, 38, 65, 78, 105],
                        borderColor: '#4059E8',
                        backgroundColor: 'rgba(64, 89, 232, 0.15)',
                        fill: true,
                        tension: 0.4,
                        borderWidth: 3,
                        pointRadius: 4
                    }]
                }
            });
        }
    };
})();

export default ChartManager;
