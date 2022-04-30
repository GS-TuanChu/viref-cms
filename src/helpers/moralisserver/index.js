import axios from 'axios'

const moralisURL = 'https://deep-index.moralis.io/api/v2'

export default class MoralisServer {
  constructor(networkName, address) {
    this.url = moralisURL + '/' + address + '/events?'
    this.networkName = networkName
    this.headers = {
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key':
          'HDRtAfDP5ftE3d5OkjJEuwD7n77eUg2K2TbtowiHPgxvN2y2mmhfOTMnTCd7lKh5',
      },
    }
  }
  async getBuyEvents(limit = 0, offset = 0, fromDate = '', toDate = '') {
    const abi = {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'address',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'buy',
      type: 'event',
    }
    const params = new URLSearchParams({
      chain: this.networkName,
      topic: 'buy(address,uint256)',
      limit: limit,
      offset: offset,
      from_date: fromDate && new Date(fromDate).toLocaleDateString('en-US'),
      to_date: toDate && new Date(toDate).toLocaleDateString('en-US'),
    })

    try {
      const events = await axios.post(this.url + params, abi, this.headers)
      return events.data
    } catch (error) {
      console.log(error)
    }
  }

  async getSellEvents(limit = 0, offset = 0, fromDate = '', toDate = '') {
    const abi = {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'address',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'sell',
      type: 'event',
    }
    const params = new URLSearchParams({
      chain: this.networkName,
      topic: 'sell(address,uint256)',
      limit: limit,
      offset: offset,
      from_date: fromDate && new Date(fromDate).toLocaleDateString('en-US'),
      to_date: toDate && new Date(toDate).toLocaleDateString('en-US'),
    })

    try {
      const events = await axios.post(this.url + params, abi, this.headers)
      return events.data
    } catch (error) {
      console.log(error)
    }
  }
}

