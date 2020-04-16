import React, { useEffect } from 'react';
// import ReactDOM from 'react-dom';
import { VictoryLine, VictoryChart, VictoryAxis, VictoryTheme, VictoryStack } from 'victory';
import { useGlobalHistory } from 'redux/selectorHooks';
import { useDispatch } from 'react-redux';
import { prepareDataAction, executeDataAction } from 'redux/actions';

const TestChart = () => {
	const { history } = useGlobalHistory();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "worldTotal", dataAction:"fetch"}));
		dispatch(executeDataAction("worldTotal"));
	}, [dispatch]);

	useEffect(() => {
		dispatch(prepareDataAction({ dataSet: "globalHistory", dataAction:"fetch"}));
		dispatch(executeDataAction("globalHistory"));
	}, [dispatch]);

  return (
    <div className="page">
      <h1>Victory Tutorial</h1>
      <VictoryChart className="chartBox"
				theme={VictoryTheme.material}
      >
        <VictoryAxis
					tickValues={history.labels}
					style={{ tickLabels: { angle: -60, fontSize: 6 } }}
					type={"string"}
					tickFormat={ (x,a) => {
						 return ( a%7===0 ? String(x).slice(5,10): '' )
					}	 
					}
				/>
        <VictoryAxis
          dependentAxis
          tickFormat={(x) => (x)}
					style={{ tickLabels: { fontSize: 5 } }}
        />
        <VictoryStack
          colorScale={"warm"}
        >
          <VictoryLine
            data={history.confirmed}
						/>
          <VictoryLine
            data={history.deaths}
						/>
          <VictoryLine
            data={history.recovered}
						/>
          <VictoryLine
            data={history.active}
						/>
        </VictoryStack>
      </VictoryChart>
			{/* <ReactJson src={data} /> */}
    </div>
  );
}

export default TestChart;