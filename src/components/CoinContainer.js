import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/functions";

import { Route, Switch, withRouter } from "react-router-dom";
import { Segment } from "semantic-ui-react";

import CoinList from "./CoinList";
import CoinChart from "./CoinChart";
import CoinSearch from "./CoinSearch";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Login from "./Login";

class CoinContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSym: "BTC",
			searchTerm: "",
			filteredCoins: ["BTC"]
		};
	}

	componentDidMount() {
		console.log("inside coin container, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		this.props.fetchAllCoins();
		this.props.fetchCoinHistoData(this.state.selectedSym);

		setInterval(() => {
			this.props.fetchMarketData(this.state.filteredCoins);
			this.props.fetchCoinHistoData(this.state.selectedSym);
		}, 60000);
	}

	componentWillReceiveProps(nextProps) {
		console.log("inside coin container, component will receive props");
		console.log("next Props: ", nextProps);
		console.log("--------------------------------------");

		if (nextProps.allCoins !== this.props.allCoins) {
			let coins = nextProps.allCoins
				.sort((a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10))
				.map(coin => coin.Symbol)
				.slice(0, 49);
			//
			// console.log(
			// 	"inside coin container, component will receive props -- if statement"
			// );
			// console.log("coins are: ", coins);
			// console.log("--------------------------------------");

			this.setState(
				{
					filteredCoins: coins
				},
				() => nextProps.fetchMarketData(this.state.filteredCoins)
			);
		}
	}

	componentWillUnmount() {
		console.log("inside coin container, component will unmount");
		console.log("--------------------------------------");
	}

	handleChartSelection = coinSym => {
		console.log("inside coin container, handle chart selection");
		console.log("coin symbol: ", coinSym);
		console.log("--------------------------------------");

		this.setState(
			{
				selectedSym: coinSym
			},
			() => this.props.fetchCoinHistoData(this.state.selectedSym)
		);
	};

	handleSearchTerm = ev => {
		console.log("inside coin container, handle search term");
		console.log("event target: ", ev.target.value);
		let searchTerm = ev.target.value;
		let coinMatches = this.props.allCoins
			.filter(coin => coin.FullName.toLowerCase().includes(searchTerm))
			.sort((a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10))
			.map(coin => coin.Symbol)
			.slice(0, 49);

		this.setState(
			{
				searchTerm: searchTerm,
				filteredCoins: coinMatches
			},
			() => this.props.fetchMarketData(this.state.filteredCoins)
		);
	};

	render() {
		console.log("inside coin container, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<div>
				<Navbar />

				<Segment attached="bottom">
					<Switch>
						<Route
							path="/signup"
							render={props => {
								return <Signup signupUser={this.props.signupUser} {...props} />;
							}}
						/>
						<Route
							path="/login"
							render={() => {
								return <Login loginUser={this.props.loginUser} />;
							}}
						/>
						<Route
							path="/markets"
							render={() => {
								return (
									<div>
										<CoinChart
											coinHisto={this.props.coinHisto}
											selectedSym={this.state.selectedSym}
										/>
										<br />
										<CoinSearch
											handleSearchTerm={this.handleSearchTerm}
											searchTerm={this.state.searchTerm}
										/>
										<CoinList
											marketData={this.props.marketData}
											allCoins={this.props.allCoins}
											filteredCoins={this.state.filteredCoins}
											handleChartSelection={this.handleChartSelection}
											selectedSym={this.state.selectedSym}
											searchTerm={this.state.searchTerm}
										/>
									</div>
								);
							}}
						/>
					</Switch>
				</Segment>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	marketData: state.coins.marketData,
	allCoins: state.coins.allCoins,
	coinHisto: state.coins.coinHisto
});

export default withRouter(connect(mapStateToProps, actions)(CoinContainer));
