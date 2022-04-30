<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";

export default {
  components: { Layout, PageHeader },
  page: {
    title: "Product Edit",
  },
  data() {
    return {
      title: "Product Edit",
      params: null,
    };
  },
  created() {
    const params = {
      pid: this.$route.params.id,
    };
    this.$parse.getProductDetail(params).then((dataProduct) => {
      this.params = this.constructUserObject(dataProduct);
    });
  },
  methods: {
    constructUserObject(data) {
      return {
        pid: data.id,
        name: data.get("name"),
        description: data.get("description"),
        price: data.get("price"),
        contact: data.get("contact"),
      };
    },
    async submit() {
      try {
        this.$parse.editProduct(this.params).then((res) => {
          if (res) this.$router.push({ name: "products" });
        });
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.$router.push({ name: "products" });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" v-if="params">
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
        </form>
      </div>
      <div class="button-items text-center">
        <b-button
          @click="submit"
          size="lg"
          variant="primary"
          class="float-right"
          >Save changes</b-button
        >
        <b-button @click="cancel" size="lg" variant="secondary"
          >Cancel</b-button
        >
      </div>
    </div>
  </Layout>
</template>
