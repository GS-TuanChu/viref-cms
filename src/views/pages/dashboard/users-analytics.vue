<script>
export default {
  name: 'Users',
  data() {
    return {
      chartOptions: {
        title: {
          text: 'Users',
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#333',
          },
        },
      },
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
          text: 'Users',
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
