import produce from "immer";
import {
	UPDATE_DATA_FIELD,
	CANCEL_UPDATES,
	SUBMIT_REQUEST_ERROR,
	SUBMIT_REQUEST_SUCCESS,
	SUBMIT_REQUEST,
	PREPARE_DATA_ACTION,
	UPDATE_DATA_ROW,
	INDEX_INCRMENT,
	INDEX_DECREMENT
} from 'redux/actionTypes';

export const initialState = () => {
	return {
		isFetching: false,
		hasError: true,

		worldTotal: {
			dataAction: 'done',
			dataSet: "worldTotal",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
			jsonQuery: {
				phpFunction: "getWorldTotal",
				fields: ["id", "total_cases", "total_deaths", "total_recovered", "new_cases", "new_deaths", "statistic_taken_at", "ts"],
				// keyData: { id: undefined }
			}
		},

		zdravstvoRSS: {
			dataAction: 'done',
			dataSet: "zdravstvoRSS",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
			jsonQuery: {
				phpFunction: "getZdravstvoRSS",
				keyData: { }
			}
		},

		whoNewsRSS: {
			dataAction: 'done',
			dataSet: "whoNewsRSS",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
			jsonQuery: {
				phpFunction: "getWHOnewsRSS",
				keyData: { }
			}
		},

		worldCountries: {
			dataAction: 'done',
			dataSet: "worldCountries",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
			jsonQuery: {
				sqlStatement: "select",
				table: "cases_by_country",
				fields: ["code", "country_name", "cases", "deaths", "critical", "total_recovered", "new_deaths", "new_cases", "active_cases","statistic_taken_at", "ts"],
				order: ["cases desc"]
				// keyData: { id: undefined }
			}
		},

		countryData: {
			dataAction: 'done',
			dataSet: "countryData",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			channel: {},
			history:{
				confirmed:[],
				deaths:[],
				recovered:[]
			},
			jsonQuery: {
				phpFunction: "getCountry",
				keyData: { "country_name": undefined }
			}
		},

		globalHistory: {
			dataAction: 'done',
			dataSet: "globalData",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
			history:{
				confirmed:[],
				deaths:[],
				recovered:[]
			},
			jsonQuery: {
				phpFunction: "getGlobalHistory",
				keyData: {  }
					}
		},

		countryNames: {
			dataAction: 'done',
			dataSet: "countryNames",
			editable: false,
			OK: false,
			error: false,
			message: 'empty',
			Sql: "",
			count: 0,
			index: 0,
			data: [],
			jsonQuery: {
				phpFunction: "getCountryNames",
			}
		},

		usersAll: {
			dataAction: 'done',
			dataSet: "",
			editable: true,
			OK: false,
			error:false,
			message: 'empty',
			Sql: "",
			count: 0,
			data: [],
		},

		userData: {
			dataAction: 'done',
			dataSet: "userData",
			table: "users",
			OK: false,
			error:false,
			editable: true,
			message: 'empty',
			count: 0,
			data: [],
			oriData: [],
			jsonQuery: {
				sqlStatement: "select",
				table: "users",
				fields: ["id", "name", "role", "first_name", "second_name", "email", "address", "place", "state", "password"],
				keyData: { id: undefined }
			}
		},
	};
};

export default (state = initialState(), action) =>
	produce(state, draft => {
		switch (action.type) {
			case PREPARE_DATA_ACTION:
				const { dataAction, dataSet, keyData } = action.payload;
				draft[dataSet].dataAction = dataAction;
				if (keyData)
					draft[dataSet].jsonQuery.keyData = keyData;
				break;
			case CANCEL_UPDATES:
				if (draft[action.payload].editable) {
					draft[action.payload].data = draft[action.payload].oriData;
					draft[action.payload].dataTouched = undefined;
				}
				break;

			case UPDATE_DATA_ROW:
				// console.log(action.payload)
				draft[action.payload.dataSet].data[action.payload.index] = action.payload.dataRow;
				break;	

			case UPDATE_DATA_FIELD:
				let ndx = 0; // temporal 
				if(action.payload.index!==undefined) ndx=action.payload.index;
				draft[action.payload.dataSet].data[ndx][action.payload.field] = action.payload.value;
				if (draft[action.payload.dataSet].dataTouched === undefined)
					draft[action.payload.dataSet].dataTouched = [];
				draft[action.payload.dataSet].dataTouched = Array.from(new Set([...draft[action.payload.dataSet].dataTouched, action.payload.field]));
				if (draft[action.payload.dataSet].updData === undefined)
					draft[action.payload.dataSet].updData = {};
				draft[action.payload.dataSet].updData[action.payload.field] = action.payload.value;
				break;

			case SUBMIT_REQUEST:
				draft.isFetching = true;
				break;

			case SUBMIT_REQUEST_SUCCESS:
				draft.isFetching = false;
				draft[action.payload.dataSet] = { ...draft[action.payload.dataSet], ...action.payload };
				if (draft[action.payload.dataSet].editable)
					draft[action.payload.dataSet].oriData = draft[action.payload.dataSet].data;
				else
					draft[action.payload.dataSet].oriData = undefined;
				draft[action.payload.dataSet].dataTouched = undefined;
				draft[action.payload.dataSet].updData = undefined;
				break;

			case SUBMIT_REQUEST_ERROR:
				draft.isFetching = false;
				draft.hasError = true;
				draft[action.payload.dataSet] = { ...draft[action.payload.dataSet], error: true, errorData: action.payload.error };
				break;
			
			case INDEX_INCRMENT:
				draft[action.payload].index++;
				break;
			
			case INDEX_DECREMENT:
				draft[action.payload].index--;
				break;

			default:
			 	return draft;
		}
		// return draft;
	});

