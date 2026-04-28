import ApexCharts from 'apexcharts';

export const initDashboard = () => {
    if (!document.getElementById('activities-chart')) return;

    // 1. Hospital Activities (Polished Line Chart)
    const activitiesOptions = {
        series: [{
            name: 'Patients',
            data: [15, 12, 14, 18, 22, 25, 24, 25, 22, 20, 25, 30]
        }, {
            name: 'Consultations',
            data: [18, 14, 13, 16, 18, 21, 28, 21, 25, 21, 27, 25]
        }],
        chart: {
            height: 330,
            type: 'line',
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 8,
                left: 0,
                blur: 3,
                color: '#000',
                opacity: 0.1
            },
            zoom: {
                enabled: false
            }
        },
        colors: ['#f56767', '#265ed7'],
        stroke: {
            curve: 'smooth',
            width: 3
        },
        markers: {
            size: 0,
            strokeColors: '#fff',
            strokeWidth: 2,
            hover: {
                size: 6
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
                    colors: '#94a3b8',
                    fontSize: '12px'
                }
            }
        },
        yaxis: {
            min: 0,
            max: 35,
            labels: {
                style: {
                    colors: '#94a3b8',
                    fontSize: '12px'
                }
            }
        },
        legend: {
            position: 'top',
            horizontalAlign: 'right',
            offsetY: -5,
            fontSize: '13px',
            markers: {
                radius: 12,
                width: 10,
                height: 10
            }
        },
        grid: {
            borderColor: '#f1f5f9',
            strokeDashArray: 4,
            padding: {
                right: 20,
                left: 10,
                top: 0,
                bottom: 0
            },
            xaxis: {
                lines: {
                    show: true
                }
            }
        },
        tooltip: {
            shared: true,
            intersect: false,
            y: {
                formatter: (y) => y + " cases"
            }
        }
    };
    new ApexCharts(document.querySelector("#activities-chart"), activitiesOptions).render();

    // 2. Appointment Mini Chart
    const appointmentOptions = {
        series: [{
            data: [25, 66, 41, 89, 63, 25, 44, 12, 36, 9, 54]
        }],
        chart: {
            type: 'bar',
            width: 100,
            height: 60,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
                borderRadius: 2,
                colors: {
                    ranges: [{
                        from: 0,
                        to: 100,
                        color: '#f56767'
                    }]
                }
            }
        },
        colors: ['#ffffff'],
        tooltip: {
            enabled: false
        }
    };
    new ApexCharts(document.querySelector("#appointment-chart"), appointmentOptions).render();

    // 3. Surgery Mini Chart
    const surgeryOptions = {
        series: [{
            data: [12, 14, 2, 47, 42, 15, 47, 75, 65, 19, 14]
        }],
        chart: {
            type: 'bar',
            width: 100,
            height: 60,
            sparkline: {
                enabled: true
            }
        },
        plotOptions: {
            bar: {
                columnWidth: '80%',
                borderRadius: 2
            }
        },
        colors: ['#ffffff'],
        tooltip: {
            enabled: false
        }
    };
    new ApexCharts(document.querySelector("#surgery-chart"), surgeryOptions).render();

    // 4. Diseases Report (Enhanced Radial Bar)
    const diseasesOptions = {
        series: [44, 55, 67, 83],
        chart: {
            height: 350,
            type: 'radialBar',
            // Ensure no internal spacing is forcing the chart out
            sparkline: {
                enabled: false
            },
            toolbar: {
                show: false
            },
            animations: {
                enabled: true
            }
        },
        plotOptions: {
            radialBar: {
                // FIX 1: This is the magic key. 
                // It shrinks the chart to 85% of the container, 
                // giving the 'round' caps room to breathe.
                customScale: 0.85,

                // FIX 2: Reset these to 0 to keep it perfectly centered
                offsetY: 0,
                offsetX: 0,

                hollow: {
                    size: '45%'
                },
                track: {
                    margin: 10, // Increased margin prevents rings from touching
                    background: '#f1f5f9',
                    strokeWidth: '97%',
                },
                dataLabels: {
                    name: {
                        show: true,
                        fontSize: '14px',
                        fontWeight: 600,
                        color: '#64748b',
                        offsetY: -10
                    },
                    value: {
                        show: true,
                        fontSize: '24px',
                        fontWeight: 700,
                        color: '#1e293b',
                        offsetY: 5,
                        formatter: function (val) {
                            return val + '%'
                        }
                    },
                    total: {
                        show: true,
                        label: 'Total',
                        fontSize: '14px',
                        color: '#64748b',
                        // Using a dynamic calculation if preferred, or your static 260
                        formatter: function (w) {
                            return '260'
                        }
                    }
                }
            }
        },
        colors: ['#265ed7', '#f59e0b', '#f56767', '#1e293b'],
        labels: ['Typhoid', 'Pneumonia', 'Diabetes', 'Malaria'],
        stroke: {
            lineCap: 'round'
        }
    };
    new ApexCharts(document.querySelector("#diseases-chart"), diseasesOptions).render();
};