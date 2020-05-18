import {
	GO_HOME,
	FETCH_TOKEN_SUCCESS,
	FETCH_TOKEN_ERROR,
	FETCH_TOKEN_REQUEST,
	NAVIGATE_TO_URL,
	UPDATE_DATA_FIELD,
	CANCEL_UPDATES,
	SUBMIT_REQUEST,
	SUBMIT_REQUEST_SUCCESS,
	SUBMIT_REQUEST_ERROR,
	RELOAD_DATA,
	PREPARE_DATA_ACTION,
	TOGGLE_SIDENAV,
	UPDATE_DATA_ROW,
	INDEX_INCRMENT,
	INDEX_DECREMENT,
	SET_TRANSLATION,
	CLEAR_TRANSLATION,
	NEXT_LANGUAGE,
} from "./actionTypes";
import { getToken, postJsonRequest } from "dataModules";

// Route actions
export const goHome = () => ({ type: GO_HOME });
export const navigateToUrl = (url) => ({ type: NAVIGATE_TO_URL, payload: url });
// for investigation durin development
// export const setInitialLocation = (location) => {
// 	const { href, origin, protocol, host, hostname, port, pathname, search, hash} = location;
// 	return { type: SET_WINDOW_LOCATION, payload:{ href, origin, protocol, host, hostname, port, pathname, search, hash, hashArr:hash.split("/") } }
// };

// UI Actions
export const toggleSidenav = () => ({ type: TOGGLE_SIDENAV });

// token actions async
export const fetchTokenRequest = () => ({ type: FETCH_TOKEN_REQUEST })
export const fetchTokenSucces = (tokenData) => ({ type: FETCH_TOKEN_SUCCESS, payload: tokenData })
export const fetchTokenError = (errInfo) => ({ type: FETCH_TOKEN_ERROR, payload: errInfo })

export const fetchToken = (unpas) => {
	return function (dispatch) {
		dispatch(fetchTokenRequest());
		getToken({
			...unpas,
			callBack: (udat) => dispatch(fetchTokenSucces(udat)),
			callError: (err) => dispatch(fetchTokenError(err))
		});
	}
}

// Index Increment decrement
export const indexInc = (dataSet) => ({ type: INDEX_INCRMENT, payload: dataSet });
export const indexDec = (dataSet) => ({ type: INDEX_DECREMENT,payload: dataSet });

// fetch JsonData
export const submitRequest = () => ({ type: SUBMIT_REQUEST })
export const submitRequestSucces = (jsn) => ({ type: SUBMIT_REQUEST_SUCCESS, payload: jsn })
export const submitRequestError = (errInfo) => ({ type: SUBMIT_REQUEST_ERROR, payload: errInfo })

// store data mangle
export const updateDataRow = (jsn) => ({ type: UPDATE_DATA_ROW, payload: jsn })
export const updateDataField = (jsn) => ({ type: UPDATE_DATA_FIELD, payload: jsn })
export const cancelUpdates = (dataSet) => ({ type: CANCEL_UPDATES, payload: dataSet })
export const updateData = (jsn) => ({ type: UPDATE_DATA_FIELD, payload: jsn })
export const reloadData = (dataSet) => ({ type: RELOAD_DATA, payload: dataSet })
export const prepareDataAction = (prm) => ({type: PREPARE_DATA_ACTION, payload: prm})

export const executeDataAction = (dataSet) => {
	// returnin function is pattern for Redux_Trunk middlware
	return function (dispatch, getState) {
		const state = getState(); 
		var jsonQuery;
		switch(state.jsonData[dataSet].dataAction){
			case 'fetch':
				jsonQuery = state.jsonData[dataSet].jsonQuery;
			break;
			case 'submit':
				jsonQuery = {	
					table: state.jsonData[dataSet].table,
					sqlStatement: 'update',
					data: state.jsonData[dataSet].updData,
					keyData: state.jsonData[dataSet].jsonQuery.keyData
				}
			break;
			default:
				jsonQuery = state.jsonData[dataSet].jsonQuery;	
		}	
		dispatch(submitRequest());
		// console.log(jsonQuery);
		postJsonRequest({
			auToken: state.userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { 
				dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })); 
			},
			callError:(err) => {
				dispatch(submitRequestError({error: err, dataSet: dataSet }));
				if(err.code===401 && err.name==='tokenator')
					dispatch(fetchTokenError(err));
			}
		});
	};
};

export const submitJsonQuery = (args) => {
	var { dataSet, jsonQuery } = args;
	// returnin function is pattern for Redux_Trunk middlware
	return function (dispatch, getState) {
		dispatch(submitRequest());
		// console.log(jsonQuery);
		postJsonRequest({
			auToken: getState().userToken.tokenData.auToken,
			request: jsonQuery,
			callBack: (udat) => { 
				dispatch(submitRequestSucces({ ...udat, dataSet: dataSet })) 
			},
			callError:(err) => {
				dispatch(submitRequestError({error: err, dataSet: dataSet }));
				if(err.code===401 && err.name==='tokenator')
					dispatch(fetchTokenError(err));
			}
		})
	}
}	
// export apiCall = ()

// language actions 
export const setLanguage 	= (lang) => ({ type: SET_TRANSLATION, payload: lang });
export const clearLanguage = () => ({ type: CLEAR_TRANSLATION });
export const nextLanguage = () => ({ type: NEXT_LANGUAGE });
