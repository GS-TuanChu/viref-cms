<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'

export default {
  components: { Layout, PageHeader },
  page: {
    title: 'Product Create',
  },
  data() {
    return {
      title: 'Product Create',
      params: {
        name: '',
        price: 0,
        description: '',
        category: '',
        contact: '',
        media: [],
      },
      isSubmitting: false,
    }
  },
  watch: {
    'params.media': {
      deep: true,
      handler(newVal) {
        newVal.forEach(async (n) => {
          this.$parse.fileHandler(n.name, n)
        })
      },
    },
  },
  mounted() {
    this.getCategoryList()
  },
  methods: {
    async submit() {
      this.isSubmitting = true
      this.$parse.createProduct(this.params).then(() => {
        this.isSubmitting = false
        this.$router.push({ name: 'products' }).catch((err) => console.log(err))
      })
    },
    cancel() {
      this.$router.push({ name: 'products' })
    },
    getCategoryList() {
      this.$parse.getCategoryList((res) => {
        console.log(res)
      })
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row">
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
            label-cols-sm="2"
            label-cols-lg="2"
            label="Category"
            label-for="category"
          >
            <b-form-input for="text" v-model="params.category"></b-form-input>
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
            label="Price"
            label-for="price"
          >
            <b-form-input
              for="text"
              v-model.number="params.price"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Description"
            label-for="description"
          >
            <b-form-textarea
              rows="10"
              for="text"
              v-model="params.description"
            ></b-form-textarea>
          </b-form-group>
          <b-form-group
            class="mb-3"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Image"
            label-for="image"
          >
            <b-form-file
              multiple
              v-model="params.media"
              id="form-image"
              accept="image/*"
            ></b-form-file>
          </b-form-group>
        </form>
      </div>
      <div v-if="!isSubmitting" class="button-items text-center">
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
      <div v-else class="text-center">
        <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
      </div>
    </div>
  </Layout>
</template>
