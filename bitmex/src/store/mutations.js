import dayjs from 'dayjs';

const transformTradeHistory = (payload) => payload.map(({
  timestamp, open, high, low, close, grossValue,
}) => ({
  timestamp: dayjs(timestamp).format('HH:mm:ss DD.MM.YYYY'),
  open,
  high,
  low,
  close,
  grossValue,
}));

export default {
  setUserName(state, payload) {
    state.userName = payload;
  },
  setInstruments(state, payload) {
    state.instruments = payload;
  },
  updateInstruments(state, instruments) {
    instruments.forEach((item) => {
      const idx = state.instruments.findIndex(({ symbol }) => symbol === item.symbol);

      if (idx !== -1) {
        state.instruments = [
          ...state.instruments.slice(0, idx),
          {
            ...state.instruments[idx],
            ...item,
          },
          ...state.instruments.slice(idx + 1),
        ];
      }
    });
  },
  setTradeHistory(state, payload) {
    if (payload.length) {
      state.tradeHistory = transformTradeHistory(payload);
    } else {
      state.tradeHistory = payload;
    }
  },
  updateTradeHistory(state, history) {
    const newHistory = [
      ...history,
      ...state.tradeHistory,
    ];

    state.tradeHistory = transformTradeHistory(newHistory.slice(0, 100));
  },
  setOrdersHistory(state, payload) {
    if (payload.length) {
      state.ordersHistory = payload.map(
        ({
          orderID, symbol, orderQty, timestamp, side, price, ordStatus,
        }) => ({
          orderID,
          symbol,
          orderQty,
          timestamp: dayjs(timestamp).format('HH:mm:ss DD.MM.YYYY'),
          side,
          price,
          ordStatus,
        }),
      );
    } else {
      state.ordersHistory = payload;
    }
  },
  updateOrdersHistory(state, payload) {
    payload.forEach((item) => {
      const idx = state.ordersHistory.findIndex(({ orderID }) => orderID === item.orderID);

      if (idx !== -1) {
        state.ordersHistory = [
          ...state.ordersHistory.slice(0, idx),
          {
            ...state.ordersHistory[idx],
            ...{
              ...item,
              timestamp: dayjs(item.timestamp).format('HH:mm:ss DD.MM.YYYY'),
            },
          },
          ...state.ordersHistory.slice(idx + 1),
        ];
      } else {
        state.ordersHistory = [
          ...state.ordersHistory,
          {
            ...item,
            timestamp: dayjs(item.timestamp).format('HH:mm:ss DD.MM.YYYY'),
          },
        ];
      }
    });
  },
  setActiveSymbol(state, payload) {
    state.activeSymbol = payload;
  },
};
