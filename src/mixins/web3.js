import Web3 from "web3";
const Web3Modal = require("web3modal").default;
const WalletConnectProvider = require("@walletconnect/web3-provider").default;
export default {
  methods: {
    async connectWallet() {
      const providerOptions = {
        walletconnect: {
          package: WalletConnectProvider, // required
          options: {
            infuraId: "1a466cc6a1314f818035d806ffbf7f71", // required
          },
        },
      };
      this.web3Modal = new Web3Modal({
        // network: "mainnet", // optional
        cacheProvider: true, // optional
        providerOptions, // required
      });
      let provider;
      try {
        provider = await this.web3Modal.connect();
      } catch (e) {
        console.log("Could not get a wallet connection", e);
        return;
      }
      window.web3 = new Web3(provider);
      // getAccounts().then((accounts) => {
      //     this.accounts = accounts;
      // });
      return true;
    },

    getLogs() {
      return Promise.all([
        this.getLogsEvent("buy"),
        this.getLogsEvent("sell"),
      ]).then((values) => {
        let txs = [...values[0], ...values[1]];
        txs.sort(function(x, y) {
          if (
            x.blockNumber < y.blockNumber ||
            (x.blockNumber == y.blockNumber &&
              x.transactionIndex < y.transactionIndex)
          )
            return -1;
          return 1;
        });
        this.transactions = txs;
        return true;
      });
    },

    getLogsEvent(event) {
      return this.VREF.getPastEvents(event, {
        fromBlock: 0,
        toBlock: "latest",
      })
        .then((results) => {
          return results.map((r) => ({
            blockNumber: r.blockNumber,
            event: r.event,
            transactionHash: r.transactionHash,
            transactionIndex: r.transactionIndex,
            data: {
              address: r.returnValues._address,
              amount: r.returnValues._amount,
            },
          }));
        })
        .catch((err) => {
          console.log(err);
          return [];
        });
    },
  },
};
