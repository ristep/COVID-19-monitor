import React, { useEffect, useRef, useState } from "react";
import Chartjs from "chart.js";
import { useCountryData } from "redux/selectorHooks";
import Icon from "@mdi/react";
import { mdiChartBar, mdiChartLine } from "@mdi/js";
import { Trans }  from "locales/Trans";
import { useDictionary } from "locales/langReducer";

const chartConfig = {
		type: "line",
		data: {
			datasets: [
				{
					label: 'Total Cases',
					backgroundColor: 'rgba(252, 35, 35, 0.1)',
					borderColor: 'rgba(255, 35, 35, 1)',
					borderWidth: 1
				},
				{
					label: 'Deaths',
					borderColor: 'rgba(0, 0, 0, 1)',
					backgroundColor: 'rgba(0, 0, 0, 0.1)',
					borderWidth: 1
				},
				{
					label: 'Recovered',
					borderColor: 'rgb(12, 200, 23)',
					backgroundColor: 'rgba(12, 200, 34, 0.1)',
					borderWidth: 1
				},
				{
					label: 'Active Cases',
					borderColor: 'rgb(255, 140, 0)',
					backgroundColor: 'rgba(255, 140, 0, 0.1)',
					borderWidth: 1
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
	// const tran = useTranslation();
	const [ ctp, setCtp ] = useState('line') 
	const { data, history } = useCountryData();
  const chartContainer = useRef(null);
  const [chartInstance, setChartInstance] = useState(null);
	const trn = useDictionary();

	useEffect(() => {
		if (chartContainer && chartContainer.current) {
			if(chartInstance) chartInstance.destroy();
			chartConfig.type = ctp;
			// chartConfig.data.datasets.map( x => x.label = trn[x.label] )
      const newChartInstance = new Chartjs(chartContainer.current, chartConfig);
      setChartInstance(newChartInstance);
    }
  }, [chartContainer, ctp, trn, chartInstance]);
	
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
    <div className="page">
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
			{ data && 
			<div className="chartBottom">
				<div className="">
					<h4>{data.code3} / {data.country_name}</h4>
					<div><Trans>Total Cases</Trans>: {data.cases}</div>
					<div><Trans>Deaths</Trans>: {data.deaths}</div>
					<div><Trans>New Cases</Trans>: {data.new_cases}</div>
					<div><Trans>Recovered</Trans>: {data.total_recovered}</div>
					<div><Trans>Last Report</Trans>: {data.statistic_taken_at}</div>
				</div>
			</div> 	
			}	
    </div>
  );
};

export default ChartBox;