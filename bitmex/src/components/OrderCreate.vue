<template>
  <div>
    <h3>CreateOrder</h3>
    <b-form v-if="!!symbol">
      <b-form-group>
        <b-form-input
          v-model="value"
          required
          type="number"
          min="0"
          placeholder="Enter name"
        ></b-form-input>
      </b-form-group>
      <b-row>
        <b-col>
          <b-button type="submit"
                    @click.prevent="createOrder('Sell')"
                    block
                    variant="danger">
            Sell
          </b-button>
        </b-col>
        <b-col>
          <b-button type="submit"
                    @click.prevent="createOrder('Buy')"
                    block
                    variant="primary">
            Buy
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
import {
  BRow, BCol, BForm, BFormGroup, BFormInput, BButton,
} from 'bootstrap-vue';
import { CREATE_ORDER } from '../constants';

export default {
  name: 'CreateOrder',
  components: {
    BRow, BCol, BForm, BFormGroup, BFormInput, BButton,
  },
  data() {
    return {
      value: 0,
    };
  },
  computed: {
    symbol() {
      return this.$store.getters.activeSymbol;
    },
  },
  methods: {
    createOrder(side) {
      this.$store.dispatch(CREATE_ORDER, {
        ordType: 'Market',
        symbol: this.symbol,
        orderQty: this.value,
        side,
      });
    },
  },
};
</script>
