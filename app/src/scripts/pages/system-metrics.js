/**
 * System Metrics Module - Elite Performance Telemetry
 * Handles real-time system monitoring charts with smooth streaming.
 */

import ApexCharts from 'apexcharts';

export const initSystemMetrics = () => {
    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
                   document.body.classList.contains('dark-theme');
    const textColor = isDark ? '#94a3b8' : '#64748b';
    const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

    const cpuEl = document.querySelector("#cpuChart");
    const ramEl = document.querySelector("#ramChart");
    const netEl = document.querySelector("#netChart");
    const diskEl = document.querySelector("#diskChart");
    const realtimeEl = document.querySelector("#realtimeChart");

    // Helper for RadialBar
    const createRadial = (el, val, color) => {
        if (!el) return null;
        el.innerHTML = '';
        const chart = new ApexCharts(el, {
            series: [val],
            chart: { height: 160, type: 'radialBar', sparkline: { enabled: true } },
            colors: [color],
            plotOptions: {
                radialBar: {
                    hollow: { size: '62%' },
                    track: { background: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)' },
                    dataLabels: {
                        name: { show: false },
                        value: {
                            offsetY: 6,
                            fontSize: '18px',
                            fontWeight: '800',
                            color: isDark ? '#ffffff' : '#0f172a',
                            formatter: (v) => `${v}%`
                        }
                    }
                }
            }
        });
        chart.render();
        return chart;
    };

    createRadial(cpuEl, 24.5, '#4F6BFF');
    createRadial(ramEl, 38, '#F59E0B');
    createRadial(netEl, 12, '#10B981');
    createRadial(diskEl, 46, '#8B5CF6');

    // Real-time Stream
    if (realtimeEl) {
        realtimeEl.innerHTML = '';
        let lastDate = Date.now() - 30000;
        let data = [];

        for (let i = 0; i < 30; i++) {
            data.push({
                x: lastDate + i * 1000,
                y: Math.floor(Math.random() * 30) + 20
            });
        }
        lastDate = data[data.length - 1].x;

        const realtimeOptions = {
            series: [{ name: 'Network Throughput (MB/s)', data: data }],
            chart: {
                id: 'realtime',
                height: 340,
                type: 'area',
                toolbar: { show: false },
                animations: {
                    enabled: true,
                    easing: 'linear',
                    dynamicAnimation: { speed: 1000 }
                },
                background: 'transparent',
                fontFamily: 'inherit'
            },
            colors: ['#4F6BFF'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.35,
                    opacityTo: 0.05,
                    stops: [0, 95, 100]
                }
            },
            stroke: { curve: 'smooth', width: 2.5 },
            dataLabels: { enabled: false },
            xaxis: {
                type: 'datetime',
                range: 25000,
                labels: {
                    style: { colors: textColor },
                    format: 'HH:mm:ss'
                },
                axisBorder: { show: false },
                axisTicks: { show: false }
            },
            yaxis: {
                max: 100,
                min: 0,
                labels: { style: { colors: textColor } }
            },
            grid: {
                borderColor: gridColor,
                strokeDashArray: 4
            },
            legend: { show: false }
        };

        const chart = new ApexCharts(realtimeEl, realtimeOptions);
        chart.render();

        const timer = window.setInterval(() => {
            if (!document.querySelector("#realtimeChart")) {
                clearInterval(timer);
                return;
            }
            lastDate += 1000;
            const newY = Math.floor(Math.random() * 35) + 20;
            data.push({ x: lastDate, y: newY });
            if (data.length > 60) data.shift();
            chart.updateSeries([{ data: data }]);
        }, 1000);
    }
};
