import React, { useEffect, useState, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';
import { useWorldTotal, useGlobalHistory } from 'redux/selectorHooks';
import 'moment/locale/mk';
import Chartjs from "chart.js";
import { Trans } from 'locales/Trans';
import { group3 } from 'functions';
import Icon from '@mdi/react';
import { mdiChartBar, mdiChartLine } from '@mdi/js';

var chartConfig = {
	type: "line",
	data: {
		datasets: [
			{
				label: 'Total Cases',
				backgroundColor: 'rgba(252, 35, 35, 0.1)',
				borderColor: 'rgba(255, 35, 35, 1)',
				borderWidth: 1,
			},
			{
				label: 'Deaths',
				borderColor: 'rgba(0, 0, 0, 1)',
				backgroundColor: 'rgba(0, 0, 0, 0.1)',
				borderWidth: 1,
			},
			{
				label: 'Recovered',
				borderColor: 'rgb(12, 200, 23)',
				backgroundColor: 'rgba(12, 200, 34, 0.1)',
				borderWidth: 1,
			},
			{
				label: 'Active Cases',
				borderColor: 'rgb(255, 140, 0)',
				backgroundColor: 'rgba(255, 140, 0, 0.1)',
				borderWidth: 1,
			},
		],
		// labels: [0,1,3],
},
	options: {
		maintainAspectRatio: false,
		responsive: true,
		legend: {
			display: false,
		},
		tooltips: {
			mode: 'index',
			axis: 'y'
		},
		scales: {
			yAxes: [{
			ticks: {
				beginAtZero: true
			}
			}]
		}
	}
};


const HomePage = () => {
  const [chartInstance, setChartInstance] = useState(null);
	const [ ctp, setCtp ] = useState('line') 
	const chartContainer = useRef(null);
	const { history } = useGlobalHistory();
  	const {cases, deaths, total_recovered, new_cases} = useWorldTotal();
	const dispatch = useDispatch();
	const activeCases = cases - deaths - total_recovered;
	
	useEffect(() => {
    if (chartContainer && chartContainer.current) {
			if(chartInstance) chartInstance.destroy();
			chartConfig.type = ctp;
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chartContainer,ctp]);
	
 	useEffect( () =>{
		if(chartInstance){
			chartInstance.data.labels = history.labels;
			chartInstance.data.datasets[0].data = history.confirmed;
			chartInstance.data.datasets[1].data = history.deaths;
			chartInstance.data.datasets[2].data = history.recovered;
			chartInstance.data.datasets[3].data = history.active;
			chartInstance.update();
		}
	},[history,chartInstance]);

	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "worldTotal", dataAction:"fetch"}))
		dispatch(executeDataAction("worldTotal"));
	}, [dispatch]);

	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "globalHistory", dataAction:"fetch"}))
		dispatch(executeDataAction("globalHistory"));
	}, [dispatch]);


	const togleType = () => {
		setCtp( ctp==='bar' ? 'line' : 'bar' );  
  }

	return(
		<div className="homePage">

			<div className="sticker">
				<div className="stickerTitle"><Trans>Total Cases</Trans></div>
				<div className="stickerBody">{group3(cases)}</div>
			</div>	 
			<div className="sticker">
				<div className="stickerTitle"><Trans>Deaths</Trans></div> 
				<div className="stickerBody">{group3(deaths)}</div>
			</div>
			<div className="sticker">
				<div className="stickerTitle"><Trans>Recovered</Trans></div> 
				<div className="stickerBody"> {group3(total_recovered)}</div>
			</div>
			<div  className="sticker">
				<div className="stickerTitle"><Trans>New cases</Trans></div>
				<div className="stickerBody">{group3(new_cases)}</div>
			</div>
			<div  className="sticker">
				<div className="stickerTitle"><Trans>Active Cases</Trans></div>
				<div className="stickerBody">{group3(activeCases)}</div>
			</div>
			{/* <div className="sticker">
				<div className="stickerTitle"><Trans>Graph style</Trans></div>
				<Icon className="chartIcon" onClick={togleType} path={ ctp==='line' ? mdiChartBar : mdiChartLine } title={"Change chart type"} /> 
			</div>	 */}
			<div className="sticker">
				{/* <div className="stickerTitle"><Trans>Legent</Trans></div> */}
				{chartConfig.data.datasets.map( x => 
					<div className="chartLg" style={{borderColor: x.borderColor, backgroundColor: x.backgroundColor, color:x.borderColor }}>
						<Trans>{x.label}</Trans>
					</div> 
				)}
			</div>

			<div className="chartDivHome">
				<Icon className="chartIconHome" onClick={togleType} path={ ctp==='line' ? mdiChartBar : mdiChartLine } title={"Change chart type"} /> 
				<canvas ref={chartContainer} id="canvas" className="chartCanvasHome" ></canvas>
			</div>

		</div>	
	);
}

export default HomePage;
