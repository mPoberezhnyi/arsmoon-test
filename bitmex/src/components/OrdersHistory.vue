<template>
  <div>
    <h3>OrdersHistory</h3>
    <b-table striped hover :items="ordersList"></b-table>
  </div>

</template>

<script>
import crypto from 'crypto';
import { BTable } from 'bootstrap-vue';
import {
  FETCH_ORDERS_HISTORY,
  API_KEY,
  API_SECRET,
  BITMEX_WWS_URL,
  UPDATE_ORDERS_HISTORY,
} from '../constants';

export default {
  name: 'OrdersHistory',
  components: {
    BTable,
  },
  beforeMount() {
    this.$store.dispatch(FETCH_ORDERS_HISTORY);
  },
  mounted() {
    const expires = Math.round(new Date().getTime() / 1000) + 60;
    const signature = crypto
      .createHmac('sha256', API_SECRET)
      .update(`GET/realtime${expires}`)
      .digest('hex');


    this.ws = new WebSocket(BITMEX_WWS_URL);
    this.ws.onopen = () => {
      const authWebSocketsObject = {
        op: 'authKeyExpires',
        args: [API_KEY, expires, signature],
      };

      this.ws.send(JSON.stringify(authWebSocketsObject));
      this.ws.onmessage = (authResponse) => {
        const { success } = JSON.parse(authResponse.data);

        if (success) {
          this.ws.send('{"op": "subscribe", "args": ["order"]}');

          this.ws.onmessage = (orderUpdateResponse) => {
            const data = JSON.parse(orderUpdateResponse.data);

            if (data.data && data.data.length) {
              this.$store.commit(UPDATE_ORDERS_HISTORY, data.data);
            }
          };
        }
      };
    };
  },
  computed: {
    ordersList() {
      return this.$store.getters.ordersHistory;
    },
  },
  destroyed() {
    this.ws.send('{"op": "unsubscribe"');
    this.ws.close();
  },
};
</script>
