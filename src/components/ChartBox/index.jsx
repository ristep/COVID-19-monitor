import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { useCountryData } from "redux/selectorHooks";
import Icon from "@mdi/react";
import { mdiChartBar, mdiChartLine } from "@mdi/js";

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
				xAxes: [{
					ticks: {
						fontSize: 10
					}
					}],
				yAxes: [{
				ticks: {
					fontSize: 10
				}
				}]
			}
		}
};

const ChartBox = () => {
	const [ ctp, setCtp ] = useState('line') 
	const { data, history } = useCountryData();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);

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

	const togleType = () => {
		setCtp( ctp==='bar' ? 'line' : 'bar' );  
		console.log(ctp);
 }

  return (
    <div className="chartBoxAA">
			{/* <NavLink onClick={togleType}>Chart type: {ctp}</NavLink> */}
			<Icon className="chartIcon" onClick={togleType} path={ ctp==='line' ? mdiChartBar : mdiChartLine } title={"Change chart type"} /> 
     	{/* <canvas ref={chartContainer}  /> */}
			<div className="chartDiv">
  			<canvas ref={chartContainer} id="canvas" className="chartCanvas" ></canvas>
			</div>			 
			{ data && 
				<>
					<h4>{data.code3} / {data.country_name}</h4>
					<div>Total Cases: {data.cases}</div>
					<div>Deaths: {data.deaths}</div>
					<div>New Cases: {data.new_cases}</div>
					<div>Last Report Date: {data.statistic_taken_at}</div>
				</>	
			}	
    </div>
  );
};

export default ChartBox;