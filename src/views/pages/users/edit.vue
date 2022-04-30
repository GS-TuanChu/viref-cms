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
      params: null,
      selected: [],
      roles: [
        {
          text: "admin",
          value: "admin",
        },
        {
          text: "server",
          value: "server",
        },
        {
          text: "marketing",
          value: "marketing",
        },
        {
          text: "customer_support",
          value: "customer_support",
        },
      ],
    };
  },
  created() {
    this.$parse.getUserDetail(this.$route.params.id).then((dataUser) => {
      this.constructUserObject([dataUser]);
    });
  },
  methods: {
    constructUserObject(data) {
      this.params = data.map((dataUser) => {
        return {
          uid: dataUser.user.id,
          username: dataUser.user.get("username"),
          email: dataUser.user.get("email"),
          phone: dataUser.user.get("phone"),
          roles: dataUser.roles.map((r) => r.get("name")),
          bankAccount: Number(dataUser.user.get("bankAccount")) || 0,
          balance: dataUser.user.get("balance") || 0,
          balanceToken: dataUser.user.get("balanceToken") || 0,
        };
      })[0];
    },
    async submit() {
      try {
        let params = null;
        if (this.params.role != "unspecified") {
          params = {
            uid: this.params.uid,
            role: this.params.roles[0],
            operation: "add",
          };
        } else {
          params = {
            uid: this.params.uid,
            role: this.params.roles[0],
            operation: "remove",
          };
        }
        console.log(params);
        this.$parse.editUser(this.params).then((res) => {
          if (res) {
            this.$router.push({ name: "users" });
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    cancel() {
      this.$router.push({ name: "users" });
    },
    selectedRoles(event) {
      this.params.roles = [];
      this.params.roles.push(event.target.innerHTML);
    },
  },
};
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <div class="row" v-if="params">
      <div class="col-lg-12" id="addproduct-accordion">
        <form class="form-horizontal" role="form">
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Username"
            label-for="username"
          >
            <b-form-input for="text" v-model="params.username"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Email"
            label-for="email"
          >
            <b-form-input for="text" v-model="params.email"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Phone"
            label-for="phone"
          >
            <b-form-input for="text" v-model="params.phone"></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Bank Account"
            label-for="bankaccount"
          >
            <b-form-input
              for="text"
              v-model="params.bankAccount"
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
              v-model.number="params.balance"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Balance Token"
            label-for="balanceToken"
          >
            <b-form-input
              for="text"
              v-model.number="params.balanceToken"
            ></b-form-input>
          </b-form-group>
          <b-form-group
            class="mb-3"
            id="example text"
            label-cols-sm="2"
            label-cols-lg="2"
            label="Roles"
            label-for="roles"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              class="d-flex flex-wrap"
              v-model="selected"
              :options="roles"
              name="flavour-1"
            ></b-form-checkbox-group>
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
