import React, { Component } from "react";
import {
	Form,
	Button,
	Header,
	Container,
	Checkbox,
	Image
} from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			initialCoins: []
		};
	}

	handlePortfolioAttributes = event => {
		console.log("inside portfolio handle change");
		console.log("event target name: ", event.target.name);
		console.log("event target value: ", event.target.value);
		console.log("--------------------------------");

		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePortfolioCheckboxes = event => {
		let elem = event.target.parentElement.firstChild;

		console.log("inside portfolio handle portfolio checkboxes");
		console.log("value: ", elem.value);
		console.log("checked: ", elem.checked);

		let collection = this.state[elem.name];

		if (!elem.checked) {
			collection.push(elem.value);
		} else {
			collection = collection.filter(item => item !== elem.value);
		}

		this.setState({
			initialCoins: collection
		});
	};

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return <div> Inside View Portfolio</div>;
	}
}

export default withRouter(Portfolio);
