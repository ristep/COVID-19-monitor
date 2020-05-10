import React, { useEffect } from "react";
import 'styles/app.scss';
import AppNavBar from 'components/appNavbar';
import { useDispatch } from "react-redux";
import { navigateToUrl, setLanguage } from 'redux/actions';
// import { useIsLoggedIn, useTokenError } from 'redux/selectorHooks';
import { NaviGator } from "routes";
//gittest maj 10 2020
function App() { 
	const dispatch = useDispatch();
	// const lioggedIn = useIsLoggedIn();
	// const hasTokenError = useTokenError();

	// localStorage.setItem('Language','mk');
	dispatch(setLanguage({lang:'en'}));
	//dispatch(nextLanguage())
	 
	useEffect( () => {
		dispatch(navigateToUrl(window.location.hash));
		window.onhashchange = () => dispatch(navigateToUrl(window.location.hash));
		// voa dodeka ne se stokme UserManagmentot 
		// if(!lioggedIn)
		// 	dispatch(fetchToken({ userName: 'anonymous', password: 'anonymous' }));
	}, [dispatch] );
	
	// useEffect( () => {
	// 	console.log({tikenErr: hasTokenError});
	// },
	// [hasTokenError]);

	return (
    <div>
			<header>
				<AppNavBar></AppNavBar>
			</header>
			<NaviGator />
    </div>
  );
}

export default App;