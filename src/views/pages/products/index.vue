<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'

export default {
  components: { Layout, PageHeader },
  page: {
    title: 'Products',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  data() {
    return {
      title: 'Products',
      dataProducts: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      filter: null,
      filterOn: ['name', 'price', 'contact', 'description'],
      sortBy: 'age',
      sortDesc: false,
      fields: [
        {
          key: 'id',
        },
        {
          key: 'name',
        },
        {
          key: 'price',
        },
        {
          key: 'contact',
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
  mounted() {
    // Set the initial number of items
    this.$parse.getProductList().then((dataProducts) => {
      this.constructUserObject(dataProducts.products)
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
      this.dataProducts = data.map((product) => {
        return {
          id: product.id,
          name: product.get('name'),
          description: product.get('description'),
          price: product.get('price'),
          contact: product.get('contact'),
        }
      })
    },
    addNewProduct() {
      this.$router.push({
        name: 'product-create',
      })
    },
    editProduct(id) {
      this.$router.push({
        name: 'product-edit',
        params: { id: id },
      })
    },
    productDeleteHandler(pid) {
      this.$parse.deleteProduct({ pid }).then(() => {
        location.reload(true)
      })
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div v-if="dataProducts.length === 0" class="text-center">
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
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <div class="container">
                  <button
                    @click="addNewProduct"
                    type="button"
                    class="btn btn-success mb-3"
                  >
                    <i class="mdi mdi-plus me-1"></i> Add New Product
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

            <b-table
              table-class="table table-centered datatable table-card-list"
              thead-tr-class="bg-transparent"
              :items="dataProducts"
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
              <template v-slot:cell(check)="data">
                <div class="custom-control custom-checkbox text-center">
                  <input
                    type="checkbox"
                    class="custom-control-input"
                    :id="`contacusercheck${data.item.id}`"
                  />
                  <label
                    class="custom-control-label"
                    :for="`contacusercheck${data.item.id}`"
                  ></label>
                </div>
              </template>
              <template v-slot:cell(action)="data">
                <ul class="list-inline mb-0">
                  <li class="list-inline-item">
                    <a
                      href="javascript:void(0);"
                      class="px-2 text-primary"
                      v-b-tooltip.hover
                      @click="editProduct(data.item.id)"
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
  </Layout>
</template>
