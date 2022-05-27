<script>
export default {
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    meta: {
      type: Object,
    },
  },
  data() {
    return {
      transactions: [],
      logs: [],
      address: '',
      fromDate: null,
      toDate: null,
      perPage: 10,
      sortDesc: true,
      currentPage: 1,
      isGetHistory: false,
      filter: null,
      filterOn: [],
      sortBy: 'time',
      isSearching: false,
    }
  },
  methods: {
    searchHandler() {}
  },
  filters: {
    formatTime(time) {
      return new Date(time).toDateString('en-gb')
    },
  },
}
</script>

<template>
  <div>
    <b-form-group
      class="mb-3"
      label-cols-sm="2"
      label-cols-lg="1"
      label="User"
      label-for="user"
    >
      <b-form-input
        class="d-inline w-30"
        v-model="address"
        for="text"
        placeholder="Enter username"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      class="mb-3"
      label-cols-sm="2"
      label-cols-lg="1"
      label="Campaign"
      label-for="campaign"
    >
      <b-form-input
        class="d-inline w-30"
        v-model="address"
        for="text"
        placeholder="Enter campaign"
      ></b-form-input>
    </b-form-group>
    <b-button v-if="!isSearching" @click="searchHandler" variant="primary"
      >Search</b-button
    >
    <div v-if="data.length > 0" class="card mt-3">
      <div class="table-responsive mb-0">
        <p>Username: {{ meta.username }}</p>
        <p>Campaign: {{ meta.campaign }}</p>
        <b-table
          class="table table-centered table-nowrap"
          :items="data"
          responsive="sm"
        >
          <template v-slot:cell(createdAt)="data">
            <div class="custom-control">
              {{ data.item.createdAt | formatTime }}
            </div>
          </template>
        </b-table>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
