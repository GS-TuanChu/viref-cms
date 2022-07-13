<script>
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
      amount: 0,
      isSubmitting: false,
      roles: ['admin', 'server', 'marketing', 'customer_support'],
      query: {},
      isRoleChanged: false,
      isDisabled: true,
      currencies: [],
      balances: [],
      selectedCurrency: null,
    }
  },
  watch: {
    selectedCurrency(newVal) {
      if (this.balances.length) {
        const amount = this.balances.filter((b) => b.id === newVal)[0]
        this.params.balance = amount && amount.balance ? amount.balance : 0
      }
    },
  },
  computed: {
    ...userComputed,
    computedCurrency() {
      const currencies = []
      this.currencies.forEach((c) => {
        const obj = {
          value: c.id,
          text: c.name,
        }
        currencies.push(obj)
      })
      return currencies
    },
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
      this.constructUserObject(dataUser)
      this.selected = [...this.params.roles]
      this.watchHandler()
    })
    this.$parse.getCurrencyList().then((res) => {
      this.currencies = [...res]
    })
  },
  methods: {
    ...userMethods,
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
      this.params = {
        id: data.user.id,
        username: data.user.get('username'),
        email: data.user.get('email'),
        phone: data.user.get('phone'),
        roles: data.roles,
        bankAccount: data.user.get('bankAccount') || '0',
        balanceToken: data.user.get('balanceToken') || 0,
      }
      this.balances = [...data.balance]
      if (this.balances.length) this.selectedCurrency = this.balances[0].id
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
        this.params.currencyId = this.selectedCurrency
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
              <b-form-group class="mb-3" label="Amount" label-for="amount">
                <b-input-group>
                  <b-form-input
                    for="text"
                    v-model.number="amount"
                  ></b-form-input>
                  <b-form-select
                    v-model="selectedCurrency"
                    :options="computedCurrency"
                  >
                    <template #first>
                      <b-form-select-option value="" disabled selected>
                        -- Please select an option --</b-form-select-option
                      >
                    </template>
                  </b-form-select></b-input-group
                >
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Email" label-for="email">
                <b-form-input for="text" v-model="params.email"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Balance" label-for="balance">
                <b-form-input
                  for="text"
                  v-model.number="params.balance"
                  disabled
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <b-form-group class="mb-3" label="Phone" label-for="phone">
                <b-form-input for="text" v-model="params.phone"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-3">
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
          <div class="row"></div>
          <div class="row">
            <b-form-group class="col-md-6" label="Roles:" label-for="roles">
              <b-form-checkbox-group
                v-model="selected"
                :options="roles"
                name="flavour-1"
              ></b-form-checkbox-group>
            </b-form-group>
          </div>
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

<style>
.custom-control-label {
  margin-left: 5px;
}
</style>
