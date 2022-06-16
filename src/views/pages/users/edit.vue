<script>
import Swal from 'sweetalert2'
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import { userMethods, userComputed } from '@/state/helpers'

export default {
  components: { Layout, PageHeader },
  page: {
    title: 'User Edit',
  },
  data() {
    return {
      title: 'User Edit',
      params: {},
      selected: [],
      selectedOldValue: [],
      amount: 0,
      isSubmitting: false,
      roles: ['admin', 'server', 'marketing', 'customer_support'],
      query: {},
      clonedParams: {},
      isRoleChanged: false,
      isDisabled: true,
    }
  },

  computed: {
    ...userComputed,
  },

  created() {
    this.query = this.$route.query
    const userInfo = this.user(this.$route.params.id)
    if (userInfo) {
      this.params = userInfo
      this.watchHandler()
      if (this.params.roles.length) this.selected = this.params.roles
      return
    }
    this.$parse.getUserDetail(this.$route.params.id).then((dataUser) => {
      this.constructUserObject([dataUser])
      this.selected = [...this.params.roles]
      this.watchHandler()
    })
  },
  methods: {
    ...userMethods,
    successmsg() {
      Swal.fire('Done!', 'Data has been saved', 'success')
    },
    watchHandler() {
      const watchParams = [
        'params.phone',
        'params.username',
        'params.email',
        'params.bankAccount',
        'amount',
        'params.balanceToken',
        'selected',
      ]
      watchParams.forEach((p) => {
        this.$watch(p, () => {
          if (p === 'selected') this.isRoleChanged = true
          this.isDisabled = false
        })
      })
    },
    constructUserObject(data) {
      this.params = data.map((dataUser) => {
        return {
          id: dataUser.user.id,
          username: dataUser.user.get('username'),
          email: dataUser.user.get('email'),
          phone: dataUser.user.get('phone'),
          roles: dataUser.roles,
          bankAccount: dataUser.user.get('bankAccount') || '0',
          balance: dataUser.user.get('balance') || 0,
          balanceToken: dataUser.user.get('balanceToken') || 0,
        }
      })[0]
    },
    async submit() {
      try {
        this.isSubmitting = true
        let param = null
        if (this.isRoleChanged) {
          const promises = []
          const removeRoles = this.roles.filter((r) => {
            return this.selected.indexOf(r) === -1
          })
          removeRoles.forEach((r) => {
            param = {
              id: this.params.id,
              role: r,
              operation: 'remove',
            }
            promises.push(this.$parse.userRoleEdit(param))
          })
          this.selected.forEach((r) => {
            param = {
              id: this.params.id,
              role: r,
              operation: 'add',
            }
            promises.push(this.$parse.userRoleEdit(param))
          })
          Promise.allSettled(promises)
        }
        this.params.amount = this.amount
        this.params.roles = this.selected
        this.$parse.editUser(this.params).then(({ id }) => {
          if (id) {
            const payload = { id, params: this.params }
            this.updateUser(payload)
            this.isSubmitting = false
            this.$router.go()
          }
        })
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.$router.push({
        name: 'users',
        query: { page: this.query.page },
      })
    },
    selectedRoles(event) {
      this.params.roles = []
      this.params.roles.push(event.target.innerHTML)
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" v-if="params.id">
      <div class="col-lg-12" id="addproduct-accordion">
        <form class="form-horizontal" role="form">
          <div class="row mb-5">
            <div class="mt-4 mt-md-0">
              <img
                class="rounded-circle avatar-xl d-block mx-auto"
                alt="200x200"
                src="@/assets/images/users/avatar-4.jpg"
                data-holder-rendered="true"
              />
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Username" label-for="username">
                <b-form-input
                  for="text"
                  v-model="params.username"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Email" label-for="email">
                <b-form-input for="text" v-model="params.email"></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Phone" label-for="phone">
                <b-form-input for="text" v-model="params.phone"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                label="Bank Account"
                label-for="bankaccount"
              >
                <b-form-input
                  for="text"
                  v-model="params.bankAccount"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Balance" label-for="balance">
                <b-form-input
                  for="text"
                  v-model.number="params.balance"
                  disabled
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                label="Balance Token"
                label-for="balanceToken"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.balanceToken"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Amount" label-for="amount">
                <b-form-input for="text" v-model.number="amount"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6"></div>
          </div>
          <b-form-group label="Roles:" label-for="roles">
            <b-form-checkbox-group
              id="checkbox-group-1"
              class="ml-3"
              v-model="selected"
              :options="roles"
              name="flavour-1"
            ></b-form-checkbox-group>
          </b-form-group>
        </form>
      </div>

      <div v-if="!isSubmitting" class="button-items text-center">
        <b-button
          @click="submit"
          size="lg"
          variant="primary"
          class="float-right"
          :disabled="isDisabled"
        >
          Save changes
        </b-button>
        <b-button @click="cancel" size="lg" variant="secondary"
          >Cancel</b-button
        >
      </div>
      <div v-else class="button-items text-center">
        <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
      </div>
    </div>
    <div v-else class="button-items text-center">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>
  </Layout>
</template>
