import React, { useEffect } from "react";
import './main.scss';
import AppNavBar from 'components/appNavbar';
import { useDispatch } from "react-redux";
import { navigateToUrl, fetchToken, setLanguage} from 'redux/actions';
import { useIsLoggedIn, useTokenError } from 'redux/selectorHooks';
import { NaviGator } from "routes";

function App() { 
	const dispatch = useDispatch();
	const lioggedIn = useIsLoggedIn();
	const hasTokenError = useTokenError();

	localStorage.setItem('Language','mk');
	dispatch(setLanguage({lang:'mk'}));
	
	useEffect( () => {
		dispatch(navigateToUrl(window.location.hash));
		window.onhashchange = () => dispatch(navigateToUrl(window.location.hash));
		// voa dodeka ne se stokme UserManagmentot 
		if(!lioggedIn)
			dispatch(fetchToken({ userName: 'anonymous', password: 'anonymous' }));
	}, [dispatch,lioggedIn] );
	
	useEffect( () => {
		console.log({tikenErr: hasTokenError});
	},
	[hasTokenError]);

	return (
    <div className="app">
			<header className="App-header">
				<AppNavBar></AppNavBar>
			</header>
			<NaviGator />
    </div>
  );
}

export default App;