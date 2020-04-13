import React from 'react';
import Icon from '@mdi/react'
import { Trans } from 'locales/Trans';
// import './index.scss'

const NavLink = (props) => {
	const onClickHand = () => {
		window.location.href = "#/"+props.navRoute;
	}

	return(
		<div className='navLink' onClick={onClickHand} {...props} >
			<Icon  path={props.path}/>
			<label className="navLabel"><Trans>{props.label}</Trans></label>
		</div>
	);
}

export default NavLink;