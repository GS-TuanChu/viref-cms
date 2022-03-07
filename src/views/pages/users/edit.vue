<script>
import Layout from "../../layouts/main";
import PageHeader from "@/components/page-header";
export default {
  components: { Layout, PageHeader },
  page: {
    title: "User Edit",
  },
  data() {
    return {
      title: "User Edit",
      dataUser: null,
      params: {
        username: null,
        email: null,
        phone: null,
        bankAccount: null,
        balance: null,
        balanceToken: null,
      },
    };
  },
  created() {
    this.$parse.getUserDetail(this.$route.params.id).then((dataUser) => {
      this.constructUserObject([dataUser]);
    });
  },
  methods: {
    constructUserObject(data) {
      this.dataUser = data.map((dataUser) => {
        return {
          id: dataUser.user.id,
          username: dataUser.user.get("username"),
          email: dataUser.user.get("email"),
          phone: dataUser.user.get("phone"),
          role: dataUser.roles,
        };
      });
    },
    submit() {
      const params = this.params;
      console.log(params);
    },
    cancel() {
      this.$router.push({ name: "users" });
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" v-if="dataUser">
      <div class="col-12">
        <form class="form-horizontal" role="form">
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Username"
            label-for="username"
          >
            <b-form-input
              for="text"
              v-model="params.username"
              :value="dataUser[0].username"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Email"
            label-for="email"
          >
            <b-form-input
              for="text"
              v-model="params.email"
              :value="dataUser[0].email"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Phone"
            label-for="phone"
          >
            <b-form-input
              for="text"
              v-model="params.phone"
              :value="dataUser[0].phone"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="BankAccount"
            label-for="bankaccount"
          >
            <b-form-input
              for="text"
              v-model="params.bankAccount"
              :value="dataUser[0].bankAccount || 0"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Balance"
            label-for="balance"
          >
            <b-form-input
              for="text"
              v-model="params.balance"
              :value="dataUser[0].balance || 0"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="BalanceToken"
            label-for="balanceToken"
          >
            <b-form-input
              for="text"
              v-model="params.balanceToken"
              :value="dataUser[0].balanceToken || 0"
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
