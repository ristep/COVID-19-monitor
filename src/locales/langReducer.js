import { useSelector } from "react-redux";
import produce from "immer";
import { SET_TRANSLATION, CLEAR_TRANSLATION, NEXT_LANGUAGE	} from 'redux/actionTypes';
import { languages } from "./Trans";
import mkd from "../img/iconfinder_Macedonia-Flag_32270.png"
import ukd from "../img/iconfinder_United-Kingdom-flag_32363.png"

const initialState = {
	language: "en",
	index: 0, 
	langList: ["en","mk"],
	flags: [ ukd, mkd ],
	dictionary:{
		en:{
			CountryChart:"Country Chart",
			TotalCases:"Total Cases",
			CountryName:"Country Name",
		},
		mk:{
			"Total Deads":"Починати",
			"colection": "Збирка",
			"Country Chart": "График за држава",
			"Total Cases": "Вкупно",
			"Deaths": "Починати",
			"New Cases": "Нови",
			"Recovered": "Излекувани",
			"Last Report":"Последен репорт",
			"Last Graphic":"Графика до",
			"Home": "Почетна страна",
			"Twitter list":"Твитерана",
			"World Total": "Свет збирно",
			"Countries Table":"Табела по држави",
			"Countries" : "Држави",
			"Global Chart":"Глобален график ",
			"Active Cases":"Активни",
			"New cases": "Нови",
			"Country name":"Држава",
			"Deads": "Починати", 
			"New Deaths": "Ново поч.",
			"MZ news feed": "МЗ новости",
			"WHO news feed": "СЗО новости",
			"Critical cases":"Критични",
			"COVID-19 Twitter colection":"COVID-19 твитерана",
			"About":"Инфо"
		}
	}
}

export default (state = initialState, action) => 
	produce(state, draft => {
		switch (action.type) {
		
			case SET_TRANSLATION: 
				draft.language = action.payload.lang;
				draft.index = draft.langList.indexOf(action.payload.lang);
				localStorage.setItem('Language',draft.language);
				break;

			case NEXT_LANGUAGE: 
				if(languages.langList[draft.index+1])
					draft.index++;
				else
					draft.index=0;
				draft.language = languages.langList[draft.index]	
				localStorage.setItem('Language',draft.language);
				break;

			case CLEAR_TRANSLATION: 
				draft = state;
				break;
			
			default:
				return draft;
		}
		return draft;
	});

export const useTransData = () => useSelector( (state) =>( state.langReducer.data ) );
export const useLanguage = () => useSelector( (state) =>( state.langReducer.language ) );
export const useDictionary = () => useSelector( state => state.langReducer.dictionary[state.langReducer.language]);
// export const useTranslate = (txt) => useSelector( state => state.langReducer.dictionary[state.langReducer.language][txt]);
export const useFlag = () => useSelector( state => state.langReducer.flags[state.langReducer.index] ); 