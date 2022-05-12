<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Tree from '@/components/tree'

export default {
  components: { Layout, PageHeader, Tree },
  page: {
    title: 'Campaign Edit',
  },
  data() {
    return {
      title: 'Campaign Edit',
      params: null,
    }
  },
  created() {
    const params = {
      cid: this.$route.params.id,
    }
    this.$parse.getCampaignDetail(params).then((dataCampaign) => {
      this.params = this.constructUserObject(dataCampaign)
    })
  },
  methods: {
    constructUserObject(data) {
      return {
        id: data.id,
        name: data.name,
        description: data.description,
        website: data.website,
        network: data.network,
        amount: data.amount,
        commission: data.commission,
        type: data.type,
        product: data.product,
        mine: data.mine,
        startDate: data.startDate,
        endDate: data.endDate,
        refUsers: this.createTreeStructure(data.refUsers),
      }
    },
    createTreeStructure(refUsers) {
      class TreeNode {
        constructor(value) {
          this.value = value
          this.children = []
        }
      }
      const rootNode = new TreeNode('rootNode')
      function BFS(rootNode) {
        const visited = [],
          queue = []
        let current = rootNode
        queue.push(current)
        while (queue.length) {
          current = queue.shift()
          visited.push(current)
          if (current.children.length) queue.push(...current.children)
        }
        return visited
      }

      function search(node, nodeValue) {
        const existingValues = BFS(node)
        const res = existingValues.filter((el) => el.value === nodeValue)
        return res[0]
      }
      refUsers.forEach((a) => {
        a.forEach((username, index, current) => {
          const newNode = new TreeNode(username)
          if (!search(rootNode, username) && index == 0) {
            rootNode.children.push(newNode)
          } else {
            const parentNode = search(rootNode, current[index - 1])
            if (parentNode && !search(parentNode, current[index]))
              parentNode.children.push(newNode)
          }
        })
      })
      return rootNode.children
    },
    async submit() {},
    cancel() {
      this.$router.push({ name: 'campaigns' })
    },
  },
  filters: {
    formatTime(time) {
      return new Date(time).toDateString('en-gb')
    },
  },
}
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
            label="Ref User"
            label-for="Ref User"
          >
            <template v-for="(refUser, index) in params.refUsers">
              <ul :key="index">
                <tree class="item" :items="refUser"></tree>
              </ul>
            </template>
          </b-form-group>

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
            <b-form-textarea
              id="textarea"
              v-model="params.description"
              rows="12"
            ></b-form-textarea>
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
            label="Network"
            label-for="network"
          >
            <b-form-input
              for="text"
              v-model.number="params.network"
            ></b-form-input>
          </b-form-group>

          <b-form-group class="mb-3" id="example text">
            <b-form inline>
              <label for="startDate">Start Date</label>
              <b-form-datepicker
                v-model="params.startDate"
                locale="en-US"
              ></b-form-datepicker>

              <label for="startDate">End Date</label>
              <b-form-datepicker
                v-model="params.endDate"
                locale="en-US"
              ></b-form-datepicker>
            </b-form>
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
            label="Mine"
            label-for="mine"
          >
            <b-form-input for="text"></b-form-input>
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
