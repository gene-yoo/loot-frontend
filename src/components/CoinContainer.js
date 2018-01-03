import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/functions";

import { Route, Switch, withRouter } from "react-router-dom";
import { Segment, Button } from "semantic-ui-react";

import CoinList from "./CoinList";
import CoinChart from "./CoinChart";
import CoinSearch from "./CoinSearch";
import Navbar from "./Navbar";
import Signup from "./Signup";
import Login from "./Login";
import PortfolioForm from "./PortfolioForm";
import Portfolio from "./Portfolio";

class CoinContainer extends Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedSym: "BTC",
			searchTerm: "",
			filteredCoins: ["BTC"],
			interval: "",
			chartTiming: "24HRS"
		};
	}

	componentDidMount() {
		console.log("inside coin container, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		this.props.fetchAllCoins();
		this.props.fetchCoinHistoData(
			this.state.chartTiming,
			this.state.selectedSym
		);

		this.setCoinContainerInterval();

		if (localStorage.getItem("token")) {
			let token = localStorage.getItem("token");
			this.props.getCurrentUser(token, this.props.history);
			this.props.fetchExistingPortfolio(token);
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log("inside coin container, component will receive props");
		console.log("next Props: ", nextProps);

		if (nextProps.allCoins !== this.props.allCoins) {
			console.log("inside if statement");

			let coins = nextProps.allCoins
				.sort((a, b) => parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10))
				.map(coin => coin.Symbol)
				.slice(0, 49);

			this.setState(
				{
					filteredCoins: coins
				},
				() => nextProps.fetchMarketData(this.state.filteredCoins)
			);
		}

		console.log("--------------------------------------");
	}

	setCoinContainerInterval = () => {
		// console.log("--------------------------------------");
		// console.log("         SETTING CC INTERVAL           ");
		// console.log("--------------------------------------");

		this.props.fetchMarketData(this.state.filteredCoins);

		let interval = setInterval(() => {
			this.props.fetchMarketData(this.state.filteredCoins);
			this.props.fetchCoinHistoData(
				this.state.chartTiming,
				this.state.selectedSym
			);
		}, 60000);

		this.setState({ interval });
	};

	handleChartTimeline = ev => {
		console.log("inside coin container, handle chart timeline");
		console.log("ev: ", ev.target.innerText);
		console.log("--------------------------------------");

		this.setState(
			{
				chartTiming: ev.target.innerText
			},
			() =>
				this.props.fetchCoinHistoData(
					this.state.chartTiming,
					this.state.selectedSym
				)
		);
	};

	handleChartSelection = coinSym => {
		console.log("inside coin container, handle chart selection");
		console.log("coin symbol: ", coinSym);
		console.log("--------------------------------------");

		this.setState(
			{
				selectedSym: coinSym
			},
			() =>
				this.props.fetchCoinHistoData(
					this.state.chartTiming,
					this.state.selectedSym
				)
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

	handleTransactionSubmit = ({ transactionAmount, transactionType }) => {
		console.log("inside coin container, handle purchase submit");

		let transData = {
			portfolioId: this.props.portfolio.id,
			transactionAmount: parseFloat(transactionAmount),
			transactionType,
			coinSymbol: this.state.selectedSym,
			coinName: this.props.allCoins.find(
				coin => coin.Symbol === this.state.selectedSym
			),
			transactionPrice: this.props.marketData["RAW"][this.state.selectedSym][
				"USD"
			]["PRICE"]
		};

		console.log("transData: ", transData);
		console.log("--------------------------------------");

		this.props.submitNewTransaction(transData, this.props.history);
	};

	render() {
		console.log("inside coin container, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<div style={{ height: "100%" }}>
				<Navbar
					username={this.props.username}
					logoutUser={this.props.logoutUser}
				/>
				<div align="center">
					<Segment attached="bottom">
						<Switch>
							<Route
								path="/signup"
								render={props => {
									return (
										<Signup signupUser={this.props.signupUser} {...props} />
									);
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
											<div style={{ width: "1000px", textAlign: "right" }}>
												<div
													style={{
														display: "inline-block",
														marginRight: "15px",
														fontWeight: "bold"
													}}
												>
													Timeline:
												</div>
												<Button size="tiny" onClick={this.handleChartTimeline}>
													24HRS
												</Button>
												<Button size="tiny" onClick={this.handleChartTimeline}>
													7D
												</Button>
												<Button size="tiny" onClick={this.handleChartTimeline}>
													1M
												</Button>
											</div>

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
												handleTransactionSubmit={this.handleTransactionSubmit}
												selectedSym={this.state.selectedSym}
												searchTerm={this.state.searchTerm}
												portfolio={this.props.portfolio}
											/>
										</div>
									);
								}}
							/>
							<Route
								path="/createportfolio"
								render={() => {
									return (
										<PortfolioForm
											marketData={this.props.marketData}
											allCoins={this.props.allCoins}
											submitNewPortfolio={this.props.submitNewPortfolio}
											user_id={this.props.user_id}
										/>
									);
								}}
							/>
							<Route
								path="/myportfolio"
								render={() => {
									return (
										<Portfolio
											marketData={this.props.marketData}
											allCoins={this.props.allCoins}
											submitNewPortfolio={this.props.submitNewPortfolio}
											user_id={this.props.user_id}
											portfolio={this.props.portfolio}
											fetchExistingPortfolio={this.props.fetchExistingPortfolio}
											fetchMarketData={this.props.fetchMarketData}
											setCoinContainerInterval={this.setCoinContainerInterval}
											coinContainerInterval={this.state.interval}
										/>
									);
								}}
							/>
						</Switch>
					</Segment>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	marketData: state.coins.marketData,
	allCoins: state.coins.allCoins,
	coinHisto: state.coins.coinHisto,
	user_id: state.auth.user_id,
	username: state.auth.username,
	portfolio: state.portfolio
});

export default withRouter(connect(mapStateToProps, actions)(CoinContainer));
