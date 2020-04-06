import React from 'react';
// import Icon from '@mdi/react'
// import './index.scss'

const IncLink = (props) => {
	const onClickHand = () => {
		window.location.href = "#/"+props.navRoute;
	}
	const lex = props.ndx===props.index?' lexur':'';

	return(
		<div className={'incLink' + lex} onClick={onClickHand} {...props} >
			{/* <Icon path={props.path}/> */}
			<label className="incLabel">{props.label}</label>
		</div>
	);
}

export default IncLink;