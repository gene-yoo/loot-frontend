import React from "react";
import { Line } from "react-chartjs-2";

const CoinChart = props => {
	console.log("inside coin chart, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	const data = {
		labels: props.coinHisto.map(coin => coin.time),
		datasets: [
			{
				label: "Bitcoin",
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(75,192,192,0.4)",
				borderColor: "rgba(75,192,192,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(75,192,192,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(75,192,192,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: props.coinHisto.map(coin => coin.close)
			}
		]
	};

	return <Line data={data} />;
};

// const CoinChart = props => {
// 	console.log("inside coin chart, render");
// 	console.log("props: ", props);
// 	console.log("--------------------------------------");
//
// 	let chart = (
// 		<div>
// 			<p>Top of Chart</p>
// 			<canvas id="myChart" width="750" height="400" />
// 			<p>Bottom of Chart</p>
// 		</div>
// 	);
//
// 	return <div>{chart}</div>;
// };

export default CoinChart;
