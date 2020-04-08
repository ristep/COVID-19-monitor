import React from "react";
import { useSelector } from "react-redux";
import HomePage from "pages/home";
import PageNotFound from "pages/notFound";
import { getPage } from "redux/selectors";
import WorldTotal from "pages/worldTotal";
import Countries from "pages/Countries";
import CountryChart from "pages/CountryChart";
import GlobalChart from "pages/GlobalChart";
import AboutPage from "pages/AboutPage";
import TwitterList from "pages/twiter";
import TestChart from "pages/victoryChart";

export const routes = {
	home: <HomePage />,
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
		home: "Home Page",
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
	return(	routes[page] );
}

export const validPages = Object.keys(routes);
export const errPage = 'errPage'; 
export const homePage = 'home';