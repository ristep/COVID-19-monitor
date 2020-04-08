//import { combineReducers } from "redux"; // this is neddet if work without configureStore
 
import uiState from "./uiState";
import theme from "./theme";
import userToken from "./userToken";
import jsonData from "./jsonData";
import naviGator from "./naviGator";
import twitterList from "./twitterList";
import langReducer from "locales/langReducer";

export default { 
	langReducer,
	naviGator,
	uiState,
	theme,
	userToken,
	jsonData,
	twitterList
 };
