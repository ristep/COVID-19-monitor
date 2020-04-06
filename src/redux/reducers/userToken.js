import produce from "immer";
import {
	FETCH_TOKEN_REQUEST,
	FETCH_TOKEN_SUCCESS,
	FETCH_TOKEN_ERROR
} from 'redux/actionTypes';

export const initialState = () => {
	return {
		isFetching: false,
		isValid: false,
		hasError: true,
		isLoggedIn: false,
		tokenData: {
			timeStump: undefined,
			id: undefined,
			name: "",
			email: "",
			first_name: "",
			second_name: "",
			role: "",
			jti: "",
			auToken: undefined
		}
	}
};

export default (state = initialState(), action) =>
	produce(state, draft => { 
		// console.log(action);
		switch (action.type) {
			case FETCH_TOKEN_REQUEST: {
				draft.isFetching = true;
				draft.isValid = false;
				draft.hasError = true;
				//console.log(action.type);
				break;
			}
			case FETCH_TOKEN_SUCCESS: {
				draft.isFetching = false;
				draft.isValid = true;
				draft.hasError = false;
				draft.tokenData = action.payload;
				draft.errorData = undefined;
				draft.isLoggedIn = action.payload.name!=='anonymous';  
				break;
			}
			case FETCH_TOKEN_ERROR: {
				draft.isFetching = false;
				draft.isValid = false;
				draft.hasError = true;
				draft.errorData = action.payload.data;
				break;
			}
			default:
				return draft;
		}
	});
