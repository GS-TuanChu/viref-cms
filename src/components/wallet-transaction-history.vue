<script>
import { constructUserObject } from '@/helpers/users'
import campaignsMixin from '@/mixins/campaigns'
import vClickOutside from 'v-click-outside'
import Chart from '@/views/pages/dashboard/token-transactions'
import Calendar from '@/components/calendar'
import errorMixin from '@/mixins/error'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  name: 'WalletTransactionHistory',
  components: { Chart, Calendar },
  mixins: [campaignsMixin, errorMixin],
  data() {
    return {
      user: null,
      campaign: null,
      uid: null,
      cid: null,
      selectedCurrency: null,
      walletTxData: [],
      walletHistoryData: {},
      walletTxHistoryDetails: [],
      fields: [
        'walletTransactionId',
        'campaign',
        'campaignOwner',
        // 'contact',
        'amount',
        'transactionDate',
        'note',
      ],
      meta: {},
      searchUsers: [],
      searchCampaigns: [],
      dateRange: [],
      currencyList: [],
      userSearchModalOpened: false,
      campaignSearchModalOpened: false,
      animated: true,
      isSearching: false,
      isSearchingToken: false,
      isSearchingUser: false,
      isSearchingCampaign: false,
      isSelectedUser: false,
      isSelectedCampaign: false,
      isDisabledCampaignInput: false,
    }
  },
  props: {
    params: Object,
  },
  computed: {
    currencyOptions() {
      const options = []
      this.currencyList.forEach((currency) => {
        const option = {
          value: currency.id,
          text: currency.name,
        }
        options.push(option)
      })
      return options
    },
    isBtnDisabled() {
      if (this.selectedCurrency) {
        if (!this.uid) return true
      } else {
        if (!this.uid || !this.cid) return true
      }
      if (this.isSearchingToken) return true
      return false
    },
  },
  watch: {
    selectedCurrency(newValue) {
      this.campaign = null
      newValue
        ? (this.isDisabledCampaignInput = true)
        : (this.isDisabledCampaignInput = false)
    },
    user(newValue) {
      if (!newValue) this.uid = null
      if (newValue && !this.isSelectedUser) {
        this.userSearchModalOpened = true
        this.isSearchingUser = true
        this.isSearching = true
        setTimeout(() => (this.isSearchingUser = false), 2000)
      }
      this.isSelectedUser = false
    },
    campaign(newValue) {
      if (!newValue) this.cid = null
      if (newValue && !this.isSelectedCampaign) {
        this.campaignSearchModalOpened = true
        this.isSearchingCampaign = true
        this.isSearching = true
        setTimeout(() => (this.isSearchingCampaign = false), 2000)
      }
      this.isSelectedCampaign = false
    },
    isSearchingUser(newValue) {
      if (!newValue) {
        this.searchUserHandler(this.user)
      }
    },
    isSearchingCampaign(newValue) {
      if (!newValue) {
        this.searchCampaignHandler(this.campaign)
      }
    },
  },
  created() {
    this.fetchInitWalletTxHistory()
    this.getCurrencyList()
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  methods: {
    async getCurrencyList() {
      this.$parse.getCurrencyList().then((res) =>
        res.forEach((currency) => {
          this.currencyList.push(currency)
        })
      )
    },
    async fetchInitWalletTxHistory() {
      if (this.params) {
        this.fetchWalletTxHistoryByCampaign(this.params)
      }
    },
    setDateRange(value) {
      this.dateRange = value
    },
    async searchUserHandler(text) {
      const searchText = text.trim()
      if (searchText) {
        this.isSearching = true
        this.userSearchModalOpened = true
        this.$parse
          .searchUser({ searchText })
          .then((res) => {
            this.searchUsers = constructUserObject(res)
            this.isSearching = false
            console.log(this.searchUsers)
          })
          .catch((error) => console.log(error))
      } else this.userSearchModalOpened = false
      this.searchUsers.splice(0, this.searchUsers.length)
    },
    async searchCampaignHandler(text) {
      const searchText = text.trim()
      if (searchText) {
        this.isSearching = true
        this.campaignSearchModalOpened = true
        this.$parse.searchCampaign({ searchText }).then((res) => {
          this.searchCampaigns = this.constructCampaignObject(res.campaigns)
          this.isSearching = false
        })
      } else this.userSearchModalOpened = false
      this.searchCampaigns.splice(0, this.searchCampaigns.length)
    },
    // user selected from the search results
    selectUser(item) {
      this.isSelectedUser = true
      this.user = item.username
      this.uid = item.uid
      this.userSearchModalOpened = false
      this.campaignSearchModalOpened = false
    },
    selectCampaign(item) {
      this.isSelectedCampaign = true
      this.campaign = item.name
      this.cid = item.id
      this.campaignSearchModalOpened = false
      this.userSearchModalOpened = false
    },
    onClickOutsideUserInput() {
      this.userSearchModalOpened = false
      this.isSearching = false
    },
    onClickOutsideCampaignInput() {
      this.campaignSearchModalOpened = false
      this.isSearching = false
    },
    toggle(event) {
      const title = event.target.title
      if (title === 'user' && this.searchUsers.length) {
        this.userSearchModalOpened = true
        this.campaignSearchModalOpened = false
      }
      if (title === 'campaign' && this.searchCampaigns.length) {
        this.campaignSearchModalOpened = true
        this.userSearchModalOpened = false
      }
    },
    async searchHandler() {
      if (!this.selectedCurrency) {
        if (!this.uid || !this.cid) return
        const params = {
          uid: this.uid,
          cid: this.cid,
          fromDate: this.dateRange[0],
          toDate: this.dateRange[1],
        }
        this.fetchWalletTxHistoryByCampaign(params)
      } else {
        if (!this.uid) return
        this.isSearchingToken = true
        const params = {
          uid: this.uid,
          currencyId: this.selectedCurrency,
          fromDate: this.dateRange[0],
          toDate: this.dateRange[1],
        }
        this.getWalletTxHistory(params)
      }
    },
    fetchWalletTxHistoryByCampaign(params) {
      this.isSearchingToken = true
      this.isDisabledCampaignInput = true
      this.$parse
        .getWalletTxHistoryByCampaign(params)
        .then((res) => {
          console.log(res)
          this.walletHistoryData = res
          this.walletTxData = res.results
          this.isSearchingToken = false
          this.isDisabledCampaignInput = false
          this.walletTxHistoryDetails = res.details
          this.meta = res.meta
          if (this.meta) {
            this.isSelectedUser = true
            this.isSelectedCampaign = true
            this.campaign = this.meta.campaign
            this.user = this.meta.username
            this.uid = this.meta.uid
            this.cid = this.meta.cid
          }
        })
        .catch((error) => {
          this.isSearchingToken = false
          this.isDisabledCampaignInput = false
          this.errorAlert(error)
          console.log(error)
        })
    },
    getWalletTxHistory(params) {
      this.$parse
        .getWalletTxHistory(params)
        .then((res) => {
          this.isSearchingToken = false
          this.walletHistoryData = res
          this.walletTxHistoryDetails = res.details
        })
        .catch((error) => {
          this.isSearchingToken = false
          this.errorAlert(error)
          console.log(error)
        })
    },
  },
}
</script>

