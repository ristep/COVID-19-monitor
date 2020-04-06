import produce from "immer";
import {
	OPEN_CLEAR_ALERT,
	CLOSE_CLEAR_ALERT,
	TOGGLE_SIDENAV,
	} from 'redux/actionTypes';

const initialState = {
	clearWorldAlertState: false,
	sidenavState: false,
}

export default (state = initialState, action) =>
	produce(state, draft => {
		switch (action.type) {
		
			case OPEN_CLEAR_ALERT: 
				draft.clearWorldAlertState = true;
				break;
			
			case CLOSE_CLEAR_ALERT: 
				draft.clearWorldAlertState = false;
				break;
			
			case TOGGLE_SIDENAV:
				draft.sidenavState = !draft.sidenavState;
				break;
				
			default:
				return draft;
		}
		return draft;
	});
