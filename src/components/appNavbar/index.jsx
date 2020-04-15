import React from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleSidenav } from 'redux/actions';
import { getSidenavState, getPage } from 'redux/selectors';
import Icon from '@mdi/react';
import { mdiHome, mdiInformationOutline, mdiEarth, mdiTable, mdiChartAreaspline, mdiChartLine, mdiTwitter, mdiPharmacy } from '@mdi/js';
import whoIco from "whoIco.png";
import { mdiVirusOutlined } from 'mdiIcons';
import NavLink from 'elements/navLink';
import LangButton from 'components/LangButton';
import { Trans } from 'locales/Trans';

const AppNavBar = () => {
	const { title } = useSelector(getPage);
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
					title="Home" 
					label="Home" 
					path={mdiHome} 
					onClick={() => navClickHandle('#/home')} 
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
				<hr />
				<NavLink 
					title="MZ news" 
					label="MZ news feed" 
					path={mdiPharmacy} 
					onClick={() => navClickHandle('#/mznews')} 
				/>
				<NavLink 
					title="WHO news" 
					label="WHO news feed" 
					icon={whoIco} 
					onClick={() => navClickHandle('#/whonews')} 
				/>
				<NavLink 
					title="Twitter" 
					label="Twitter list" 
					path={mdiTwitter} 
					onClick={() => navClickHandle('#/twitter')} 
				/>
				<hr />
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