import React from 'react';
import { TwitterTimelineEmbed} from 'react-twitter-embed';
//import { TwitterTimelineEmbed, TwitterShareButton, TwitterFollowButton, TwitterHashtagButton, TwitterMentionButton, TwitterTweetEmbed, TwitterMomentShare, TwitterDMButton, TwitterVideoEmbed, TwitterOnAirButton } from 'react-twitter-embed';
import { useTwitterList } from 'redux/reducers/twitterList';
import { Trans } from 'locales/Trans';


const TwitterList = () => {
	const tlList = useTwitterList();

	return (
		
		<div className='page' >
			<div style={{width:'100%'}}>
				<h2><Trans>COVID-19 Twitter colection</Trans></h2>
			</div>

			{ tlList.map( tl => 
					<TwitterTimelineEmbed
						sourceType="profile"
						screenName={tl}
						options={{height: 500, width:400}}
					/>
			)}
		
		</div>
	);
}

export default TwitterList;

	// useEffect(() => {
	// 	graph.setAccessToken('95f631716bca7b74edaab01e844ff3fb');
	// 	graph
	// 	.setOptions(options)
	// 	.get("ristepan", function(err, res) {
	// 		console.log(res); // { id: '4', name: 'Mark Zuckerberg'... }
	// 	});
	// }, [])
