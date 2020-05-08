import axios from 'axios';
import {
  API_URL, SET_INSTRUMENTS, SET_ACTIVE_SYMBOL, SET_TRADE_HISTORY, SET_ORDERS_HISTORY, SET_USER_NAME,
} from '../constants';

export default {
  async getUserName({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/user`);
      commit(SET_USER_NAME, data.username);
    } catch (e) {
      commit(SET_USER_NAME, '');
    }
  },
  async fetchInstruments({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/instrument/active`);
      commit(SET_INSTRUMENTS, [...data]);
    } catch (e) {
      commit(SET_INSTRUMENTS, []);
    }
  },
  async fetchTradeHistory({ commit }, symbol) {
    try {
      const { data } = await axios.get(`${API_URL}/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`);
      commit(SET_TRADE_HISTORY, [...data]);
      commit(SET_ACTIVE_SYMBOL, symbol);
    } catch (e) {
      commit(SET_TRADE_HISTORY, []);
    }
  },
  async createOrder(state, order) {
    try {
      await axios.post(`${API_URL}/order`, order);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchOrdersHistory({ commit }) {
    try {
      const { data } = await axios.get(`${API_URL}/order`);
      commit(SET_ORDERS_HISTORY, [...data]);
    } catch (e) {
      commit(SET_ORDERS_HISTORY, []);
    }
  },
};
