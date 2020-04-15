import React from 'react';
import Icon from '@mdi/react'
import { Trans } from 'locales/Trans';
import whoIco from "whoRezeda.png";
// import mkd from "../img/iconfinder_Macedonia-Flag_32270.png"
// import './index.scss'

const NavLink = (props) => {
	const onClickHand = () => {
		window.location.href = "#/"+props.navRoute;
	}

	return(
		<div className='navLink' onClick={onClickHand} {...props} >
			{ props.path ? 
				<Icon  path={props.path}/>
			:
				<img src={whoIco} alt={"who"} width="32" height="32" color="white" />			
			}
			<label className="navLabel"><Trans>{props.label}</Trans></label>
		</div>
	);
}

export default NavLink;