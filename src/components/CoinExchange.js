import React, { Component } from "react";
import { Header, Button } from "semantic-ui-react";

class CoinExchange extends Component {
	constructor(props) {
		super(props);

		this.state = {
			transType: ""
		};
	}

	componentDidMount() {
		console.log("inside coin exchange, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		if (localStorage.getItem("token")) {
			let token = localStorage.getItem("token");
			this.props.fetchExistingPortfolio(token);
		}
	}

	handleTransactionType = ev => {
		console.log("inside coin exchange, handle Transaction Type");
		console.log("ev: ", ev.target.innerText);
		console.log("--------------------------------------");

		this.setState({
			transType: ev.target.innerText.toLowerCase()
		});
	};

	render() {
		console.log("inside coin exchange, render");
		console.log("state: ", this.state);
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<div>
				<Header as="h3">Inside Coin Exchange</Header>
				<div textAlign="left">
					<Button onClick={this.handleTransactionType}>Buy</Button>
					<Button onClick={this.handleTransactionType}>Sell</Button>
				</div>
			</div>
		);
	}
}

export default CoinExchange;
