
<script>
export default {
  name: 'Campaigns',
  data() {
    return {
      chartOptions: {},
      chartData: [],
    }
  },
  props: {
    dataObject: Object,
  },
  watch: {
    dataObject(newValue) {
      const data = newValue
      const chartData = [
        {
          data: data.counts,
        },
      ]
      this.chartData = [...chartData]
      this.chartOptions = {
        fill: {
          colors: ['#E91E63', '#9C27B0'],
        },
        plotOptions: {
          bar: {
            columnWidth: '30%',
            dataLabels: {
              position: 'top',
            },
          },
          dataLabels: {
            enabled: true,
            style: {
              colors: ['#333'],
            },
            offsetY: -20,
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          text: 'Campaigns',
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#333',
          },
        },
        labels: data.dates,
        width: '200px',
        /*
         * tooltip: {
         *   #<{(| eslint-disable no-unused-vars|)}>#
         *   custom({ series, seriesIndex, dataPointIndex, w }) {
         *     return (
         *       '<div class="p-2">' +
         *       'amount' +
         *       ': ' +
         *       data.amounts[dataPointIndex] +
         *       '</div>'
         *     )
         *   },
         *   #<{(| eslint-disable no-unused-vars|)}>#
         * },
         */
      }
    },
  },
}
</script>

<template>
  <apexchart
    class="apex-charts"
    height="350"
    type="bar"
    dir="ltr"
    :series="chartData"
    :options="chartOptions"
  ></apexchart>
</template>
