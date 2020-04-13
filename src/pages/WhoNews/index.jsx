import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';
import { useWhoNewsRSS } from 'redux/selectorHooks';
import Moment from 'react-moment';
import ReactHtmlParser from 'react-html-parser'; 
import 'moment/locale/mk';
import Img from "whoLogo.png";

const WhoNews = () => {
	const dispatch = useDispatch();
	const feed = useWhoNewsRSS();
	
	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "whoNewsRSS", dataAction:"fetch"}))
		dispatch(executeDataAction("whoNewsRSS"));
	}, [dispatch]);

	const clickHandle = (link) => {
		console.log(link);
		window.open(link,'_blank');
	}

	return(
		feed !== undefined ?
			<div className='mzPage' >
				<div className="mzGovTitle">
					<img src={Img} alt="" className="whoImg"></img>
					{/* <Moment className="moment" format="LLLL">{feed.lastBuildDate}</Moment> */}
				</div>
				{ feed.item.map( (item,i) => (
					<div className="whoFeedBox" key={i} onClick={() => clickHandle(item.link)}>
						<p>{item.title}</p>
						<Moment className="feedTitle" format="LLLL">{item.pubDate}</Moment>
						<p>{ ReactHtmlParser (item.description) }</p>
						{/* // <div dangerouslySetInnerHTML={{ __html: item.description }} /> */}
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

export default WhoNews;
