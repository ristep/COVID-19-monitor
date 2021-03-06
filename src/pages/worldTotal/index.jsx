import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { prepareDataAction, executeDataAction } from "redux/actions";
import { useWorldTotal } from "redux/selectorHooks";
import {group3} from "../../functions";
import { Trans } from "locales/Trans";

const WorldTotal = () =>{
	const dispatch = useDispatch();
	const {cases, deaths, total_recovered, new_cases} = useWorldTotal();
	const activeCases = cases - deaths - total_recovered;

	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "worldTotal", dataAction:"fetch"}))
		dispatch(executeDataAction("worldTotal"));
	}, [dispatch]);

	return(
		<div className="page">
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
		</div>
	)
}

export default WorldTotal;