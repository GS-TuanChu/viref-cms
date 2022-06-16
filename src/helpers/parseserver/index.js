import Parse from 'parse'

class ParseServer {
  constructor() {
    Parse.initialize(
      process.env.VUE_APP_PARSE_DEV_APPID,
      process.env.VUE_APP_PARSE_DEV_JSKEY
    )
    Parse.serverURL = process.env.VUE_APP_PARSE_DEV_SERVERURL
  }

  async logIn(params) {
    const user = await Parse.User.logIn(params.email, params.password)
    // const user = await Parse.Cloud.run('logIn', params)
    return user
  }

  logout() {
    const result = Parse.User.logOut()
    return result
  }

  async getTotalUser() {
    return Parse.Cloud.run('user:total')
  }
  async getUserList(params) {
    let userData = null
    if (params != undefined)
      userData = await Parse.Cloud.run('user:list', params)
    else userData = await Parse.Cloud.run('user:list')
    return userData
  }

  async getUsers(params) {
    return Parse.Cloud.run('user:getByRange', params)
  }

  async getUserDetail(id) {
    const params = { uid: id }
    const userData = await Parse.Cloud.run('user:getUserDetail', params)
    return userData
  }

  async editUser(params) {
    let t0 = performance.now()
    const user = await Parse.Cloud.run('user:edit', params)
    let t1 = performance.now()
    console.log(t1 - t0)
    return user
  }

  async searchUser(params) {
    const user = await Parse.Cloud.run('user:search', params)
    return user
  }

  async userRoleEdit(params) {
    return await Parse.Cloud.run('user:editRole', params)
  }

  async getTotalCampaign() {
    return Parse.Cloud.run('campaign:total')
  }

  async getCampaign(params) {
    return Parse.Cloud.run('campaign:getAll', params)
  }

  async getCampaignList() {
    const campaigns = await Parse.Cloud.run('campaign:list')
    return campaigns
  }

  async createCampaign(params) {
    return await Parse.Cloud.run('campaign:adminCreate', params)
  }

  async getCampaignDetail(params) {
    const { campaign } = await Parse.Cloud.run('campaign:detail', params)
    return campaign
  }

  async searchCampaign(params) {
    const campaign = await Parse.Cloud.run('campaign:search', params)
    return campaign
  }

  async campaignBuyers(params) {
    const campaign = await Parse.Cloud.run('campaign:buyers', params)
    return campaign
  }

  async getProductList() {
    const productData = await Parse.Cloud.run('product:list')
    return productData
  }

  async getProductDetail(params) {
    const { product } = await Parse.Cloud.run(
      'product:getProductDetail',
      params
    )
    return product
  }

  async createProduct(params) {
    return await Parse.Cloud.run('product:create', params)
  }

  async editProduct(params) {
    return await Parse.Cloud.run('product:editProduct', params)
  }

  async deleteProduct(params) {
    return await Parse.Cloud.run('product:deleteProduct', params)
  }
  async editCampaign(params) {
    return await Parse.Cloud.run('campaign:adminEdit', params)
  }

  async getTransactions(params) {
    return Parse.Cloud.run('campaign:getTransactions', params)
  }

  // TokenTransaction
  async getTotalTokenTransaction() {
    return await Parse.Cloud.run('tokenTx:total')
  }

  async getTokenTxHistory(params) {
    return await Parse.Cloud.run('tokenTx:getByRange', params)
  }

  async getTokenTxHistories(params) {
    return Parse.Cloud.run('tokenTx:getAll', params)
  }

  async getAllTokenTransactions() {
    const query = new Parse.Query('TokenTransaction')
    query.limit(1000)
    query.ascending('createdAt')
    // const fromDate = new Date('Feb-12-2022')
    // let endDate = new Date('April-12-2022')
    query.greaterThanOrEqualTo('createdAt', { $relativeTime: '30 days ago' })
    // query.lessThanOrEqualTo('createdAt', new Date(endDate))
    const tokenTxs = await query.find()
    const amounts = []
    const dates = []
    const counts = []
    tokenTxs.forEach((current, index, self) => {
      const start = current.get('createdAt')
      start.setHours(0, 0, 0, 0)
      const end = new Date(start)
      end.setDate(end.getDate() + 1)
      const temp = self.filter(
        (tx) => tx.get('createdAt') >= start && tx.get('createdAt') <= end
      )
      self.splice(0, temp.length - 1)
      const sumAmount = temp.map((tx) => tx.get('amount'))
      let totalAmount = sumAmount.reduce((prev, curr) => prev + curr, 0)

      const day = start.getDate()
      const month = start.getMonth() + 1
      const year = start.getFullYear()
      const date = day + '/' + month + '/' + year
      amounts.push(totalAmount)
      dates.push(date)
      counts.push(temp.length)
    })
    console.log(amounts)
    console.log(dates)
    console.log(counts)
  }
}

let _parseServer = null

const initParseServer = () => {
  if (!_parseServer) _parseServer = new ParseServer()
  return _parseServer
}

const getParseServer = () => _parseServer

export default {
  install: (Vue) => {
    window.$parse = new ParseServer()
    Vue.prototype.$parse = window.$parse
  },
}

export { initParseServer, getParseServer }
