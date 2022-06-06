<script>
import Layout from '../../layouts/main'
import PageHeader from '@/components/page-header'
import appConfig from '@/app.config'

// import Stat from '@/components/widgets/stat'
// import SalesAnalytics from './sales-analytics'
import TokenTransactions from './token-transactions'
import UsersAnalytics from './users-analytics'
// import CampaignAnalytics from './campaign-analytics'
import Calendar from '@/components/calendar'

export default {
  page: {
    title: 'Dashboard',
    meta: [
      {
        name: 'description',
        content: appConfig.description,
      },
    ],
  },
  components: {
    Layout,
    PageHeader,
    TokenTransactions,
    UsersAnalytics,
    // CampaignAnalytics,
    Calendar,
  },
  data() {
    return {
      title: 'Dashboard',
      dateRange: [],
      statisticUserChartOptions: {},
      tokenTransactionData: {},
      userData: {},
      campaignData: {},
      totalTokenTransaction: 0,
      totalUser: 0,
      totalCampaign: 0,
    }
  },

  computed: {
    newTokenTransaction() {
      return (
        (this.tokenTransactionData.counts &&
          this.tokenTransactionData.counts.reduce(
            (prev, curr) => prev + curr,
            0
          )) ||
        0
      )
    },
    newUsers() {
      return (
        (this.userData.counts &&
          this.userData.counts.reduce((prev, curr) => prev + curr, 0)) ||
        0
      )
    },
  },
  created() {
    this.getTokenTransactions()
    this.getUsers()
    this.getTotalTokenTransaction()
    this.getTotalUser()
    this.getTotalCampaign()
  },
  methods: {
    setDateRange(value) {
      this.dateRange = value
    },
    getTotalTokenTransaction() {
      this.$parse
        .getTotalTokenTransaction()
        .then((res) => (this.totalTokenTransaction = res.total))
    },
    getTotalUser() {
      this.$parse.getTotalUser().then((res) => (this.totalUser = res.total))
    },
    getTotalCampaign() {
      this.$parse
        .getTotalCampaign()
        .then((res) => (this.totalCampaign = res.total))
    },
    getDataOnDateRange() {
      this.getTokenTransactions(this.dateRange[0], this.dateRange[1])
      this.getUsers(this.dateRange[0], this.dateRange[1])
    },
    getTokenTransactions(fromDate = null, toDate = null) {
      this.$parse
        .getTokenTxHistories({
          fromDate,
          toDate,
        })
        .then((res) => {
          this.tokenTransactionData = res
        })
    },
    getUsers(fromDate = null, toDate = null) {
      this.$parse.getUsers({ fromDate, toDate }).then((res) => {
        this.userData = res
      })
    },
  },
}
</script>

<template>
  <Layout>
    <PageHeader :title="title" />
    <!-- <Stat /> -->
    <div class="row">
      <Calendar @date="setDateRange" @submitted="getDataOnDateRange" />
    </div>
    <div class="row mt-3">
      <div class="col-md-4 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5>Total Transactions</h5>
            <div>
              <p class="text-muted mb-0">
                {{ totalTokenTransaction }} Token Transactions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5>Total Users</h5>
            <div>
              <p class="text-muted mb-0">{{ totalUser }} Users</p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5>Total Campaigns</h5>
            <div>
              <p class="text-muted mb-0">{{ totalCampaign }} Campaigns</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-4 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5>New Token Transactions</h5>
            <div>
              <p class="text-muted mb-0">
                {{ newTokenTransaction }} Transactions
              </p>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-4 col-xl-3">
        <div class="card">
          <div class="card-body">
            <h5>New Users</h5>
            <div>
              <p class="text-muted mb-0">{{ newUsers }} Users</p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-2 col-xl-4">
        <div class="card">
          <TokenTransactions :data-object="tokenTransactionData" />
        </div>
      </div>
      <div class="col-md-2 col-xl-4">
        <div class="card">
          <UsersAnalytics :data-object="userData" />
        </div>
      </div>
      <!-- <div class="col-md-2 col-xl-4"> -->
      <!--   <div class="card"> -->
      <!--     <CampaignAnalytics :data-object="campaignData" /> -->
      <!--   </div> -->
      <!-- </div> -->
    </div>
    <div class="row"></div>
  </Layout>
</template>
