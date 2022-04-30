<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import appConfig from "@/app.config";
import { notificationMethods } from "@/state/helpers";
const Web3 = require("web3");
const Web3Modal = require("web3modal").default;
const WalletConnectProvider = require("@walletconnect/web3-provider").default;

export default {
  name: "app",
  page: {
    // All subcomponent titles will be injected into this template.
    titleTemplate(title) {
      title = typeof title === "function" ? title(this.$store) : title;
      return title ? `${title} | ${appConfig.title}` : appConfig.title;
    },
  },
  methods: {
    clearNotification: notificationMethods.clear,
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
      this.getAccounts().then((accounts) => {
        this.accounts = accounts;
      });
      return true;
      // }
      // return false;
    },
    async disconnectWallet() {
      await this.web3Modal.clearCachedProvider();
      window.location.reload();
    },
    async getAccounts() {
      if (window.ethereum)
        return window.ethereum.request({ method: "eth_accounts" });
      return [];
    },
    detectEthereum() {
      const { ethereum } = window;
      if (ethereum && ethereum.isMetaMask) {
        console.log("Ethereum successfully detected!");
        // Access the decentralized web!
      } else {
        console.log("Please install MetaMask!");
      }
    },
    async getCurrentNetwork() {
      const id = await window.web3.eth.net.getId();
      this.networkId = id;
    },
  },
  watch: {
    /**
     * Clear the alert message on route change
     */
    // eslint-disable-next-line no-unused-vars
    $route(to, from) {
      // clear alert on location change
      this.clearNotification();
    },
  },
  mounted() {
    // document.getElementsByTagName("html")[0].setAttribute("dir", "rtl");
    if (window.ethereum) {
      this.getAccounts()
        .then((accounts) => {
          if (accounts.length) return this.connectWallet();
        })
        .catch((e) => console.log(e))
        .finally(() => {
          this.loading = false;
        });
    } else {
      window.addEventListener("ethereum#initialized", this.detectEthereum, {
        once: true,
      });
      // If the event is not dispatched by the end of the timeout,
      // the user probably doesn't have MetaMask installed.
      setTimeout(this.detectEthereum, 3000); // 3 seconds
    }
  },
  updated() {
    // this.getCurrentNetwork();
    /*this.onChainChanged();*/
  },
};
</script>
