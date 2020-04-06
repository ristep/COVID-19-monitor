import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { useGlobalHistory, useWorldTotal } from "redux/selectorHooks";
import Icon from "@mdi/react";
import { mdiChartBar, mdiChartLine } from "@mdi/js";
import { useDispatch } from "react-redux";
import { prepareDataAction, executeDataAction } from "redux/actions";

const chartConfig = {
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
	const { data, history } = useGlobalHistory();
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
		console.log(ctp);
 }

  return (
    <div className="chartBox">
			{/* <NavLink onClick={togleType}>Chart type: {ctp}</NavLink> */}
			<Icon className="chartIcon" onClick={togleType} path={ ctp==='line' ? mdiChartBar : mdiChartLine } title={"Change chart type"} /> 
			<div className="chartDiv">
  			<canvas ref={chartContainer} id="canvas" className="chartCanvas" ></canvas>
			</div>			 

			<div>
			<h3>World chart</h3>
			<div>Total Cases: {cases}</div>
			<div>Deaths: {deaths}</div>
			<div>New Cases: {new_cases}</div>
			<div>Recovered: {total_recovered}</div>
			<div>Last Report: {statistic_taken_at}</div>
			<div>Last Graphic Date: {history.end}</div>
			</div>
	  </div>
  );
};

export default ChartGlobal;