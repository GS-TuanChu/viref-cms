<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import { required, minLength, minValue } from 'vuelidate/lib/validators'

export default {
  components: { Layout, PageHeader },
  page: {
    title: 'Campaign Create',
  },
  data() {
    return {
      title: 'Campaign Create',
      products: null,
      params: {
        name: '',
        description: '',
        product: null,
        website: '',
        commission: null,
        contact: '',
        network: '',
        startDate: null,
        endDate: null,
        amount: 0,
        type: 0,
        currency: null,
        mine: null,
      },
      mineOptions: [
        { value: true, text: 'YES' },
        { value: false, text: 'NO' },
      ],
      currencyList: [],
      amountLabel: 'Amount',
      commissionLabel: 'Commission',
      isSubmitting: false,
    }
  },
  validations: {
    params: {
      name: {
        required,
        minLength: minLength(6),
      },
      amount: {
        required,
        minValue: minValue(1),
      },
      commission: {
        required,
        minValue: minValue(1),
      },
      product: {
        required,
        minLength: minLength(6),
      },
      mine: {
        required,
      },
      startDate: {
        required,
      },
    },
  },
  watch: {
    'params.currency'(newVal) {
      this.currencyList.forEach((c) => {
        if (c.id === newVal) {
          this.amountLabel = 'Amount ' + c.symbol
          this.commissionLabel = 'Commission ' + c.symbol
        }
      })
    },
  },
  computed: {
    currencyOptions() {
      const options = []
      this.currencyList.forEach((currency) => {
        const option = {
          value: currency.id,
          text: currency.name,
        }
        options.push(option)
      })
      return options
    },
    isBtnDisabled() {
      if (
        !this.params.name ||
        !this.params.startDate ||
        !this.params.endDate ||
        this.isSubmitting
      ) {
        return true
      }
      return false
    },
  },
  created() {
    this.$parse.getProductList().then((data) => {
      this.products = data.products.map((prod) => ({
        value: prod.id,
        text: prod.get('name'),
      }))
    })
    this.getCurrencyList()
  },
  methods: {
    async submit() {
      this.isSubmitting = true
      this.params = {
        ...this.params,
        mine: this.params.mine,
        product: this.params.product,
      }
      this.$parse
        .createCampaign(this.params)
        .then(() => this.$router.push({ name: 'campaigns' }))
        .catch((err) => console.log(err))
    },
    cancel() {
      this.$router.push({ name: 'campaigns' })
    },
    async getCurrencyList() {
      this.$parse.getCurrencyList().then((res) =>
        res.forEach((currency) => {
          this.currencyList.push(currency)
        })
      )
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" v-if="Object.keys(params).length > 0">
      <div class="col-12">
        <form class="form-horizontal" role="form">
          <div class="row mb-3">
            <div class="col-md-4">
              <b-form-group label="Currency" label-for="currency">
                <div class="position-relative col-md-3">
                  <b-form-select
                    v-model="params.currency"
                    :options="currencyOptions"
                  >
                    <template #first>
                      <b-form-select-option :value="null"
                        >-- Select a currency --</b-form-select-option
                      >
                    </template>
                  </b-form-select>
                </div>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group label="Product" label-for="product">
                <b-form-select v-model="params.product" :options="products">
                  <template #first>
                    <b-form-select-option :value="null"
                      >-- Select a product --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <div class="error" v-if="!$v.params.product.required">
                  Please select a product for this campaign.
                </div>
                <div class="error" v-if="!$v.params.product.minLength">
                  Product Name must have at least
                  {{ $v.params.product.$params.minLength.min }} letters.
                </div>
              </b-form-group>
            </div>
            <div class="col-md-4">
              <b-form-group id="example text" label="Mine" label-for="mine">
                <b-form-select v-model="params.mine" :options="mineOptions">
                  <template #first>
                    <b-form-select-option :value="null"
                      >-- Select an option --</b-form-select-option
                    >
                  </template>
                </b-form-select>
                <div class="error" v-if="!$v.params.mine.required">
                  Please select an option.
                </div>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Name"
                label-for="name"
              >
                <b-form-input
                  for="text"
                  v-model.trim="params.name"
                ></b-form-input>
                <span class="error" v-if="!$v.params.name.required"
                  >Name is required.</span
                >
                <span class="error" v-if="!$v.params.name.minLength"
                  >Name must have at least
                  {{ $v.params.name.$params.minLength.min }} letters .</span
                >
              </b-form-group>
            </div>
            <div class="col-md-3">
              <b-form-group
                class="mb-3"
                label="Start Date"
                label-for="startDate"
              >
                <b-form-input
                  for="date"
                  type="date"
                  v-model="params.startDate"
                ></b-form-input>
                <span class="error" v-if="!$v.params.startDate.required"
                  >Start Date is required.</span
                >
              </b-form-group>
            </div>
            <div class="col-md-3">
              <b-form-group class="mb-3" label="End Date" label-for="endDate">
                <b-form-input
                  for="date"
                  type="date"
                  v-model="params.endDate"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Website" label-for="website">
                <b-form-input
                  for="text"
                  v-model="params.website"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Type" label-for="type">
                <b-form-input
                  for="text"
                  v-model.number="params.type"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Contact" label-for="contact">
                <b-form-input
                  for="text"
                  v-model="params.contact"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group class="mb-3" label="Network" label-for="network">
                <b-form-input
                  for="text"
                  v-model="params.network"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                :label="amountLabel"
                label-for="amount"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.amount"
                ></b-form-input>
                <span class="error" v-if="!$v.params.amount.required"
                  >Amount is required.</span
                >
                <span class="error" v-if="!$v.params.amount.minValue"
                  >Amount must be at least
                  {{ $v.params.amount.$params.minValue.min }}.</span
                >
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                :label="commissionLabel"
                label-for="commission"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.commission"
                ></b-form-input>
                <span class="error" v-if="!$v.params.commission.required"
                  >Commission is required.</span
                >
                <span class="error" v-if="!$v.params.commission.minValue"
                  >Commission must be at least
                  {{ $v.params.amount.$params.minValue.min }}.</span
                >
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <b-form-group
              class="mb-3"
              label="Description"
              label-for="description"
            >
              <b-form-textarea
                for="text"
                v-model="params.description"
                placeholder="Description..."
                rows="6"
                max-rows="9"
              ></b-form-textarea>
            </b-form-group>
          </div>
        </form>
      </div>
      <div class="button-items text-center">
        <b-button
          @click="submit"
          size="lg"
          variant="primary"
          class="float-right"
          :disabled="$v.$invalid"
          >Create</b-button
        >
        <b-button @click="cancel" size="lg" variant="secondary"
          >Cancel</b-button
        >
      </div>
    </div>
  </Layout>
</template>
