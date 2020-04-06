// Pages swich actions 
export const GO_HOME = "GO_HOME";
export const NAVIGATE_TO_URL = "NAVIGATE_TO_URL";
//export const SET_WINDOW_LOCATION = "SET_WINDOW_LOCATION";

// UI state action types
// src/redux/reducers/uiState.js
export const OPEN_CLEAR_ALERT = "OPEN_CLEAR_ALERT";
export const CLOSE_CLEAR_ALERT = "CLOSE_CLEAR_ALERT";
export const TOGGLE_SIDENAV = "TOGGLE_SIDENAV";

// Get Token API
// src/redux/reducers/userToken.js
export const FETCH_TOKEN_REQUEST = 'FETCH_TOKEN_REQUEST';
export const FETCH_TOKEN_SUCCESS = 'FETCH_TOKEN_SUCCESS';
export const FETCH_TOKEN_ERROR = 'FETCH_TOKEN_ERROR';

// get data 
// src/redux/reducers/jsonData.js
export const SUBMIT_REQUEST = 'SUBMIT_REQUEST';
export const SUBMIT_REQUEST_SUCCESS = 'SUBMIT_REQUEST_SUCCESS';
export const SUBMIT_REQUEST_ERROR   = 'SUBMIT_REQUEST_ERROR';
// store data manipulations
export const UPDATE_DATA_ROW = "UPDATE_DATA_ROW";
export const UPDATE_DATA_FIELD = "UPDATE_DATA_FIELD";
export const CANCEL_UPDATES = "CANCEL_UPDATES";
export const SUBMIT_UPDATES = "SUBMIT_UPDATES";
export const RELOAD_DATA = "RELOAD_DATA";
export const PREPARE_DATA_ACTION = "PREPARE_DATA_ACTION";

// experimental data APi
export const API_CALL = 'API_CALL';
export const API_CALL_SUCCESS = 'API_CALL_SUCCESS';
export const API_CALL_ERROR = 'API_CALL_ERROR';

// cart actionTypes
// src/redux/reducers/cartList.js
export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const CLEAR_CART = 'CLEAR_CART';
export const ADD_CART_ITEM_QUANTITY = 'ADD_CART_ITEM_QUANTITY';

//Index operations, index is selected row from dataset 
export const INDEX_INCRMENT = 'INDEX_INCRMENT';
export const INDEX_DECREMENT = 'INDEX_DECREMENT';

//twitter lists
export const TL_ADD_PRIFILE = 'TL_ADD_PRIFILE';
export const TL_REMOVE_PROFILE = 'TL_REMOVE_PROFILE';
export const TL_RESET = 'TL_RESET';
