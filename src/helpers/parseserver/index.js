import Parse from 'parse'

class ParseServer {
  constructor() {
    Parse.initialize(
      process.env.VUE_APP_PARSE_DEV_APPID,
      process.env.VUE_APP_PARSE_DEV_JSKEY
    )
    Parse.serverURL = process.env.VUE_APP_PARSE_SERVERURL
    // Parse.serverURL = process.env.VUE_APP_PARSE_DEV_SERVERURL
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
    const user = await Parse.Cloud.run('user:edit', params)
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
    return await Parse.Cloud.run('campaign:admin:create', params)
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
    return Parse.Cloud.run('campaign:admin:edit', params)
  }

  async getTransactions(params) {
    return Parse.Cloud.run('campaign:getTransactions', params)
  }

  // TokenTransaction
  /**
   * Returns the total token transactions
   *
   * @returns {number}
   */
  async getTotalTokenTransaction() {
    return await Parse.Cloud.run('tokenTx:total')
  }

  /*
   * async transactionMine() {
   *   return Parse.Cloud.run('transaction:mine', { currencyId: "QRPKGt2GL3" }).then(res=>console.log(res))
   * }
   */

  /**
   * @function getTokenTxHistoryByCampaign
   * Returns token transaction history of a user in a specific campaign
   *
   * @param {{ uid: string, cid: string, fromDate: date, toDate: date }} params
   * @returns  {Object}
   */
  async getTokenTxHistoryByCampaign(params) {
    return await Parse.Cloud.run('tokenTx:getByCampaign', params)
  }

  /**
   * @function getTokenTxHistory
   * Returns token transaction history of a user
   *
   * @param {{ uid: string, cid: string, fromDate: date, toDate: date }} params
   * @returns {Object}
   */
  async getTokenTxHistory(params) {
    return Parse.Cloud.run('tokenTx:getHistory', params)
  }

  /**
   * @function getCurrencyList
   * Returns a list of currencies
   * typedef {object} Currency
   * @property {string} id
   * @property {string} name
   * @property {string} symbol
   * @returns {Currency[]}
   */
  async getCurrencyList() {
    return Parse.Cloud.run('currency:list')
  }

  /**
   * @function getCurrencyInfo
   * Returns a currency object
   *
   * @param { {currencyId: string} } params
   * typedef {object} Currency
   * @property {string} id
   * @property {string} name
   * @property {string} symbol
   * @returns {Currency}
   */
  async getCurrencyInfo(params) {
    return Parse.Cloud.run('currency:get', params)
  }
  /**
   * @function convertVREFtoUSDC
   * Returns the converted amount from VREF to USDC
   * @param {{ value: number, currency: string }} params
   *
   * @returns {number}
   */
  async convertVREFtoUSDC(params) {
    return Parse.Cloud.run('exchange:convert', params)
  }

  /**
   * @function getCategoryList
   * Returns a list of currencies
   * @returns {Category[]}
   */
  async getCategoryList() {
    return await Parse.Cloud.run('category:list')
  }
  fileHandler(name, data) {
    const parseFile = new Parse.File(name, data)
    parseFile.save().then(() => console.log(parseFile.url()))
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
