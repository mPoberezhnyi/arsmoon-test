<template>
  <b-container>
    <main-header />
    <b-row>
      <b-col sm="12" md="6" lg="3" order-lg="1">
        <active-instruments />
      </b-col>
      <b-col sm="12" md="6" lg="3" order-lg="3">
        <order-create />
      </b-col>
      <b-col sm="12" lg="6" order-lg="2">
        <trade-history />
      </b-col>
    </b-row>
    <orders-history />
  </b-container>
</template>
<script>
import { BContainer, BRow, BCol } from 'bootstrap-vue';
import MainHeader from './components/MainHeader.vue';
import TradeHistory from './components/TradeHistory.vue';
import OrderCreate from './components/OrderCreate.vue';
import OrdersHistory from './components/OrdersHistory.vue';
import ActiveInstruments from './components/ActiveInstruments.vue';

export default {
  name: 'App',
  components: {
    BContainer,
    BRow,
    BCol,
    MainHeader,
    ActiveInstruments,
    TradeHistory,
    OrderCreate,
    OrdersHistory,
  },
};
</script>
