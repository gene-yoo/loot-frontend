import React, { Component } from "react";
import logo from "../logo.svg";
import "../App.css";

class App extends Component {
	constructor() {
		super();

		this.state = {
			data: []
		};
	}

	render() {
		return <div className="App">Inside App</div>;
	}
}

export default App;
