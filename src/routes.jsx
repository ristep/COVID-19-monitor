import React, { lazy, Suspense } from "react";
import { useSelector } from "react-redux";
import { getPage } from "redux/selectors";

import HomePage from "pages/home";
import PageNotFound from "pages/notFound";
import WorldTotal from "pages/worldTotal";
import Countries from "pages/Countries";
import CountryChart from "pages/CountryChart";
import GlobalChart from "pages/GlobalChart";
import AboutPage from "pages/AboutPage";
import TestChart from "pages/victoryChart";
// import WhoNews from "pages/WhoNews";
// import MzNews from "pages/MzNews";
// import TwitterList from "pages/twiter";

const WhoNews = lazy(() => import('pages/WhoNews'));
const MzNews = lazy(() => import('pages/MzNews'));
const TwitterList = lazy(() => import('pages/twiter'));

export const routes = {
	home: <HomePage />,
	whonews: <WhoNews />,
	mznews: <MzNews />,
	twitter:<TwitterList />,
	world_total: <WorldTotal />,
	countries: <Countries />,
	country_chart: <CountryChart />,
	global_chart: <GlobalChart />,
	about: <AboutPage />,
	errPage: <PageNotFound />,
	testChart: <TestChart />
};

export const routeTitle = (route) => (
	{
		home: "Home",
		twitter:"Twitter list",
		world_total: "World Total",
		countries: "Countries Table",
		country_chart: "Country Chart",
		global_chart: "Global Chart",
		about: "About",
		errPage: "Error page not found! ",
	}[route]
);

export const NaviGator = () => {
	const { page }  = useSelector(getPage);
	return(	
		<Suspense fallback={<div>Suspense Loading ...</div>}>
			{routes[page]} 
		</Suspense>
	);
}

export const validPages = Object.keys(routes);
export const errPage = 'errPage'; 
export const homePage = 'home';