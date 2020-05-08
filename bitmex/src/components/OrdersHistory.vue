<template>
  <div>
    <h3>OrdersHistory</h3>
    <b-table striped hover :items="ordersList"></b-table>
  </div>

</template>

<script>
import { BTable } from 'bootstrap-vue';
import { FETCH_ORDERS_HISTORY, MY_WS_URL, UPDATE_ORDERS_HISTORY } from '../constants';

export default {
  name: 'OrdersHistory',
  components: {
    BTable,
  },
  beforeMount() {
    this.$store.dispatch(FETCH_ORDERS_HISTORY);
  },
  mounted() {
    this.ws = new WebSocket(MY_WS_URL);
    this.ws.onopen = () => {
      this.ws.send('get orders');
      this.ws.onmessage = (response) => {
        const { data } = response;
        if (data) {
          this.$store.commit(UPDATE_ORDERS_HISTORY, JSON.parse(data));
        }
      };
    };
  },
  computed: {
    ordersList() {
      return this.$store.getters.ordersHistory;
    },
  },
};
</script>
