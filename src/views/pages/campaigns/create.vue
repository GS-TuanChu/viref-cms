<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
export default {
  components: { Layout, PageHeader },
  page: {
    title: 'Campaign Create',
  },
  data() {
    return {
      title: 'Campaign Create',
      params: {
        name: null,
        description: null,
        products: null,
        website: null,
        commission: null,
        contact: null,
        network: null,
        startDate: null,
        endDate: null,
        amount: null,
        type: null,
      },
      selected: true,
      selectedProduct: null,
      mineOptions: [
        { value: true, text: 'YES' },
        { value: false, text: 'NO' },
      ],
    }
  },
  created() {
    this.$parse.getProductList().then((data) => {
      data.products.forEach((prod) => console.log(prod))
      this.params.products = data.products.map((prod) => ({
        value: prod.id,
        text: prod.get('name'),
      }))
    })
  },
  methods: {
    async submit() {
      this.params = {
        ...this.params,
        mine: this.selected,
        product: this.selectedProduct,
      }

      console.log(this.params)
      this.$parse
        .createCampaign(this.params)
        .then(() => this.$router.push({ name: 'campaigns' }))
    },
    cancel() {
      this.$router.push({ name: 'campaigns' })
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
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Name"
            label-for="name"
          >
            <b-form-input for="text" v-model="params.name"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Description"
            label-for="description"
          >
            <b-form-input
              for="text"
              v-model="params.description"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Website"
            label-for="website"
          >
            <b-form-input for="text" v-model="params.website"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Contact"
            label-for="contact"
          >
            <b-form-input for="text" v-model="params.contact"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Network"
            label-for="network"
          >
            <b-form-input for="text" v-model="params.network"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Start Date"
            label-for="startDate"
          >
            <b-form-input
              for="date"
              type="date"
              v-model="params.startDate"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="End Date"
            label-for="endDate"
          >
            <b-form-input
              for="date"
              type="date"
              v-model="params.endDate"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Amount"
            label-for="amount"
          >
            <b-form-input
              for="text"
              v-model.number="params.amount"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Commission"
            label-for="commission"
          >
            <b-form-input
              for="text"
              v-model.number="params.commission"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Type"
            label-for="type"
          >
            <b-form-input
              for="text"
              v-model.number="params.type"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Product"
            label-for="product"
          >
            <b-form-select
              v-model="selectedProduct"
              :options="params.products"
            ></b-form-select>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Mine"
            label-for="mine"
          >
            <b-form-select
              v-model="selected"
              :options="mineOptions"
            ></b-form-select>
          </b-form-group>
        </form>
      </div>
      <div class="button-items text-center">
        <b-button
          @click="submit"
          size="lg"
          variant="primary"
          class="float-right"
          >Create</b-button
        >
        <b-button @click="cancel" size="lg" variant="secondary"
          >Cancel</b-button
        >
      </div>
    </div>
  </Layout>
</template>
