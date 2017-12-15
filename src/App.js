import React, { Component } from "react";
import CoinContainer from "./components/CoinContainer";

class App extends Component {
	componentDidMount() {
		console.log("inside app, comp did mount");
		console.log("--------------------------------------");
	}

	render() {
		console.log("inside app, render");
		console.log("--------------------------------------");

		return (
			<div style={{ textAlign: "center" }}>
				<CoinContainer />
			</div>
		);
	}
}

export default App;
