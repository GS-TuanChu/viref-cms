<script>
import Layout from '../../layouts/main'
import TransactionHistory from '@/components/transaction-history'
import TokenTransactionHistory from '@/components/token-transaction-history'
import { userComputed } from '@/state/helpers'

export default {
  page: {
    title: 'History',
  },
  components: { Layout, TransactionHistory, TokenTransactionHistory },
  data() {
    return {
      title: 'History',
      tabIndex: this.$route.params.tabIndex || 0,
    }
  },
  computed: {
    ...userComputed,
  },
}
</script>

<template>
  <Layout>
    <h2>History</h2>
    <div>
      <b-tabs v-model="tabIndex" content-class="p-3 text-muted">
        <b-tab class="border-0">
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="fas fa-home"></i>
            </span>
            <span class="d-none d-sm-inline-block">Transaction</span>
          </template>
          <TransactionHistory />
        </b-tab>
        <b-tab>
          <template v-slot:title>
            <span class="d-inline-block d-sm-none">
              <i class="far fa-user"></i>
            </span>
            <span class="d-none d-sm-inline-block">Token Transaction</span>
          </template>
          <TokenTransactionHistory :params="this.$route.params.params" />
        </b-tab>
      </b-tabs>
    </div>
  </Layout>
</template>

<style>
.w-10 {
  width: 10%;
}

.w-30 {
  width: 30%;
}

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
