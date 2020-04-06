import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCountryNames } from "redux/selectorHooks";
import { prepareDataAction, executeDataAction, indexDec, indexInc } from "redux/actions";
import IncLink from "elements/incLink";
import { getNaviParams } from "redux/selectors";
import ChartBox from "components/ChartBox";

const CountryChart = () =>{
	const dispatch = useDispatch();
	const { countryNames, index } = useCountryNames();
	const [searchString, setSearchString] = useState('');
	const [filteredArray, setFilteredArray ] = useState([]);
	const params = useSelector(getNaviParams);
	const [srVisible, setSrVisible] = useState(false);

	useEffect(() => {
		setFilteredArray(countryNames.filter((str)=>{
			return str.toLowerCase().indexOf(searchString.toLowerCase()) >= 0; 
		}));
	}, [searchString, countryNames])
	
	const reLoad = useCallback(() => {
		dispatch(prepareDataAction({ dataSet: "countryNames", dataAction:"fetch"}))
		dispatch(executeDataAction("countryNames"));
	},[dispatch]);

	useEffect(() => {
			reLoad();
	}, [reLoad]);

	useEffect(() => {
		if(params[0] && params[0]!==''){
 			setSearchString(decodeURI(params[0]));
			if( countryNames.includes(decodeURI(params[0]))){
				dispatch(prepareDataAction({ 
					dataSet: "countryData", 
					dataAction:"fetch", 
					keyData: { country_name: decodeURI(params[0]) }
				}))
				dispatch(executeDataAction("countryData"));
			}
		}	
	}, [countryNames, dispatch, params]);

	const onInputChange = (ev) => {
		setSearchString( ev.currentTarget.value );
		window.location.href = '#/country_chart';
		setSrVisible(true);
	};

	const navClickHandle = (url) => {
		window.location.href = '#/country_chart/'+url;
		setSearchString(decodeURI(url));
		setSrVisible(false);
	}
	
	const keyHandle = (ev) => {
		console.log(ev.key)
		switch(ev.key){
			case 'ArrowUp': 
				if(index>0)
					dispatch(indexDec("countryNames"));
				break;
			case 'ArrowDown':
				if(index<filteredArray.length-1)
					dispatch(indexInc("countryNames"));
				break;
			case 'Enter':
				if(filteredArray[index]!==undefined)
					navClickHandle(filteredArray[index]);
				break;
			default:
				return;
		}
	}  

	return(
		<div className="page">
			<div className={"inputLabel"}>
					<input 
						type="text" 
						name="search" 
						placeholder="Search country" 
						onChange={onInputChange} 
						onKeyDown={(evn) => keyHandle(evn)}
						value={searchString} 
						autocomplete="off"
					/>
				</div>
				{ srVisible &&	
					<div className="incBar">
						{filteredArray.map( (x,i) => 
							<IncLink
								key={i}
								index={index}
								ndx={i} 
								title={x}  
								label={x} 
								onClick={() => navClickHandle(x)}
							/>
						)}
					</div>
				}	
			<ChartBox />
		</div>
	)
}

export default CountryChart;

