<script>
export default {
  name: 'Transactions',
  data() {
    return {
      chartOptions: {},
      chartData: [],
    }
  },
  props: {
    dataObject: Object,
    isMonth: Boolean,
  },
  watch: {
    isMonth: {
      immediate: true,
      handler() {
        if (Object.keys(this.dataObject).length) {
          if (this.isMonth) {
            this.chartOptions = {
              ...this.chartOptions,
              labels: this.dataObject.months,
            }
            const chartData = [
              {
                data: this.dataObject.monthCounts,
              },
            ]
            this.chartData = [...chartData]
          } else {
            this.chartOptions = {
              ...this.chartOptions,
              labels: this.dataObject.dates,
            }
            const chartData = [
              {
                data: this.dataObject.counts,
              },
            ]
            this.chartData = [...chartData]
          }
        }
      },
    },
    dataObject(newValue) {
      const data = newValue
      const chartData = [
        {
          data: this.isMonth ? data.monthCounts : data.counts,
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
          text: 'Transactions',
          align: 'center',
          style: {
            fontSize: '16px',
            fontWeight: 'bold',
            fontFamily: undefined,
            color: '#333',
          },
        },
        labels: this.isMonth ? data.months : data.dates,
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
