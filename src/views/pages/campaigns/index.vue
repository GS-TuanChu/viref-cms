<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import campaignsMixin from '@/mixins/campaigns'

export default {
  components: { Layout, PageHeader },
  page: {
    title: 'Campaigns',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  mixins: [campaignsMixin],
  data() {
    return {
      title: 'Campaigns',
      dataCampaigns: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: [],
      sortBy: 'age',
      sortDesc: false,
      isSearching: false,
      searchResults: [],
      fields: [
        {
          key: 'id',
        },
        {
          key: 'name',
        },
        {
          key: 'currency',
        },
        {
          key: 'website',
        },
        {
          key: 'network',
        },
        {
          key: 'amount',
        },
        {
          key: 'commission',
        },
        {
          key: 'product',
        },
        {
          key: 'startDate',
          // sortable: true,
        },
        {
          key: 'endDate',
          // sortable: true,
        },
        'action',
      ],
    }
  },
  middleware: 'authentication',
  computed: {
    rows() {
      return 1
    },
  },
  watch: {
    filter(newValue) {
      if (newValue.trim()) {
        this.isSearching = true
        setTimeout(async () => {
          this.searchHandler()
          clearTimeout()
        }, 1000)
      }
    },
  },
  created() {
    this.$parse.getCampaignList().then((res) => {
      this.dataCampaigns = res
    })
  },
  methods: {
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    addNewCampaign() {
      this.$router.push({ name: 'campaign-create' })
    },
    editCampaign(id) {
      this.$router.push({
        name: 'campaign-edit',
        params: { id: id },
      })
    },
    async searchHandler() {
      const searchText = this.filter.trim()
      if (searchText) {
        this.$parse.searchCampaign({ searchText }).then((res) => {
          this.isSearching = false
          this.searchResults = this.constructCampaignObject(res.campaigns)
        })
      }
      this.searchResults.splice(0, this.searchResults.length)
    },
  },
  filters: {
    truncate(text) {
      if (text) return text.slice(0, 25) + '...'
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div v-if="dataCampaigns.length == 0" class="text-center">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>

    <div v-else class="row">
      <div class="col-12">
        <div class="card">
          <div
            class="
            table table-centered
            datatable
            dt-responsive
            nowrap
            table-card-list
            dataTable
            no-footer
            dtr-inline
          "
          >
            <div class="row">
              <div class="col-sm-12 col-md-6">
                <div class="container">
                  <button
                    @click="addNewCampaign"
                    type="button"
                    class="btn btn-success mb-3"
                  >
                    <i class="mdi mdi-plus me-1"></i> Add New Campaign
                  </button>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <b-container>
                  <b-row>
                    <b-col> </b-col>
                    <b-col>
                      <div class="position-relative">
                        <b-form-input
                          autocomplete="off"
                          v-model="filter"
                          type="search"
                          placeholder="Search..."
                          class="form-control rounded bg-light border-0"
                        ></b-form-input>
                        <div
                          v-if="filter"
                          class="search-results form-control card position-absolute p-2 mt-1 overflow-auto"
                        >
                          <div v-if="isSearching" class="text-center">
                            <b-spinner
                              class="m-2"
                              variant="primary"
                              role="status"
                            ></b-spinner>
                          </div>
                          <div v-if="!isSearching && searchResults.length">
                            <template v-for="(item, index) of searchResults">
                              <div :key="index" class="search-results-item">
                                <span
                                  role="button"
                                  @click="editCampaign(item.id)"
                                >
                                  {{ item.name }}
                                </span>
                              </div>
                            </template>
                          </div>
                          <div
                            v-if="!isSearching && !searchResults.length"
                            class="text-center"
                          >
                            No Results found
                          </div>
                        </div>
                      </div>
                    </b-col>
                  </b-row>
                </b-container>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                fixed
                table-class="table table-centered datatable table-card-list"
                thead-tr-class="bg-transparent"
                :items="dataCampaigns"
                :fields="fields"
                responsive="sm"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(description)="dataCampaigns">
                  {{ dataCampaigns.item.description | truncate }}
                </template>
                <template v-slot:cell(website)="dataCampaigns">
                  <a :href="dataCampaigns.item.website" target="_blank">
                    {{ dataCampaigns.item.website | truncate }}
                  </a>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        @click="editCampaign(data.item.id)"
                        title="Edit"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <div class="dataTables_paginate paging_simple_numbers float-end">
                <ul class="pagination pagination-rounded">
                  <!-- pagination -->
                  <b-pagination
                    v-model="currentPage"
                    :total-rows="rows"
                    :per-page="perPage"
                  ></b-pagination>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>
