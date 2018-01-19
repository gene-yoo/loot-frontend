import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import CoinContainer from "./components/CoinContainer";

class App extends Component {
	componentDidMount() {
		console.log("inside app, comp did mount");
		console.log("--------------------------------------");
	}

	render() {
		console.log("inside app, render");
		console.log("--------------------------------------");

		return <CoinContainer />;
	}
}

export default withRouter(App);
