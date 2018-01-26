import React from "react";
import { Bar } from "react-chartjs-2";

const PortfolioChart = props => {
	console.log("inside portfolio chart, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	const sortedHoldings = props.holdings.sort(
		(a, b) => b.totalValue - a.totalValue
	);

	const data = {
		labels: sortedHoldings.map(coin => coin.symbol),
		datasets: [
			{
				data: sortedHoldings.map(coin => coin.totalValue.toFixed(2)),
				backgroundColor: "rgba(153,204,255,1)",
				borderColor: "rgba(220,220,220,1)",
				borderWidth: 1,
				hoverBackgroundColor: "rgba(153,204,255,0.4)",
				hoverBorderColor: "rgba(220,220,220,1)"
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
					},
					ticks: {
						beginAtZero: true
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
		<div style={{ width: "100%", height: "250px" }}>
			<Bar data={data} options={options} />
		</div>
	);
};

export default PortfolioChart;
