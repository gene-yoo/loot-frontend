import React from "react";
import { Bar } from "react-chartjs-2";

const PortfolioChart = props => {
	console.log("inside portfolio chart, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	const data = {
		labels: props.holdings.map(coin => coin.symbol),
		datasets: [
			{
				data: props.holdings.map(coin => coin.totalValue.toFixed(2))
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
						labelString: "Coin Symbol"
					}
				}
			]
		},
		legend: {
			display: false
		}
	};

	return (
		<div style={{ width: "500px", height: "250px" }}>
			<Bar data={data} options={options} />
		</div>
	);
};

export default PortfolioChart;
