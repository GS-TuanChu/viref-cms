<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'
import dateMixin from '@/mixins/date.js'

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
  mixins: [dateMixin],
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
      fields: [
        {
          key: 'check',
          label: '',
        },

        {
          key: 'name',
        },
        {
          key: 'description',
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
          key: 'type',
        },
        {
          key: 'product',
        },
        {
          key: 'mine',
        },
        {
          key: 'startDate',
          sortable: true,
        },
        {
          key: 'endDate',
          sortable: true,
        },
        'action',
      ],
    }
  },
  middleware: 'authentication',
  computed: {
    /**
     * Total no. of records
     */
    rows() {
      return 1
      // return this.orderData.length;
    },
  },
  mounted() {
    // Set the initial number of items
    // this.totalRows = this.items.length;
    this.$parse.getCampaignList().then((dataCampaigns) => {
      this.constructUserObject(dataCampaigns.campaigns)
    })
  },
  methods: {
    /**
     * Search the table data with search input
     */
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    constructUserObject(data) {
      this.dataCampaigns = data.map((campaign) => {
        return {
          id: campaign.id,
          name: campaign.get('name'),
          description: campaign.get('description'),
          website: campaign.get('website'),
          network: campaign.get('network'),
          amount: campaign.get('amount'),
          commission: campaign.get('commission'),
          type: campaign.get('type'),
          product: campaign.get('product').get('name'),
          mine: campaign.get('mine'),
          startDate: this.formatDate(campaign.get('startDate')),
          endDate: this.formatDate(campaign.get('endDate')),
        }
      })
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
  },
  filters: {
    truncate(text) {
      return text.slice(0, 25) + '...'
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div v-if="dataCampaigns.length" class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="float-end">
              <form class="d-inline-flex mb-3">
                <label class="my-1 me-2" for="order-selectinput"
                  >Campaigns</label
                >
                <select class="form-select" id="order-selectinput">
                  <option selected="">All</option>
                  <option value="1">Active</option>
                  <option value="2">Inactive</option>
                </select>
              </form>
            </div>
            <button
              @click="addNewCampaign"
              type="button"
              class="btn btn-success mb-3"
            >
              <i class="mdi mdi-plus me-1"></i> Add New Campaign
            </button>
          </div>
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
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center fw-normal">
                    Show&nbsp;
                    <b-form-select
                      v-model="perPage"
                      size="sm"
                      :options="pageOptions"
                    ></b-form-select
                    >&nbsp;entries
                  </label>
                </div>
              </div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div
                  id="tickets-table_filter"
                  class="dataTables_filter text-md-end"
                >
                  <label class="d-inline-flex align-items-center fw-normal">
                    Search:
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control form-control-sm ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                table-class="table table-centered datatable table-card-list"
                thead-tr-class="bg-transparent"
                :items="dataCampaigns"
                :fields="fields"
                responsive="sm"
                :per-page="perPage"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
                :filter="filter"
                :filter-included-fields="filterOn"
                @filtered="onFiltered"
              >
                <template v-slot:cell(description)="dataCampaigns">
                  {{ dataCampaigns.item.description | truncate }}
                </template>
                <template v-slot:cell(action)="dataCampaigns">
                  <ul class="list-inline mb-0">
                    <li
                      class="list-inline-item"
                      @click="editCampaign(dataCampaigns.item.id)"
                    >
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
                        title="Edit"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-danger"
                        v-b-tooltip.hover
                        title="Delete"
                      >
                        <i class="uil uil-trash-alt font-size-18"></i>
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

    <div v-else class="text-center">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>
  </Layout>
</template>
