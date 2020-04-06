import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import combinedReducers from "./reducers";
import {saveState, loadState} from './localStorage';

const persisto = loadState();
const middleware = [...getDefaultMiddleware()]

const store = configureStore({
  reducer: combinedReducers,
  middleware: middleware,
  devTools: process.env.NODE_ENV !== 'production',
  preloadedState: persisto,
  enhancers: []
});

store.subscribe(() => {
  saveState({
		userToken: store.getState().userToken,
		cartList: store.getState().cartList
  });
});

export default store;
