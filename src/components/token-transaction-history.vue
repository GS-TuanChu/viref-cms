<script>
import usersMixin from '@/mixins/users'
import campaignsMixin from '@/mixins/campaigns'
import vClickOutside from 'v-click-outside'
import Chart from '@/views/pages/dashboard/token-transactions'
import Calendar from '@/components/calendar'
import 'bootstrap-vue/dist/bootstrap-vue.css'

export default {
  components: { Chart, Calendar },
  data() {
    return {
      user: null,
      campaign: null,
      uid: null,
      cid: null,
      tokenTxData: [],
      tokenHistoryData: {},
      meta: {},
      searchUsers: [],
      searchCampaigns: [],
      dateRange: [],
      userSearchModalOpened: false,
      campaignSearchModalOpened: false,
      animated: true,
      isSearching: false,
      isSearchingToken: false,
      isSearchingUser: false,
      isSearchingCampaign: false,
      isSelectedUser: false,
      isSelectedCampaign: false,
    }
  },
  props: {
    params: Object,
  },
  watch: {
    user(newValue) {
      if (newValue && !this.isSelectedUser) {
        this.userSearchModalOpened = true
        this.isSearchingUser = true
        this.isSearching = true
        setTimeout(() => (this.isSearchingUser = false), 2000)
      }
      this.isSelectedUser = false
    },
    campaign(newValue) {
      if (newValue && !this.isSelectedCampaign) {
        this.campaignSearchModalOpened = true
        this.isSearchingCampaign = true
        this.isSearching = true
        setTimeout(() => (this.isSearchingCampaign = false), 2000)
      }
      this.isSelectedCampaign = false
    },
    isSearchingUser(value) {
      if (!value) {
        this.searchUserHandler(this.user)
      }
    },
    isSearchingCampaign(value) {
      if (!value) {
        this.searchCampaignHandler(this.campaign)
      }
    },
  },
  created() {
    this.fetchInitTokenTxHistory()
  },
  directives: {
    clickOutside: vClickOutside.directive,
  },
  mixins: [usersMixin, campaignsMixin],
  methods: {
    async fetchInitTokenTxHistory() {
      if (this.params) {
        this.fetchTokenTxHistory(this.params)
      }
    },
    setDateRange(value) {
      this.dateRange = value
    },
    fetchTokenTxHistory(params) {
      this.isSearchingToken = true
      this.$parse.getTokenTxHistory(params).then((res) => {
        this.tokenHistoryData = res
        this.tokenTxData = res.results
        this.isSearchingToken = false
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
    },
    async searchUserHandler(text) {
      const searchText = text.trim()
      if (searchText) {
        this.isSearching = true
        this.userSearchModalOpened = true
        this.$parse.searchUser({ searchText }).then((res) => {
          this.searchUsers = this.constructUserObject(res)
          this.isSearching = false
        })
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
    selectUser(item) {
      this.isSelectedUser = true
      this.user = item.username
      this.uid = item.id
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
    onClickOutside() {
      this.userSearchModalOpened = false
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
      if (!this.uid || !this.cid) return
      const params = {
        uid: this.uid,
        cid: this.cid,
        fromDate: this.dateRange[0],
        toDate: this.dateRange[1],
      }
      this.fetchTokenTxHistory(params)
    },
  },
}
</script>

<template>
  <div v-click-outside="onClickOutside">
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
    <!-- Search User -->
    <div class="row">
      <b-form-group
        class="mb-3"
        label-cols-sm="2"
        label-cols-lg="1"
        label="User"
        label-for="user"
      >
        <div class="position-relative col-md-3">
          <b-form-input
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
        <div class="position-relative col-md-3">
          <b-form-input
            for="text"
            title="campaign"
            type="search"
            v-model="campaign"
            placeholder="Enter campaign"
            @click="toggle"
            :disabled="isSearchingToken"
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
          :disabled="isSearchingToken"
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
      <div v-show="!isSearchingToken && Object.keys(tokenHistoryData).length">
        <Chart class="card" :data-object="tokenHistoryData" />
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
