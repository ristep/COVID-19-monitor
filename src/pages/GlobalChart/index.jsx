import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { useGlobalHistory, useWorldTotal } from "redux/selectorHooks";
import Icon from "@mdi/react";
import { mdiChartBar, mdiChartLine } from "@mdi/js";
import { useDispatch } from "react-redux";
import { prepareDataAction, executeDataAction } from "redux/actions";
import { Trans } from "locales/Trans";
// import { useDictionary, useTranslate } from "locales/langReducer";

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

const ChartGlobal = () => {
	const [ ctp, setCtp ] = useState('line') 
	const { history } = useGlobalHistory();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
	const {cases, deaths, total_recovered, new_cases, statistic_taken_at} = useWorldTotal();
	const dispatch = useDispatch();
	
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

  return (
    <div className="chartBox">
			{/* <NavLink onClick={togleType}>Chart type: {ctp}</NavLink> */}
			<Icon className="chartIcon" onClick={togleType} path={ ctp==='line' ? mdiChartBar : mdiChartLine } title={"Change chart type"} /> 
			<div className="chartLegend">
					{chartConfig.data.datasets.map( x => 
						<div className="chartLg" style={{borderColor: x.borderColor, backgroundColor: x.backgroundColor, color:x.borderColor }}>
							<Trans>{x.label}</Trans>
						</div> 
					)}
			</div>	

			<div className="chartDiv">
  			<canvas ref={chartContainer} id="canvas" className="chartCanvas" ></canvas>
			</div>			 

			<div>
				<h3><Trans>World chart</Trans></h3>
				<div><Trans>Total Cases</Trans>: {cases}</div>
				<div><Trans>Deaths</Trans>: {deaths}</div>
				<div><Trans>New Cases</Trans>: {new_cases}</div>
				<div><Trans>Recovered</Trans>: {total_recovered}</div>
				<div><Trans>Last Report</Trans>: {statistic_taken_at}</div>
				<div><Trans>Last Graphic</Trans>: {history.end}</div>
			</div>

	  </div>
  );
};

export default ChartGlobal;