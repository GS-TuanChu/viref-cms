<script>
import Layout from '../../layouts/main'
import vref from '../../../contracts/vref.json'
import web3Mixin from '../../../mixins/web3'
import Moralis from 'moralis'

const networks = [
  { name: 'bsc', address: vref.address.bsc },
  { name: 'bsc testnet', address: vref.address.bsctest },
]
const contract = {
  usdc: '0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d',
  vref: '0x2b7cc0556f82a23e17ed47339081c0160ccc64fc',
}
export default {
  page: {
    title: 'History',
  },
  components: { Layout },
  data() {
    return {
      title: 'History',
      headVariant: 'dark',
      VREF: null,
      transactions: [],
      logs: [],
      address: '',
      networks,
      selectedNetwork: networks[0],
      fromDate: null,
      toDate: null,
      perPage: 10,
      sortDesc: true,
      currentPage: 1,
      contract,
      isGetHistory: false,
      filter: null,
      filterOn: [],
      sortBy: 'time',
    }
  },
  mixins: [web3Mixin],
  computed: {
    rows() {
      return this.logs.length
    },
  },
  methods: {
    searchHandler() {
      this.logs = []
      this.getHistory()
    },

    connectMoralis() {
      let serverUrl = process.env.VUE_APP_MORALIS_SERVERURL_BSC
      let appId = process.env.VUE_APP_MORALIS_APPID_BSC
      if (this.selectedNetwork === networks[1]) {
        serverUrl = process.env.VUE_APP_MORALIS_SERVERURL_BSC_TESTNET
        appId = process.env.VUE_APP_MORALIS_APPID_BSC_TESTNET
      }
      Moralis.start({ serverUrl, appId }).then(() => console.log('Connected'))
    },

    async getHistory() {
      this.connectMoralis()
      const params = {
        address: this.address,
      }
      return Moralis.Cloud.run('getTransferHistory', params).then((res) => {
        this.isGetHistory = true
        this.logs = this.formatData(res)
      })
    },

    getTokenMetadata(address) {
      if (address === this.contract.usdc) return 'USDC'
      else if (address === this.contract.vref) return 'VREF'
      else return address
    },

    truncate(text) {
      return text.slice(0, 15) + '...'
    },

    formatData(data) {
      const fields = [
        'block_timestamp',
        'value',
        'block_number',
        'transaction_hash',
        'transaction_index',
        'from_address',
        'to_address',
      ]
      return data.map((d) => {
        const result = {}
        fields.forEach((f) => {
          result[`${f}`] = d.get(f)
        })
        return {
          time: result.block_timestamp,
          value: (result.value / 10 ** 18).toFixed(2),
          transaction_hash: this.truncate(result.transaction_hash),
          from: this.truncate(result.from_address),
          to: this.truncate(result.to_address),
          token_symbol: this.getTokenMetadata(d.get('token_address')),
          link: `https://bscscan.com/tx/${result.transaction_hash}`,
        }
      })
    },
    onFiltered(filteredItems) {
      this.totalRows = filteredItems.length
      this.currentPage = 1
    },
  },
  filters: {
    formatContract(contract) {
      const vrefContract =
        '0x2b7cc0556f82a23e17ed47339081c0160ccc64fc'.slice(0, 15) + '...'
      if (contract === vrefContract) return 'ViRef Contract'
      return contract
    },
    formatTime(time) {
      return new Date(time).toDateString('en-gb')
    },
  },
}
</script>

<template>
  <Layout>
    <h2>History</h2>
    <div>
      <form class="mb-3 w-25">
        <label class="my-2 me-2 col-lg-1 col-sm-2" for="order-selectinput"
          >Network</label
        >
        <select
          v-model="selectedNetwork"
          class="form-select w-50"
          id="order-selectinput"
        >
          <option :value="networks[0]">BSC</option>
          <option :value="networks[1]">BSC Testnet</option>
        </select>
      </form>
    </div>
    <div>
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="Address"
        label-for="address"
      >
        <b-form-input
          class="d-inline"
          v-model="address"
          for="text"
          placeholder="Enter an address"
        ></b-form-input>
      </b-form-group>
      <b-button @click="searchHandler" variant="primary">Search</b-button>
      <div v-if="logs.length > 0" class="card mt-3">
        <div class="table-responsive mb-0">
          <b-table
            :items="logs"
            :head-variant="headVariant"
            :filter="filter"
            :per-page="perPage"
            :current-page="currentPage"
            :filter-included-fields="filterOn"
            :sort-by.sync="sortBy"
            :sort-desc.sync="sortDesc"
            @filtered="onFiltered"
            responsive="sm"
            tbody-tr-class="bsc-scan"
            thead-class="thead-class"
            hover
          >
            <template v-slot:cell(time)="data">
              <div class="custom-control">
                {{ data.item.time | formatTime }}
              </div>
            </template>

            <template v-slot:cell(value)="data">
              <div class="custom-control">
                {{ data.item.value }}
              </div>
            </template>

            <template v-slot:cell(block_number)="data">
              <div class="custom-control custom-checkbox">
                {{ data.item.block_number }}
              </div>
            </template>

            <template v-slot:cell(transaction_hash)="data">
              <div class="custom-control custom-checkbox truncate">
                <a :href="data.item.link" target="_blank">
                  {{ data.item.transaction_hash }}
                </a>
              </div>
            </template>

            <template v-slot:cell(from)="data">
              <div class="custom-control custom-checkbox truncate">
                {{ data.item.from | formatContract }}
              </div>
            </template>

            <template v-slot:cell(to)="data">
              <div class="custom-control custom-checkbox truncate">
                {{ data.item.to | formatContract }}
              </div>
            </template>

            <template v-slot:cell(token_symbol)="data">
              <div class="custom-control custom-checkbox">
                {{ data.item.token_symbol }}
              </div>
            </template>

            <template v-slot:cell(link)="data">
              <div class="custom-control custom-checkbox" id="hidden">
                <a :href="data.item.link" target="_blank">
                  {{ data.item.transaction_hash }}
                </a>
              </div>
            </template>
          </b-table>
        </div>
        <div class="col">
          <div class="dataTables_paginate paging_simple_numbers float-end">
            <ul class="pagination pagination-rounded mb-0">
              <!-- pagination -->
              <b-pagination
                v-model="currentPage"
                :total-rows="rows"
                :per-page="perPage"
              ></b-pagination>
            </ul>
          </div>
        </div>
      </div>
      <div v-else-if="logs.length === 0 && this.isGetHistory" class="mt-3">
        <b-alert variant="danger" show> No records found </b-alert>
      </div>
    </div>
  </Layout>
</template>

<style>
#hidden {
  display: none;
}
.thead-class tr th:first-of-type {
  width: 10%;
}
.thead-class tr th:last-of-type {
  display: none;
}

.truncate {
  width: 80%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
