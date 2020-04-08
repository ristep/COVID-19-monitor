import React, { useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from 'redux/actions';
import { getSidenavState, getPage } from 'redux/selectors';
import Icon from '@mdi/react';
import { mdiHome, mdiInformationOutline, mdiEarth, mdiTable, mdiChartAreaspline, mdiChartLine, mdiTwitter } from '@mdi/js';
import { mdiVirusOutlined } from 'mdiIcons';
import NavLink from 'elements/navLink';
import LangButton from 'components/LangButton';
import { Trans } from 'locales/Trans';

const AppNavBar = () => {
	const { page, title } = useSelector(getPage);
	const dispatch = useDispatch();
	const sideState = useSelector(getSidenavState);
	const sideNavClass = sideState?'sidenavVisible':'sidenavHiden';

  const navClickHandle = (url) => {
		window.location.href = url;
		if(sideState)
			dispatch(toggleSidenav());
	}

	return (
		<div>
			<div className='navBar'>
				<Icon className="navLink" onClick={() => dispatch(toggleSidenav())}  path={mdiVirusOutlined} title="Open/Close side menu" /> 
				<div className="routeTitle">{<Trans>{title}</Trans>}</div>
				<LangButton></LangButton>
			</div>
			<div id="sidenav" className={sideNavClass} onMouseLeave={() =>{ if(sideState) dispatch(toggleSidenav()) }}>
				<NavLink 
					title="Home page" 
					label="Home page" 
					path={mdiHome} 
					onClick={() => navClickHandle('#/home')} 
				/>
				<NavLink 
					title="Twitter" 
					label="Twitter list" 
					path={mdiTwitter} 
					onClick={() => navClickHandle('#/twitter')} 
				/>
				<NavLink 
					title="World Total" 
					label="World Total" 
					path={mdiEarth} 
					onClick={() => navClickHandle('#/world_total')} 
				/>
				<NavLink 
					title="Countries" 
					label="Countries Table" 
					path={mdiTable} 
					onClick={() => navClickHandle('#/countries')}
				/>
				<NavLink 
					title="Country Chart" 
					label="Country Chart" 
					path={mdiChartLine} 
					onClick={() => navClickHandle('#/country_chart')}
				/>
				<NavLink 
					title="World Chart" 
					label="Global Chart" 
					path={mdiChartAreaspline} 
					onClick={() => navClickHandle('#/global_chart')}
				/>
				<NavLink 
					title="Information" 
					label="About" 
					path={mdiInformationOutline} 
					onClick={() => navClickHandle('#/about')} 
				/>
			</div>
		</div>
	)
}

export default AppNavBar;