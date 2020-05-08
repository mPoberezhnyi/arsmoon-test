export const API_URL = 'http://localhost:5000/api/v1';
export const BITMEX_WWS_URL = 'wss://testnet.bitmex.com/realtime';
export const HISTORY_ORDERS_WS_URL = 'ws://localhost:5080';

// actions
export const FETCH_INSTRUMENTS = 'fetchInstruments';
export const FETCH_TRADE_HISTORY = 'fetchTradeHistory';
export const CREATE_ORDER = 'createOrder';
export const FETCH_ORDERS_HISTORY = 'fetchOrdersHistory';
export const UPDATE_ORDERS_HISTORY = 'updateOrdersHistory';
export const GET_USER_NAME = 'getUserName';
export const SET_USER_NAME = 'setUserName';

// mutations
export const SET_INSTRUMENTS = 'setInstruments';
export const UPDATE_INSTRUMENTS = 'updateInstruments';
export const SET_TRADE_HISTORY = 'setTradeHistory';
export const UPDATE_TRADE_HISTORY = 'updateTradeHistory';
export const SET_ORDERS_HISTORY = 'setOrdersHistory';
export const SET_ACTIVE_SYMBOL = 'setActiveSymbol';
