import React from "react";
import { useLanguage, useDictionary } from "./langReducer";

// Lang List
export const languages =
{
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
			"Last Report Date":"Последен репорт",
			"Home page": "Почетна страна",
			"Twitter list":"Твитерана",
			"World Total": "Свет збирно",
			"Countries Table":"Табела по држави",
			"Countries" : "Држави",
			"Global Chart":"Глобален график ",
			"Active cases":"Активни",
			"New cases": "Нови",
			"Country name":"Држава",
			"Deads": "Починати",
			"New Deaths": "Ново поч.",
			"Critical cases":"Критични",
			"About":"Инфо",
		}
	}
}

export const Trans = props => {
	// const lang = useLanguage();
	const dict = useDictionary();

	if(dict[props.children]===undefined)
		return( <>{props.children}</> );
	else 	
		return( <>{dict[props.children]}</>); 
};

// export function trn(txt) {
// 	const LanguageGlobal = localStorage.getItem('Language');
// 	if(languages.dictionary[LanguageGlobal][txt])
// 		return languages.dictionary[LanguageGlobal][txt];
// 	return txt;
// };