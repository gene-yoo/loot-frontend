import React, { Component } from "react";
import { Route, withRouter } from "react-router-dom";
import Welcome from "./components/Welcome";
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
			<Route
				path="/"
				render={() => {
					return <Welcome />;
				}}
			/>
		);
	}
}

export default withRouter(App);
