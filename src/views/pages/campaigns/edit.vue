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
      console.log('##### ', dataCampaign.refUsers)
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
        refUsers: this.formatRefUsers(data.refUsers),
      }
    },
    formatRefUsers(data) {
      // Array data
      const parentNode = new Map()

      const result = []
      let i = 0
      data.forEach((a) => {
        // console.log(a)
        a.forEach((u) => {
          // console.log(u)
          if (!parentNode.get(u)) parentNode.set(u, [])
        })
        result.push({
          data: a,
        })
        i++
      })
      result.forEach((r) => {
        let temp = []
        for (let i = 1; i < r.data.length; i++) {
          temp.push(r.data[i])
        }
        if (parentNode.has(r.data[0])) {
          let value = parentNode.get(r.data[0])
          value = [...value, ...temp]
          value = value.filter((x, i, self) => self.indexOf(x) == i)
          parentNode.set(r.data[0], value)
        }
      })
      const array = []
      // {
      // 	id: i, pid: i -1,
      // 	numberOfChildren: length - (i),
      // 	name: username.get("fullname")
      // }
      let temp = []
      let id = 0

      for (let [key, value] of parentNode) {
        value = [key, ...value]
        let i = 1
        temp = []
        value.forEach((v) => {
          temp.push({
            id: i,
            pid: i - 1,
            name: v,
            numberOfChildren: value.length - i,
          })
          i++
        })
        array.push(temp)
        id++
      }
      const res = []
      array.forEach((a) => {
        if (a.length > 1) res.push(this.makeTree(a))
      })
      return res
    },
    makeTree(arr) {
      let arrMap = new Map(arr.map((item) => [item.id, item]))
      let tree = []
      for (let i = 0; i < arr.length; i++) {
        let item = arr[i]

        if (item.pid) {
          let parentItem = arrMap.get(item.pid)

          if (parentItem) {
            let { children } = parentItem

            if (children) {
              parentItem.children.push(item)
            } else {
              parentItem.children = [item]
            }
          }
        } else {
          tree.push(item)
        }
      }
      return tree
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
            <template v-for="refUser in params.refUsers">
              <tree :key="refUser.id" class="item" :items="refUser"></tree>
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
