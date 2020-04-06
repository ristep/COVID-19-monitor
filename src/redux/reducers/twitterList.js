import produce from "immer";
import {
	TL_ADD_PRIFILE,
	TL_REMOVE_PROFILE,
	TL_RESET,
	} from 'redux/actionTypes';
import { useSelector } from "react-redux";

const initialState = {
	profiles: ["WHO","VFilipche","COVID19","COVID19pandemic"],
	dim: {
		height:500, 
		width: 400
	},
}

export default (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
		
			case TL_ADD_PRIFILE: 
				draft.profiles.push(action.payload);
				break;
			
			case TL_REMOVE_PROFILE: 
				draft.profiles = draft.profiles.filter(e => e !== action.payload);
				break;
			
			case TL_RESET:
				draft.profiles = initialState.profiles;
				break;
				
			default:
				return draft;
		}
		return draft;
	});

export const useTwitterList = () => useSelector( (state) =>(state.twitterList.profiles) );