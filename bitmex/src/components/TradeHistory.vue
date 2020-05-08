<template>
  <div>
    <h3>TradeHistory</h3>
    <b-table striped hover :items="tradeList"></b-table>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import { WSS_URL, UPDATE_TRADE_HISTORY } from '../constants';

export default {
  name: 'TradeHistory',
  components: {
    BTable,
  },
  data() {
    return {
      ws: '',
      symbol: '',
    };
  },
  mounted() {

  },
  computed: {
    tradeList() {
      return this.$store.getters.tradeHistory;
    },
    activeSymbol() {
      return this.$store.getters.activeSymbol;
    },
  },
  updated() {
    if (this.symbol !== this.activeSymbol) {
      this.symbol = this.activeSymbol;
      if (this.ws) {
        this.ws.send('{"op": "unsubscribe"');
      }

      this.ws = new WebSocket(WSS_URL);
      this.ws.onopen = () => {
        this.ws.send(`{"op": "subscribe", "args": "tradeBin1m:${this.symbol}"}`);
        this.ws.onmessage = (response) => {
          const { data } = JSON.parse(response.data);
          if (data) {
            this.$store.commit(UPDATE_TRADE_HISTORY, [...data]);
          }
        };
      };
    }
  },
  destroyed() {
    this.ws.unsubscribe();
  },
};
</script>
