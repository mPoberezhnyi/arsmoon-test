<template>
  <div>
    <h3>TradeHistory</h3>
    <b-table striped hover :items="tradeList"></b-table>
  </div>
</template>

<script>
import { BTable } from 'bootstrap-vue';
import { BITMEX_WWS_URL, UPDATE_TRADE_HISTORY } from '../constants';

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
    isNewSymbol() {
      return this.symbol !== this.activeSymbol;
    },
  },
  updated() {
    if (this.isNewSymbol) {
      this.symbol = this.activeSymbol;
      if (this.ws) {
        this.ws.send('{"op": "unsubscribe"');
        this.ws.close();
      }

      this.ws = new WebSocket(BITMEX_WWS_URL);
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
    this.ws.send('{"op": "unsubscribe"');
    this.ws.close();
  },
};
</script>
