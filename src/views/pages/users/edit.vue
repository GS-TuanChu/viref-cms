<script>
import Layout from '@/views/layouts/main'
import PageHeader from '@/components/page-header'
import { userMethods, userComputed } from '@/state/helpers'
import { integer } from 'vuelidate/lib/validators'
import { constructUserObject } from '@/helpers/users'
import errorMixin from '@/mixins/error'

// Custom validation for changing user's balance
function editBalanceValidation() {
  if (this.showBalanceEdit) {
    if (this.amount && !this.note) return false
    return true
  }
  return true
}

function amountValidation() {
  if (this.showBalanceEdit) {
    if (this.note && !this.amount) return false
    return true
  }
  return true
}

export default {
  page: {
    title: 'User Edit',
  },
  components: { Layout, PageHeader },
  mixins: [errorMixin],
  data() {
    return {
      title: 'User Edit',
      params: {},
      selected: [],
      amount: null,
      isSubmitting: false,
      roles: ['admin', 'server', 'marketing', 'customer_support'],
      query: {},
      isRoleChanged: false,
      isDisabled: true,
      currencies: [],
      balances: [],
      selectedCurrency: null,
      showBalanceEdit: false,
      note: '',
    }
  },
  validations() {
    return {
      amount: {
        integer,
        amountValidation,
      },
      note: {
        editBalanceValidation,
      },
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
    balanceButton() {
      return this.showBalanceEdit ? 'Cancel editing' : 'Edit balance'
    },
  },
  created() {
    this.query = this.$route.query
    this.$parse.getUserDetail(this.$route.params.id).then((dataUser) => {
      this._constructUserObject(dataUser)
      this.selected = [...this.params.roles]
    })
    this.$parse.getCurrencyList().then((res) => {
      this.currencies = [...res]
    })
  },
  methods: {
    ...userMethods,
    _constructUserObject(data) {
      this.params = constructUserObject(data)
      this.balances = [...data.balance]
      if (this.balances && this.balances.length) {
        this.selectedCurrency = this.balances[0].id
        this.params.balance = this.balances[0].balance
      }
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
              uid: this.params.id,
              role: r,
              operation: 'remove',
            }
            promises.push(this.$parse.userRoleEdit(param))
          })
          this.selected.forEach((r) => {
            param = {
              uid: this.params.id,
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
        this.params.note = this.note
        this.$parse
          .editUser(this.params)
          .then(({ id }) => {
            if (id) {
              const payload = {
                id,
                params: this.params,
              }
              this.updateUser(payload)
              this.isSubmitting = false
              this.$router.go()
            }
          })
          .catch((error) => {
            this.isSubmitting = false
            this.errorAlert(error)
          })
      } catch (error) {
        console.log(error)
      }
    },
    cancel() {
      this.$router.push({
        name: 'users',
        query: {
          page: this.query.page,
        },
      })
    },
    selectedRoles(event) {
      this.params.roles = []
      this.params.roles.push(event.target.innerHTML)
    },
    editBalanceHandler() {
      this.showBalanceEdit = !this.showBalanceEdit
    },
    deleteHandler() {
      this.$parse.userDelete(this.params.uid).then((res) => console.log(res))
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <b-button @click="deleteHandler">Delete</b-button>
    <div class="row" v-if="params.uid">
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
                  autocomplete="off"
                  for="text"
                  v-model="params.username"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6 mb-3">
              <b-form-group label="Balance" label-for="balance">
                <b-input-group>
                  <b-form-input
                    for="text"
                    v-model.number="params.balance"
                    disabled
                  ></b-form-input>
                  <b-form-group class="position-relative">
                    <b-form-input
                      v-if="showBalanceEdit"
                      autocomplete="off"
                      for="text"
                      v-model.number="amount"
                      trim
                      placeholder="Enter an amount"
                    ></b-form-input>
                    <div class="position-absolute">
                      <span class="error" v-if="!$v.amount.integer"
                        >Amount must be a number.</span
                      >
                      <span class="error" v-if="!$v.amount.amountValidation"
                        >Amount can not be empty.</span
                      >
                    </div>
                  </b-form-group>
                  <b-form-select
                    v-model="selectedCurrency"
                    :options="computedCurrency"
                  >
                    <template #first>
                      <b-form-select-option disabled selected>
                        -- please select an option --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                  <b-button variant="primary" @click="editBalanceHandler">{{
                    balanceButton
                  }}</b-button>
                </b-input-group>
              </b-form-group>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col-md-6">
              <b-form-group label="Email" label-for="email">
                <b-form-input
                  autocomplete="off"
                  for="text"
                  v-model="params.email"
                ></b-form-input>
              </b-form-group>
            </div>

            <div v-if="showBalanceEdit" class="col-md-6">
              <b-form-group label="Note" label-for="note">
                <b-input-group>
                  <b-form-textarea
                    rows="3"
                    for="text"
                    v-model="note"
                    placeholder="Notes for editing user's balance"
                  ></b-form-textarea>
                </b-input-group>
              </b-form-group>
              <span class="error" v-if="!$v.note.editBalanceValidation">
                Please specify a reason for changing balance.
              </span>
            </div>
          </div>
          <div class="row">
            <div class="col-md-3">
              <b-form-group class="mb-3" label="Phone" label-for="phone">
                <b-form-input
                  autocomplete=""
                  off
                  for="text"
                  v-model="params.phone"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-3">
              <b-form-group
                class="mb-3"
                label="Bank Account"
                label-for="bankaccount"
              >
                <b-form-input
                  autocomplete="off"
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
                  autocomplete="off"
                  for="text"
                  v-model.number="params.balanceToken"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
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
          :disabled="$v.$invalid"
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
