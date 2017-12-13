import React, { Component } from "react";
import CoinContainer from "./components/CoinContainer";

class App extends Component {
	componentDidMount() {
		console.log("inside app, comp did mount");
		console.log("--------------------------------------");
	}

	render() {
		return (
			<div>
				<CoinContainer />
			</div>
		);
	}
}

export default App;
