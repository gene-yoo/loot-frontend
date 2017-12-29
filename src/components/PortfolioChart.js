import React from "react";
import { Pie } from "react-chartjs-2";

const PortfolioChart = props => {
	console.log("inside portfolio chart, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	const data = {
		labels: ["Red", "Green", "Yellow"],
		datasets: [
			{
				data: [300, 50, 100],
				backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
				hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"]
			}
		]
	};

	return (
		<div style={{ width: "400px", height: "400px" }}>
			<Pie data={data} />
		</div>
	);
};

export default PortfolioChart;
