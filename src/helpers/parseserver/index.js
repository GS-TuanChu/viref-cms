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

  async getUserList(params) {
    let userData = null
    if (params != undefined)
      userData = await Parse.Cloud.run('user:list', params)
    else userData = await Parse.Cloud.run('user:list')
    return userData
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
  async getTokenTxHistory(params) {
    return await Parse.Cloud.run('tokenTx:get', params)
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
