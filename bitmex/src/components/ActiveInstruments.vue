<template>
  <div>
    <h3>ActiveInstruments</h3>
    <b-row v-for="(item, index) in instruments"
           :key="index"
           @click="onClickTrade(item.symbol)">
      <b-col>{{ item.symbol }}</b-col>
      <b-col>{{ item.lastPrice }}</b-col>
    </b-row>
  </div>
</template>

<script>
import { BRow, BCol } from 'bootstrap-vue';
import {
  WSS_URL, FETCH_INSTRUMENTS, FETCH_TRADE_HISTORY, UPDATE_INSTRUMENTS,
} from '../constants';

export default {
  name: 'ActiveInstruments',
  components: {
    BRow, BCol,
  },
  data() {
    return {
      ws: '',
    };
  },
  beforeMount() {
    this.$store.dispatch(FETCH_INSTRUMENTS);
  },
  mounted() {
    this.ws = new WebSocket(WSS_URL);
    this.ws.onopen = () => {
      this.ws.send('{"op": "subscribe", "args": "instrument"}');
      this.ws.onmessage = (response) => {
        const { data } = JSON.parse(response.data);

        if (data) {
          this.$store.commit(UPDATE_INSTRUMENTS, data);
        }
      };
    };
  },
  methods: {
    onClickTrade(symbol) {
      this.$store.dispatch(FETCH_TRADE_HISTORY, symbol);
    },
  },
  computed: {
    instruments() {
      return this.$store.getters.instruments;
    },
  },
  destroyed() {
    this.ws.send('{"op": "unsubscribe"');
  },
};
</script>

<style lang="scss" scoped>
  .row {
    transition: .5s ease-in-out;
    cursor: pointer;

    &:hover {
      transform: scale(1.03)
    }

    &:nth-child(even) {
      background-color: rgba(195,195,195,0.25);

      &:hover {
        box-shadow: 3px 3px 5px rgba(195,195,195,0.25);
      }
    }
  }
</style>
