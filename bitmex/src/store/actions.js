import request from '../request';
import {
  SET_INSTRUMENTS, SET_ACTIVE_SYMBOL, SET_TRADE_HISTORY, SET_ORDERS_HISTORY, SET_USER_NAME,
} from '../constants';

export default {
  async getUserName({ commit }) {
    try {
      const { data } = await request('GET', '/user');
      commit(SET_USER_NAME, data.username);
    } catch (e) {
      commit(SET_USER_NAME, '');
    }
  },
  async fetchInstruments({ commit }) {
    try {
      const { data } = await request('GET', '/instrument/active');
      commit(SET_INSTRUMENTS, data);
    } catch (e) {
      commit(SET_INSTRUMENTS, []);
    }
  },
  async fetchTradeHistory({ commit }, symbol) {
    try {
      const { data } = await request('GET', `/trade/bucketed?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`);
      commit(SET_TRADE_HISTORY, [...data]);
      commit(SET_ACTIVE_SYMBOL, symbol);
    } catch (e) {
      commit(SET_TRADE_HISTORY, []);
    }
  },
  async createOrder(state, order) {
    try {
      await request('POST', '/order', order);
    } catch (e) {
      console.log(e);
    }
  },
  async fetchOrdersHistory({ commit }) {
    try {
      const { data } = await request('GET', '/order');
      commit(SET_ORDERS_HISTORY, data);
    } catch (e) {
      commit(SET_ORDERS_HISTORY, []);
    }
  },
};
