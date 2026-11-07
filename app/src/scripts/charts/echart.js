import * as echarts from 'echarts';

export const EChartModule = (() => {
    const isDark = () => document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
                          document.body.classList.contains('dark-theme');

    const getThemeColors = () => {
        const dark = isDark();
        return {
            text: dark ? '#94a3b8' : '#64748b',
            splitLine: dark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)',
            tooltipBg: dark ? '#1e293b' : '#0f172a',
            tooltipBorder: dark ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'
        };
    };

    const initChart = (elementId, option) => {
        const chartDom = document.getElementById(elementId);
        if (!chartDom) return null;

        // Dispose previous instance if exists
        const existing = echarts.getInstanceByDom(chartDom);
        if (existing) existing.dispose();

        const chart = echarts.init(chartDom);
        chart.setOption(option);
        return chart;
    };

    const buildConfigs = () => {
        const theme = getThemeColors();

        return {
            bar: {
                tooltip: {
                    trigger: 'axis',
                    backgroundColor: theme.tooltipBg,
                    borderColor: theme.tooltipBorder,
                    textStyle: { color: '#ffffff' }
                },
                legend: {
                    data: ['Gross Sales', 'Net Revenue', 'Net Margin'],
                    bottom: 0,
                    textStyle: { color: theme.text }
                },
                grid: { top: '10%', left: '3%', right: '4%', bottom: '15%', containLabel: true },
                xAxis: {
                    type: 'category',
                    data: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                    axisLabel: { color: theme.text },
                    axisLine: { lineStyle: { color: theme.splitLine } }
                },
                yAxis: {
                    type: 'value',
                    axisLabel: { color: theme.text },
                    splitLine: { lineStyle: { color: theme.splitLine } }
                },
                series: [
                    { name: 'Gross Sales', type: 'bar', data: [15, 28, 42, 22, 25, 34, 45, 38, 28, 52, 38, 44], itemStyle: { color: '#4059E8', borderRadius: [4, 4, 0, 0] } },
                    { name: 'Net Revenue', type: 'bar', data: [22, 36, 52, 30, 32, 44, 56, 48, 38, 62, 46, 54], itemStyle: { color: '#10B981', borderRadius: [4, 4, 0, 0] } },
                    { name: 'Net Margin', type: 'bar', data: [12, 18, 26, 16, 18, 24, 30, 25, 20, 34, 25, 30], itemStyle: { color: '#F59E0B', borderRadius: [4, 4, 0, 0] } }
                ]
            },
            traffic: (radius = '70%') => ({
                tooltip: {
                    trigger: 'item',
                    backgroundColor: theme.tooltipBg,
                    borderColor: theme.tooltipBorder,
                    textStyle: { color: '#ffffff' }
                },
                legend: {
                    bottom: 0,
                    textStyle: { color: theme.text }
                },
                series: [{
                    type: 'pie',
                    radius: radius,
                    center: ['50%', '45%'],
                    data: [
                        { value: 1240, name: 'Direct Ingress', itemStyle: { color: '#4059E8' } },
                        { value: 890, name: 'Cloud CDN', itemStyle: { color: '#10B981' } },
                        { value: 650, name: 'API Gateway', itemStyle: { color: '#06B6D4' } },
                        { value: 520, name: 'Search Web', itemStyle: { color: '#8B5CF6' } },
                        { value: 340, name: 'Partner Integrations', itemStyle: { color: '#F59E0B' } }
                    ],
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }]
            }),
            device: {
                tooltip: {
                    trigger: 'item',
                    backgroundColor: theme.tooltipBg,
                    borderColor: theme.tooltipBorder,
                    textStyle: { color: '#ffffff' }
                },
                legend: {
                    bottom: 0,
                    textStyle: { color: theme.text }
                },
                series: [{
                    name: 'Device Type',
                    type: 'pie',
                    radius: ['35%', '70%'],
                    center: ['50%', '45%'],
                    roseType: 'area',
                    itemStyle: { borderRadius: 6 },
                    data: [
                        { value: 1420, name: 'Desktop Clients', itemStyle: { color: '#4059E8' } },
                        { value: 980, name: 'Mobile Workstations', itemStyle: { color: '#10B981' } },
                        { value: 640, name: 'Tablets / Touch', itemStyle: { color: '#F59E0B' } },
                        { value: 410, name: 'Embedded Edge', itemStyle: { color: '#8B5CF6' } }
                    ]
                }]
            }
        };
    };

    return {
        initAll: () => {
            const configs = buildConfigs();
            const chartIds = {
                bar: { id: 'barChart', config: configs.bar },
                miniPie: { id: 'miniPie', config: configs.traffic(['40%', '65%']) },
                trafficPie: { id: 'trafficPie', config: configs.traffic('68%') },
                deviceArea: { id: 'deviceArea', config: configs.device }
            };

            const instances = {};

            Object.keys(chartIds).forEach(key => {
                const item = chartIds[key];
                const instance = initChart(item.id, item.config);
                if (instance) instances[key] = instance;
            });

            window.addEventListener('resize', () => {
                Object.values(instances).forEach(chart => chart && chart.resize());
            });

            return instances;
        }
    };
})();
