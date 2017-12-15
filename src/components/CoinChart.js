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
				label: `${props.selectedSym} (Close)`,
				fill: false,
				lineTension: 0.1,
				backgroundColor: "rgba(153,204,255,0.4)",
				borderColor: "rgba(153,204,255,1)",
				borderCapStyle: "butt",
				borderDash: [],
				borderDashOffset: 0.0,
				borderJoinStyle: "miter",
				pointBorderColor: "rgba(153,204,255,1)",
				pointBackgroundColor: "#fff",
				pointBorderWidth: 1,
				pointHoverRadius: 5,
				pointHoverBackgroundColor: "rgba(153,204,255,1)",
				pointHoverBorderColor: "rgba(220,220,220,1)",
				pointHoverBorderWidth: 2,
				pointRadius: 1,
				pointHitRadius: 10,
				data: props.coinHisto.map(coin => coin.close)
			}
		]
	};

	const options = {
		maintainAspectRatio: false,
		scales: {
			yAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: "Price (USD)"
					}
				}
			],
			xAxes: [
				{
					scaleLabel: {
						display: true,
						labelString: "Time (Min)"
					}
				}
			]
		},
		legend: {
			position: "top"
		}
	};

	return (
		<div style={{ width: "1000px", height: "400px" }}>
			<Line data={data} options={options} />
		</div>
	);
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