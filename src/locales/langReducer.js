import { useSelector } from "react-redux";
import produce from "immer";
import { SET_TRANSLATION, CLEAR_TRANSLATION, NEXT_LANGUAGE	} from 'redux/actionTypes';
import { languages } from "./Trans";

const initialState = {
	lang: "en",
	index: 0, 
	langList: ['en','mk'],
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
			"Home Page": "Почетна страна",
			"Home page": "Почетна страна",
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
			"Critical cases":"Критични",
			"About":"Инфо",
		}
	}
}

export default (state = initialState, action) => 
	produce(state, draft => {
		switch (action.type) {
		
			case SET_TRANSLATION: 
				draft.language = action.payload.lang;
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
export const useTranslate = (txt) => useSelector( state => state.langReducer.dictionary[state.langReducer.language][txt]);