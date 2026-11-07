import ApexCharts from 'apexcharts';

const ApexchartManager = {
    init(elementId, options) {
        const el = document.getElementById(elementId);
        if (!el) return null;
        // Clean any existing chart instance
        el.innerHTML = '';
        const chart = new ApexCharts(el, options);
        chart.render();
        return chart;
    },

    initAll() {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
                       document.body.classList.contains('dark-theme');
        const textColor = isDark ? '#94a3b8' : '#64748b';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

        const instances = {};

        // 1. Spline Area Chart
        if (document.getElementById('apexSpline')) {
            instances.spline = this.init('apexSpline', {
                chart: {
                    type: 'area',
                    height: 350,
                    toolbar: { show: false },
                    fontFamily: 'inherit',
                    background: 'transparent'
                },
                theme: { mode: isDark ? 'dark' : 'light' },
                colors: ['#4059E8', '#10B981'],
                dataLabels: { enabled: false },
                stroke: { curve: 'smooth', width: 2.5 },
                fill: {
                    type: 'gradient',
                    gradient: {
                        shadeIntensity: 1,
                        opacityFrom: 0.35,
                        opacityTo: 0.05,
                        stops: [0, 95, 100]
                    }
                },
                series: [
                    { name: 'Direct Traffic', data: [31, 40, 28, 51, 42, 109, 100] },
                    { name: 'Organic Search', data: [11, 32, 45, 32, 34, 52, 41] }
                ],
                xaxis: {
                    categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
                    labels: { style: { colors: textColor } },
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                yaxis: {
                    labels: { style: { colors: textColor } }
                },
                grid: {
                    borderColor: gridColor,
                    strokeDashArray: 4
                },
                legend: {
                    position: 'top',
                    labels: { colors: textColor }
                }
            });
        }

        // 2. Column Bar Chart
        if (document.getElementById('apexColumn')) {
            instances.column = this.init('apexColumn', {
                chart: {
                    type: 'bar',
                    height: 350,
                    toolbar: { show: false },
                    fontFamily: 'inherit',
                    background: 'transparent'
                },
                theme: { mode: isDark ? 'dark' : 'light' },
                colors: ['#4059E8', '#F59E0B'],
                plotOptions: {
                    bar: {
                        horizontal: false,
                        columnWidth: '50%',
                        borderRadius: 6
                    }
                },
                dataLabels: { enabled: false },
                stroke: { show: true, width: 2, colors: ['transparent'] },
                series: [
                    { name: 'Net Profit ($k)', data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
                    { name: 'Operating Cost ($k)', data: [35, 41, 36, 26, 45, 48, 52, 53, 41] }
                ],
                xaxis: {
                    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'],
                    labels: { style: { colors: textColor } },
                    axisBorder: { show: false },
                    axisTicks: { show: false }
                },
                yaxis: {
                    labels: { style: { colors: textColor } }
                },
                grid: {
                    borderColor: gridColor,
                    strokeDashArray: 4
                },
                legend: {
                    position: 'top',
                    labels: { colors: textColor }
                }
            });
        }

        // 3. Donut Chart (Traffic Breakdown)
        if (document.getElementById('apexDonut')) {
            instances.donut = this.init('apexDonut', {
                chart: {
                    type: 'donut',
                    height: 350,
                    fontFamily: 'inherit',
                    background: 'transparent'
                },
                theme: { mode: isDark ? 'dark' : 'light' },
                colors: ['#4059E8', '#10B981', '#F59E0B', '#8B5CF6'],
                series: [44, 32, 14, 10],
                labels: ['Desktop (macOS/Win)', 'Mobile (iOS/Android)', 'Tablet', 'Embedded'],
                plotOptions: {
                    pie: {
                        donut: {
                            size: '72%',
                            labels: {
                                show: true,
                                total: {
                                    show: true,
                                    label: 'Total Sessions',
                                    formatter: () => '142.5k'
                                }
                            }
                        }
                    }
                },
                stroke: { width: 0 },
                legend: {
                    position: 'bottom',
                    labels: { colors: textColor }
                }
            });
        }

        // 4. Radar Chart (Capability Metrics)
        if (document.getElementById('apexRadar')) {
            instances.radar = this.init('apexRadar', {
                chart: {
                    type: 'radar',
                    height: 350,
                    toolbar: { show: false },
                    fontFamily: 'inherit',
                    background: 'transparent'
                },
                theme: { mode: isDark ? 'dark' : 'light' },
                colors: ['#4059E8'],
                series: [{
                    name: 'Performance Score',
                    data: [85, 98, 92, 88, 94, 96]
                }],
                labels: ['Throughput', 'Uptime', 'Security', 'Latency', 'Reliability', 'Scalability'],
                plotOptions: {
                    radar: {
                        polygons: {
                            strokeColors: gridColor,
                            connectorColors: gridColor
                        }
                    }
                },
                markers: { size: 4, colors: ['#4059E8'], strokeWidth: 2 },
                yaxis: { show: false }
            });
        }

        return instances;
    }
};

export default ApexchartManager;
