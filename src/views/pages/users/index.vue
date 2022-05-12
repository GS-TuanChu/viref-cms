<script>
import Layout from '../../layouts/main'
export default {
  page: {
    title: 'User List',
  },
  components: { Layout },
  data() {
    return {
      title: 'Users',
      dataUsers: [],
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [10, 25, 50, 100],
      sortBy: 'created-at',
      sortDesc: true,
      filter: null,
      filterOn: [],
      fields: [
        {
          key: 'check',
          label: '',
        },
        {
          key: 'name',
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
    }
  },
  computed: {
    rows() {
      return this.dataUsers.length
    },
  },
  mounted() {
    this.$parse.getUserList().then((dataUsers) => {
      console.log(dataUsers)
      this.constructUserObject(dataUsers)
    })
  },
  methods: {
    constructUserObject(data) {
      this.dataUsers = data.map((dataUser) => {
        return {
          id: dataUser.user.id,
          username: dataUser.user.get('username'),
          email: dataUser.user.get('email'),
          phone: dataUser.user.get('phone'),
          role: dataUser.roles,
        }
      })
    },
    addNewUser() {
      this.$router.push({
        name: 'user-create',
      })
    },
    editUser(id) {
      this.$router.push({
        name: 'user-edit',
        params: { id: id },
      })
    },
  },
}
</script>

<template>
  <Layout>
    <h2>Users</h2>
    <div v-if="dataUsers.length == 0">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>
    <div v-else class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row mt-4">
              <div class="col-sm-12 col-md-6">
                <div id="tickets-table_length" class="dataTables_length">
                  <label class="d-inline-flex align-items-center">
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
                  <label class="d-inline-flex align-items-center">
                    <b-form-input
                      v-model="filter"
                      type="search"
                      placeholder="Search..."
                      class="form-control rounded bg-light border-0 ms-2"
                    ></b-form-input>
                  </label>
                </div>
              </div>
              <!-- End search -->
            </div>
            <!-- Table -->
            <div class="table-responsive mb-0">
              <b-table
                class="table table-centered table-nowrap"
                :items="dataUsers"
                :fields="fields"
                :filter="filter"
                responsive="sm"
                :per-page="perPage"
                :filter-included-fields="filterOn"
                :current-page="currentPage"
                :sort-by.sync="sortBy"
                :sort-desc.sync="sortDesc"
              >
                <template v-slot:cell(check)="data">
                  <div class="custom-control custom-checkbox">
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
                <template v-slot:cell(name)="data">
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
                  <a href="#" class="text-body">{{ data.item.username }}</a>
                </template>
                <template v-slot:cell(phone)="data">
                  <a href="#" class="text-body">{{ data.item.phone }}</a>
                </template>
                <template v-slot:cell(role)="data">
                  <template v-for="role in data.item.role">
                    <a :key="role.id" href="#" class="text-body">{{
                      role.get('name')
                    }}</a>
                  </template>
                </template>
                <template v-slot:cell(action)="data">
                  <ul class="list-inline mb-0">
                    <li class="list-inline-item">
                      <a
                        href="javascript:void(0);"
                        class="px-2 text-primary"
                        v-b-tooltip.hover
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
    </div>
  </Layout>
</template>
