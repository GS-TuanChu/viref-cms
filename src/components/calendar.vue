<script>
import DatePicker from 'vue2-datepicker'
import 'vue2-datepicker/index.css'

const toDate = new Date(Date.now())
const fromDate = new Date(toDate)
fromDate.setDate(fromDate.getDate() - 7)

export default {
  components: { DatePicker },
  data() {
    return {
      dateRange: [fromDate, toDate],
    }
  },
  watch: {
    dateRange(newValue) {
      this.$emit('date', newValue)
    },
  },
}
</script>

<template>
  <div>
    <div class="row">
      <div class="col-md-2">
        <date-picker
          v-model="dateRange"
          type="date"
          range
          placeholder="Select date range"
        ></date-picker>
      </div>
      <div class="col-md-2">
        <b-button @click="$emit('submitted', dateRange)">Filter</b-button>
      </div>
    </div>
  </div>
</template>
