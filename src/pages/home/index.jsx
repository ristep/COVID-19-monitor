import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';
import { useZdravstvoRSS, useWorldTotal } from 'redux/selectorHooks';
import 'moment/locale/mk';
import ChartGlobal from 'pages/GlobalChart';
import { Trans } from 'locales/Trans';
import { group3 } from 'functions';

const HomePage = () => {
	const dispatch = useDispatch();
	const {cases, deaths, total_recovered, new_cases} = useWorldTotal();
	const activeCases = cases - deaths - total_recovered;
	const feed = useZdravstvoRSS();
	
	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "zdravstvoRSS", dataAction:"fetch"}))
		dispatch(executeDataAction("zdravstvoRSS"));
	}, [dispatch]);

	const clickHandle = (link) => {
		console.log(link);
		window.open(link,'_blank');
	}

	return(
		<div className="homePage">
				<div className="sticker">
					<div className="stickerTitle"><Trans>Total Cases</Trans></div>
					<div className="stickerBody">{group3(cases)}</div>
				</div>	 
				<div className="sticker">
					<div className="stickerTitle"><Trans>Deaths</Trans></div> 
					<div className="stickerBody">{group3(deaths)}</div>
				</div>
				<div className="sticker">
					<div className="stickerTitle"><Trans>Recovered</Trans></div> 
					<div className="stickerBody"> {group3(total_recovered)}</div>
				</div>
				<div  className="sticker">
					<div className="stickerTitle"><Trans>New cases</Trans></div>
					<div className="stickerBody">{group3(new_cases)}</div>
				</div>
				<div  className="sticker">
					<div className="stickerTitle"><Trans>Active Cases</Trans></div>
					<div className="stickerBody">{group3(activeCases)}</div>
				</div>

			<ChartGlobal />
		</div>	
	);
}

export default HomePage;
