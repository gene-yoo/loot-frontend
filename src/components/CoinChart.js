import React from "react";

const CoinChart = props => {
	console.log("inside coin chart, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	let chart = (
		<div>
			<p>Top of Chart</p>
			<canvas id="myChart" width="750" height="400" />
			<p>Bottom of Chart</p>
		</div>
	);

	return <div>{chart}</div>;
};

export default CoinChart;
