import { Bar, mixins } from 'vue-chartjs';

const { reactiveProp } = mixins;

export default {
    name: 'chart-bar',
    extends: Bar,
    mixins: [reactiveProp],
    props: ['options'],
    mounted() {
        this.renderChart(this.chartData, this.options);
    },
};
