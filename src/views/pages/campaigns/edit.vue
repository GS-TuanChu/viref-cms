<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import Tree from '@/components/tree'
import Switches from 'vue-switches'
import Calendar from '@/components/calendar'
import Transactions from '@/views/pages/dashboard/transactions'

export default {
  components: { Layout, PageHeader, Tree, Switches, Calendar, Transactions },
  page: {
    title: 'Campaign Edit',
  },
  data() {
    return {
      title: 'Campaign Edit',
      params: null,
      sliding: null,
      small: false,
      buyers: [],
      dateRange: [],
      transactionData: {},
    }
  },
  created() {
    const params = {
      cid: this.$route.params.id,
    }
    this.getCampaignBuyers(params)
    this.getCampaignDetail(params)
    this.getTransactions(params)
  },
  methods: {
    setDateRange(value) {
      this.dateRange = value
    },
    getDataOnDateRange() {
      const params = {
        cid: this.$route.params.id,
        fromDate: this.dateRange[0],
        toDate: this.dateRange[1],
      }
      this.getTransactions(params)
    },
    getCampaignBuyers(params) {
      this.$parse.campaignBuyers(params).then((res) => {
        this.buyers = this.createTreeStructure(res)
      })
    },
    getCampaignDetail(params) {
      this.$parse.getCampaignDetail(params).then((dataCampaign) => {
        this.params = this.constructUserObject(dataCampaign)
      })
    },
    getTransactions(params) {
      this.$parse.getTransactions(params).then((res) => {
        this.transactionData = res
      })
    },
    onSlideStart() {
      this.sliding = true
    },
    onSlideEnd() {
      this.sliding = false
    },
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
        product: data.product.media,
        active: data.active,
        startDate: data.startDate,
        endDate: data.endDate,
        refUsers: this.createTreeStructure(data.refUsers),
      }
    },
    createTreeStructure(data) {
      class TreeNode {
        constructor(value, id, amount = null) {
          this.value = value
          this.children = []
          this.id = id
          this.amount = amount
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
        const res = existingValues.filter((el) => el.id === nodeValue)
        return res[0]
      }
      data.forEach((el) => {
        el.forEach((obj, index, current) => {
          const newNode = new TreeNode(obj.name, obj.id, obj.amount)
          if (index == 0 && !search(rootNode, obj.id)) {
            rootNode.children.push(newNode)
          } else {
            if (index > 0) {
              const parentNode = search(rootNode, current[index - 1].id)
              if (parentNode && !search(parentNode, current[index].id))
                parentNode.children.push(newNode)
            }
          }
        })
      })
      return rootNode.children.sort((a, b) =>
        a.id > b.id ? 1 : a.id < b.id ? -1 : 0
      )
    },
    async submit() {
      try {
        this.params.cid = this.$route.params.id
        this.params.startDate = new Date(this.params.startDate)
        this.params.endDate = new Date(this.params.endDate)
        this.$parse.editCampaign(this.params).then((res) => {
          console.log(res)
        })
      } catch (error) {
        console.log(error)
      }
    },
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
    <div class="row">
      <div class="col-md-6">
        <PageHeader :title="title" />
        <span v-if="params != null && buyers.length" class="col-md-6">
          <b-form-group
            class="mb-3"
            id="example text"
            label="Active"
            label-for="active"
          >
            <switches
              v-model="params.active"
              color="warning"
              class="ms-1"
            ></switches>
          </b-form-group>
        </span>
      </div>
    </div>
    <div class="row mb-3">
      <Calendar @date="setDateRange" @submitted="getDataOnDateRange" />
    </div>
    <div class="row mb-3">
      <div class="col-md-2 col-xl-4">
        <div class="card">
          <Transactions :data-object="transactionData" />
        </div>
      </div>
    </div>
    <div class="row" v-if="params != null && buyers.length">
      <div class="col-12">
        <form class="form-horizontal" role="form">
          <div class="row">
            <b-form-group
              class="mb-3"
              id="example text"
              label="Product"
              label-for="product"
            >
              <div class="col-md-6">
                <img :src="params.product[0]" alt="" />
              </div>
              <!--
                 -<b-carousel img-width="480" img-height="240" controls>
                 -  <template v-for="(prod, index) of params.product">
                 -    <b-carousel-slide
                 -      :key="index"
                 -      class="carousel"
                 -      :img-src="prod"
                 -    >
                 -    </b-carousel-slide>
                 -  </template>
                 -</b-carousel>
                 -->
            </b-form-group>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Ref User"
                label-for="Ref User"
              >
                <template v-for="(refUser, index) in params.refUsers">
                  <ul :key="index">
                    <tree class="item" :items="refUser"></tree>
                  </ul>
                </template>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Buyers"
                label-for="Buyers"
              >
                <template v-for="(buyer, index) in buyers">
                  <ul :key="index">
                    <tree class="item" :items="buyer"></tree>
                  </ul>
                </template>
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
                <b-form-input for="text" v-model="params.name"></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Website"
                label-for="website"
              >
                <b-form-input
                  for="text"
                  v-model="params.website"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Amount"
                label-for="amount"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.amount"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Commission"
                label-for="commission"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.commission"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Network"
                label-for="network"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.network"
                ></b-form-input>
              </b-form-group>
            </div>
            <div class="col-md-6">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Type"
                label-for="type"
              >
                <b-form-input
                  for="text"
                  v-model.number="params.type"
                ></b-form-input>
              </b-form-group>
            </div>
          </div>

          <div class="row">
            <div class="col-md-6"></div>
          </div>

          <div class="row">
            <b-form class="col-md-6">
              <label for="startDate">Start Date:</label>
              <b-form-datepicker
                id="start-datepicker"
                v-model="params.startDate"
                locale="en-US"
                today-button
                dropleft
                menu-class="w-100"
                calendar-width="100%"
              ></b-form-datepicker>
            </b-form>
            <b-form class="col-md-6">
              <label for="endDate">End Date:</label>
              <b-form-datepicker
                id="end-datepicker"
                v-model="params.endDate"
                dropleft
                locale="en-US"
                menu-class="w-100"
                calendar-width="100%"
              ></b-form-datepicker>
            </b-form>
          </div>

          <div class="row">
            <div class="col-md-12">
              <b-form-group
                class="mb-3"
                id="example text"
                label="Description"
                label-for="description"
              >
                <b-form-textarea
                  id="textarea"
                  v-model="params.description"
                  rows="12"
                ></b-form-textarea>
              </b-form-group>
            </div>
          </div>
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
    <div v-else class="text-center">
      <b-spinner class="m-2" variant="primary" role="status"></b-spinner>
    </div>
  </Layout>
</template>
