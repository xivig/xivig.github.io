import Highcharts from 'highcharts';
import HighchartsExporting from 'highcharts/modules/exporting';

// Initialize exporting module
if (typeof HighchartsExporting === 'function') {
    HighchartsExporting(Highcharts);
} else if (HighchartsExporting && typeof HighchartsExporting.default === 'function') {
    HighchartsExporting.default(Highcharts);
}

const HighchartManager = {
    init(elementId, options) {
        const el = document.getElementById(elementId);
        if (!el) return null;
        return Highcharts.chart(elementId, options);
    },

    initAll() {
        const isDark = document.documentElement.getAttribute('data-bs-theme') === 'dark' ||
                       document.body.classList.contains('dark-theme');
        const textColor = isDark ? '#94a3b8' : '#64748b';
        const gridColor = isDark ? 'rgba(255, 255, 255, 0.06)' : 'rgba(0, 0, 0, 0.06)';

        const instances = {};

        // 1. Line Chart
        if (document.getElementById('highchartLine')) {
            instances.line = this.init('highchartLine', {
                chart: {
                    type: 'spline',
                    backgroundColor: 'transparent',
                    style: { fontFamily: 'inherit' }
                },
                title: {
                    text: 'Cluster Throughput Comparison',
                    style: { color: isDark ? '#ffffff' : '#0f172a', fontWeight: 'bold' }
                },
                subtitle: {
                    text: 'Average operations / sec across primary edge regions',
                    style: { color: textColor }
                },
                xAxis: {
                    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
                    labels: { style: { color: textColor } },
                    gridLineColor: gridColor,
                    lineColor: gridColor
                },
                yAxis: {
                    title: { text: 'Throughput (k req/s)', style: { color: textColor } },
                    labels: { style: { color: textColor } },
                    gridLineColor: gridColor
                },
                legend: {
                    itemStyle: { color: textColor }
                },
                colors: ['#4059E8', '#10B981', '#F59E0B'],
                series: [
                    { name: 'us-east-1 (N. Virginia)', data: [18.2, 22.4, 25.1, 28.6, 32.4, 38.5, 42.1] },
                    { name: 'eu-west-1 (Ireland)', data: [14.5, 17.2, 19.8, 22.1, 25.4, 29.8, 33.2] },
                    { name: 'ap-northeast-1 (Tokyo)', data: [9.8, 12.5, 14.2, 16.8, 19.4, 23.1, 26.5] }
                ],
                credits: { enabled: false }
            });
        }

        // 2. Area Chart
        if (document.getElementById('highchartArea')) {
            instances.area = this.init('highchartArea', {
                chart: {
                    type: 'areaspline',
                    backgroundColor: 'transparent',
                    style: { fontFamily: 'inherit' }
                },
                title: {
                    text: 'Cumulative Cloud Compute Spend',
                    style: { color: isDark ? '#ffffff' : '#0f172a', fontWeight: 'bold' }
                },
                subtitle: {
                    text: 'Monthly compute and storage bandwidth consumption',
                    style: { color: textColor }
                },
                xAxis: {
                    categories: ['Q1-Jan', 'Q1-Feb', 'Q1-Mar', 'Q2-Apr', 'Q2-May', 'Q2-Jun'],
                    labels: { style: { color: textColor } },
                    gridLineColor: gridColor,
                    lineColor: gridColor
                },
                yAxis: {
                    title: { text: 'Spend ($ USD)', style: { color: textColor } },
                    labels: { style: { color: textColor } },
                    gridLineColor: gridColor
                },
                legend: {
                    itemStyle: { color: textColor }
                },
                colors: ['#4059E8', '#8B5CF6'],
                plotOptions: {
                    areaspline: {
                        fillOpacity: 0.25
                    }
                },
                series: [
                    { name: 'Serverless Invocations', data: [4200, 5800, 6900, 8400, 9900, 12400] },
                    { name: 'Edge CDN Bandwidth', data: [2100, 2900, 3400, 4100, 4800, 5900] }
                ],
                credits: { enabled: false }
            });
        }

        return instances;
    }
};

export default HighchartManager;
