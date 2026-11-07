import ApexCharts from 'apexcharts';

export const initDashboard = () => {
    // 1. Architecture Activity & Compute Throughput (Luminous Indigo & Restrained Teal)
    const activitiesEl = document.getElementById('activities-chart');
    if (activitiesEl) {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';
        const activitiesOptions = {
            series: [{
                name: 'Throughput (kTPS)',
                data: [18, 22, 19, 28, 35, 42, 38, 45, 40, 48, 52, 60]
            }, {
                name: 'API Requests (M)',
                data: [14, 17, 22, 25, 29, 33, 30, 37, 34, 41, 46, 54]
            }],
            chart: {
                height: 330,
                type: 'area',
                toolbar: {
                    show: false
                },
                zoom: {
                    enabled: false
                }
            },
            colors: ['#4059E8', '#20C5D7'],
            fill: {
                type: 'gradient',
                gradient: {
                    shadeIntensity: 1,
                    opacityFrom: 0.25,
                    opacityTo: 0.02,
                    stops: [0, 95, 100]
                }
            },
            stroke: {
                curve: 'smooth',
                width: 2.5
            },
            markers: {
                size: 0,
                strokeColors: '#fff',
                strokeWidth: 2,
                hover: {
                    size: 5
                }
            },
            xaxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                axisBorder: {
                    show: false
                },
                axisTicks: {
                    show: false
                },
                labels: {
                    style: {
                        colors: '#667085',
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                    }
                }
            },
            yaxis: {
                min: 0,
                max: 70,
                labels: {
                    style: {
                        colors: '#667085',
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 500
                    }
                }
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                offsetY: -5,
                fontSize: '13px',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                labels: {
                    colors: isDark ? '#94A3B8' : '#667085'
                },
                markers: {
                    radius: 4,
                    width: 10,
                    height: 10
                }
            },
            grid: {
                borderColor: isDark ? '#26344A' : '#E5EAF2',
                strokeDashArray: 4,
                padding: {
                    right: 20,
                    left: 10,
                    top: 0,
                    bottom: 0
                },
                xaxis: {
                    lines: {
                        show: false
                    }
                }
            },
            tooltip: {
                shared: true,
                intersect: false,
                theme: isDark ? 'dark' : 'light'
            }
        };
        new ApexCharts(activitiesEl, activitiesOptions).render();
    }

    // 2. Deployment Mini Sparkline
    const deployEl = document.querySelector("#deployment-chart");
    if (deployEl) {
        const deploymentOptions = {
            series: [{
                data: [25, 45, 41, 69, 53, 35, 64, 42, 56, 39, 75]
            }],
            chart: {
                type: 'bar',
                width: 100,
                height: 56,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    borderRadius: 3
                }
            },
            colors: ['#4059E8'],
            tooltip: {
                enabled: false
            }
        };
        new ApexCharts(deployEl, deploymentOptions).render();
    }

    // 3. Concurrent Sessions Sparkline
    const surgeryEl = document.querySelector("#surgery-chart");
    if (surgeryEl) {
        const surgeryOptions = {
            series: [{
                data: [32, 44, 38, 57, 52, 45, 67, 75, 65, 59, 84]
            }],
            chart: {
                type: 'bar',
                width: 100,
                height: 56,
                sparkline: {
                    enabled: true
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '70%',
                    borderRadius: 3
                }
            },
            colors: ['#20C5D7'],
            tooltip: {
                enabled: false
            }
        };
        new ApexCharts(surgeryEl, surgeryOptions).render();
    }

    // 4. Real-Time System Health Telemetry (Multi Radial Bar)
    renderHealthChart();
};

let healthChartInstance = null;

function renderHealthChart() {
    const healthChartEl = document.querySelector("#health-chart");
    if (!healthChartEl) return;

    const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark';

    const healthOptions = {
        series: [44, 72, 14, 99],
        chart: {
            type: 'radialBar',
            height: 320,
            width: '100%',
            parentHeightOffset: 0,
            redrawOnParentResize: true,
            redrawOnWindowResize: true,
            toolbar: {
                show: false
            }
        },
        plotOptions: {
            radialBar: {
                customScale: 0.92,
                offsetX: 0,
                offsetY: 0,
                hollow: {
                    size: '42%'
                },
                track: {
                    margin: 8,
                    background: isDark ? 'rgba(255, 255, 255, 0.05)' : '#F1F5F9',
                    strokeWidth: '95%'
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '12px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 600,
                        color: '#667085',
                        offsetY: -8
                    },
                    value: {
                        show: true,
                        fontSize: '22px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 800,
                        color: isDark ? '#F2F5FA' : '#111827',
                        offsetY: 4,
                        formatter: (val) => val + '%'
                    },
                    total: {
                        show: true,
                        label: 'Cluster SLA',
                        fontSize: '11px',
                        fontFamily: 'Inter, sans-serif',
                        fontWeight: 700,
                        color: '#087B55',
                        formatter: () => '99.99%'
                    }
                }
            }
        },
        colors: ['#4059E8', '#20C5D7', '#EF4444', '#10B981'],
        labels: ['CPU Load', 'Memory', 'Error Rate', 'Cluster SLA'],
        stroke: {
            lineCap: 'round'
        }
    };

    if (healthChartInstance) healthChartInstance.destroy();
    healthChartInstance = new ApexCharts(healthChartEl, healthOptions);
    healthChartInstance.render();

    setTimeout(() => {
        window.dispatchEvent(new Event('resize'));
    }, 150);
}

// Auto init when loaded
if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initDashboard);
} else {
    initDashboard();
}
