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
      isMonth: false,
      isDay: true,
    }
  },
  props: {
    isShowOption: Boolean,
    hideFilterBtn: {
      type: Boolean,
      default: false,
    },
  },
  watch: {
    dateRange(newValue) {
      this.$emit('date', newValue)
    },
  },
  methods: {
    selectMonth(_, type) {
      if (type === 'month') {
        this.isMonth = true
        this.isDay = false
      } else {
        this.isMonth = false
        this.isDay = true
      }
      this.$emit('select', this.isMonth)
    },
  },
}
</script>

<template>
  <b-row align-h="between">
    <b-col>
      <date-picker
        v-model="dateRange"
        type="date"
        range
        placeholder="Select date range"
      >
        <template v-if="isShowOption" v-slot:footer="{ emit }">
          <div style="text-align: left">
            <button
              :class="{ active: isDay }"
              class="mx-btn mx-btn-text"
              @click="selectMonth(emit, 'day')"
            >
              Day
            </button>
            <button
              :class="{ active: isMonth }"
              class="mx-btn mx-btn-text"
              @click="selectMonth(emit, 'month')"
            >
              Month
            </button>
          </div>
        </template>
      </date-picker>
    </b-col>
    <b-col v-if="!hideFilterBtn">
      <b-button @click="$emit('submitted', dateRange, isMonth)"
        >Filter</b-button
      >
    </b-col>
  </b-row>
</template>

<style scoped>
.active {
  color: #1284e7;
}
</style>