<template>
  <div>
    <div class="row">
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="Time"
        label-for="time"
      >
        <div class="position-relative col-md-3">
          <Calendar @date="setDateRange" :hide-filter-btn="true" />
        </div>
      </b-form-group>
    </div>
    <div class="row">
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="Currency"
        label-for="currency"
      >
        <div class="col-md-3 col-lg-3">
          <b-form-select v-model="selectedCurrency" :options="currencyOptions">
            <template #first>
              <b-form-select-option :value="null"
                >-- Select a currency --</b-form-select-option
              >
            </template>
          </b-form-select>
        </div>
      </b-form-group>
    </div>
    <!-- Search User -->
    <div class="row">
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="User"
        label-for="user"
      >
        <div class="position-relative col-md-6 col-lg-3">
          <b-form-input
            autocomplete="off"
            v-click-outside="onClickOutsideUserInput"
            for="text"
            title="user"
            type="search"
            v-model.trim="user"
            placeholder="Enter username"
            @click="toggle"
            :disabled="isSearchingToken"
          ></b-form-input>
          <div
            v-if="userSearchModalOpened"
            class="search-results form-control card position-absolute mt-1 overflow-auto"
          >
            <div v-if="isSearching" class="text-center">
              <b-spinner
                class="m-2"
                variant="primary"
                role="status"
              ></b-spinner>
            </div>
            <div v-if="!isSearching && searchUsers.length">
              <template v-for="(item, index) of searchUsers">
                <div
                  :key="index"
                  class="search-results-item"
                  @click="selectUser(item)"
                >
                  <span role="button">
                    {{ item.username }}
                  </span>
                </div>
              </template>
            </div>
            <div v-if="!isSearching && !searchUsers.length" class="text-center">
              No Results found
            </div>
          </div>
        </div>
      </b-form-group>
    </div>
    <!-- Search Campaign -->
    <div class="row">
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="Campaign"
        label-for="user"
      >
        <div class="position-relative col-md-6 col-lg-3">
          <b-form-input
            autocomplete="off"
            v-click-outside="onClickOutsideCampaignInput"
            for="text"
            title="campaign"
            type="search"
            v-model="campaign"
            placeholder="Enter campaign"
            @click="toggle"
            :disabled="isDisabledCampaignInput"
          ></b-form-input>
          <div
            v-if="campaignSearchModalOpened"
            class="search-results form-control card position-absolute mt-1 overflow-auto"
          >
            <div v-if="isSearching" class="text-center">
              <b-spinner
                class="m-2"
                variant="primary"
                role="status"
              ></b-spinner>
            </div>
            <div v-if="!isSearching && searchCampaigns.length">
              <template v-for="(item, index) of searchCampaigns">
                <div :key="index" class="search-results-item">
                  <span role="button" @click="selectCampaign(item)">
                    {{ item.name }}
                  </span>
                </div>
              </template>
            </div>
            <div
              v-if="!isSearching && !searchCampaigns.length"
              class="text-center"
            >
              No Results found
            </div>
          </div>
        </div>
      </b-form-group>
    </div>
    <div class="row">
      <div class="col-md-3">
        <b-button
          @click="searchHandler"
          variant="primary"
          :disabled="isBtnDisabled"
          >Search</b-button
        >
      </div>
    </div>

    <div class="row mt-3">
      <template v-if="isSearchingToken">
        <b-skeleton width="50%" :animated="animated"></b-skeleton>
        <b-skeleton width="75%" :animated="animated"></b-skeleton>
        <b-skeleton width="95%" :animated="animated"></b-skeleton>
      </template>
      <div v-show="!isSearchingToken && Object.keys(walletHistoryData).length">
        <Chart class="card" :data-object="walletHistoryData" />
        <br />
        <div class="d-inline-block">
          <ExportCSV class="mb-3" :data="walletTxHistoryDetails">
            <b-button variant="primary">Export to CSV</b-button>
          </ExportCSV>
        </div>
        <div class="card">
          <b-table striped :items="walletTxHistoryDetails" :fields="fields">
            <template #cell(walletTransactionId)="data">
              {{ data.item.id }}
            </template>
            <template #cell(transactionDate)="data">
              {{ data.item.date }}
            </template>
            <template #cell(note)="data">
              {{ data.item.note }}
            </template>
          </b-table>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.search-results {
  max-height: 100px;
  z-index: 1;
}
.search-results-item {
  color: grey;
}
.search-results-item:hover {
  color: black;
  cursor: pointer;
}
</style>
