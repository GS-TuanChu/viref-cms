<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import { userMethods, userComputed } from '@/state/helpers'
import usersMixin from '@/mixins/users.js'

export default {
  page: {
    title: 'User List',
  },
  components: { Layout, PageHeader },
  mixins: [usersMixin],
  data() {
    return {
      title: 'Users',
      dataUsers: [],
      totalRows: 1,
      currentPage: 1,
      prevPage: 1,
      perPage: 10,
      limit: 10,
      sortBy: 'created-at',
      sortDesc: true,
      filter: null,
      filterOn: [],
      fields: [
        {
          key: 'name',
        },
        {
          key: 'userId',
        },
        {
          key: 'email',
        },
        {
          key: 'phone',
        },
        {
          key: 'role',
        },
        'action',
      ],
      selected: null,
      searchResults: [],
      isSearching: false,
      isFetching: false,
      processPages: [],
    }
  },
  computed: {
    ...userComputed,
  },
  watch: {
    '$route.query.page': {
      handler(newValue) {
        if (this.processPages.indexOf(newValue) != -1) {
          return
        }
        this.isFetching = true
        this.processPages.push(newValue)

        this.fetchUsers({
          limit: this.limit,
          skip: newValue * this.limit - this.limit,
          page: newValue,
        }).then(() => {
          this.isFetching = false
          this.dataUsers = this.users
          this.$forceUpdate()
        })
      },
      deep: true,
    },
    currentPage(newValue) {
      this.$router
        .push({
          name: 'users',
          query: { ...this.$route.query, page: newValue },
        })
        .catch(() => {})
    },
    perPage(newValue) {
      this.$router
        .push({
          name: 'users',
          query: { ...this.$route.query, perPage: newValue },
        })
        .catch(() => {})
    },
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
    this.currentPage = this.$route.query.page || 1
    this.perPage = this.$route.query.perPage || this.perPage
  },
  mounted() {
    this.fetchUsers({
      limit: this.limit,
      skip: this.currentPage * this.limit - this.limit,
      page: this.currentPage,
    }).then(() => {
      this.dataUsers = this.users
      this.totalRows = this.total
    })
  },
  methods: {
    ...userMethods,
    addNewUser() {
      this.$router.push({
        name: 'user-create',
      })
    },
    editUser(id) {
      this.$router.push({
        name: 'user-edit',
        params: { id: id },
        query: { page: this.currentPage, perPage: this.perPage },
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
    filterHandler(userObj, searchText) {
      if (userObj[`${this.selected}`]) {
        return userObj[`${this.selected}`]
          .toLowerCase()
          .includes(searchText.toLowerCase())
      }
      return false
    },
    async searchHandler() {
      const searchText = this.filter.trim()
      if (searchText) {
        this.$parse.searchUser({ searchText }).then((res) => {
          this.isSearching = false
          this.searchResults = this.constructUserObject(res)
        })
      }
      this.searchResults.splice(0, this.searchResults.length)
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div v-if="dataUsers.length == 0" class="text-center">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4 mb-3">
              <div class="col-sm-12 col-md-6"></div>
              <!-- Search -->
              <div class="col-sm-12 col-md-6">
                <b-container>
                  <b-row>
                    <b-col></b-col>
                    <b-col>
                      <div class="position-relative">
                        <b-form-input
                          v-model="filter"
                          type="search"
                          placeholder="Search..."
                          class="form-control rounded bg-light border-0 ms-2"
                        ></b-form-input>
                        <div
                          v-if="filter"
                          class="search-results form-control card position-absolute p-2 ms-2 mt-1 overflow-auto"
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
                                <span @click="editUser(item.id)">
                                  {{ item.username }}
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
              <div v-if="isFetching" class="text-center">
                <b-spinner
                  class="m-2"
                  variant="primary"
                  role="status"
                ></b-spinner>
              </div>
              <b-table
                v-if="!isFetching"
                fixed
                show-empty
                class="table table-centered table-nowrap"
                :items="dataUsers[currentPage - 1]"
                @filtered="onFiltered"
                :fields="fields"
                :filter-function="filterHandler"
                responsive="sm"
                :per-page="perPage"
                :filter-included-fields="filterOn"
                :current-page="1"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
              >
                <template v-slot:cell(name)="data">
                  <div @click="editUser(data.item.id)" class="user">
                    <img
                      v-if="data.item.profile"
                      :src="data.item.profile"
                      alt
                      class="avatar-xs rounded-circle me-2"
                    />
                    <div
                      v-if="!data.item.profile"
                      class="avatar-xs d-inline-block me-2"
                    >
                      <div
                        class="
                        avatar-title
                        bg-soft-primary
                        rounded-circle
                        text-primary
                      "
                      >
                        <i class="mdi mdi-account-circle m-0"></i>
                      </div>
                    </div>
                    <a class="text-body">{{ data.item.username }}</a>
                  </div>
                </template>
                <template v-slot:cell(email)="data">
                  <a class="text-body">{{
                    data.item.email || data.item.username
                  }}</a>
                </template>
                <template v-slot:cell(userId)="data">
                  <a class="text-body">{{ data.item.id }}</a>
                </template>
                <template v-slot:cell(phone)="data">
                  <a class="text-body">{{ data.item.phone }}</a>
                </template>
                <template v-slot:cell(role)="data">
                  <div v-if="!data.item.roles.length">
                    <span>Guest</span>
                  </div>

                  <div v-else>
                    <template v-for="role in data.item.roles">
                      <span :key="role.id" class="text-body d-block">{{
                        role
                      }}</span>
                    </template>
                  </div>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        @click="editUser(data.item.id)"
                        title="Edit"
                      >
                        <i class="uil uil-pen font-size-18"></i>
                      </a>
                    </li>
                  </ul>
                </template>
              </b-table>
            </div>
            <div class="row">
              <div class="col">
                <div
                  class="dataTables_paginate paging_simple_numbers float-end"
                >
                  <ul class="pagination pagination-rounded mb-0">
                    <!-- pagination -->
                    <b-pagination
                      v-model="currentPage"
                      :total-rows="totalRows"
                      :per-page="perPage"
                    ></b-pagination>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<style scoped>
.user {
  cursor: pointer;
}
.search-results {
  width: 100%;
  max-height: 200px;
}
.search-results-item {
  color: grey;
}
.search-results-item:hover {
  color: black;
  cursor: pointer;
}
</style>
