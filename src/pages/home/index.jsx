import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';
import { useZdravstvoRSS, useAuToken } from 'redux/selectorHooks';
import ReactJson from 'react-json-view';
import Moment from 'react-moment';
import 'moment/locale/mk';
import Img from "MZdravstvo.png";

const HomePage = () => {
	const dispatch = useDispatch();
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
		feed !== undefined ?
			<div className='mzPage' >
				<div className="mzGovTitle">
					<img src={Img} alt="" className="mzGovImg"></img>
					{/* <Moment className="moment" format="LLLL">{feed.lastBuildDate}</Moment> */}
				</div>
				{ feed.item.map( (item,i) => (
					<div className="feedBox" key={i} onClick={() => clickHandle(item.guid)}>
						<p>{item.title}</p>
						<Moment className="feedTitle" format="LLLL">{item.pubDate}</Moment>
						<p>{item.description}</p>
					</div>))}
				{/* <ReactJson src={feed.item} /> */}
			</div>
		:
			<div className='page' >
				<div>
					<h2> Loading data! </h2>
				</div>
			</div>
	);
}

export default HomePage;
