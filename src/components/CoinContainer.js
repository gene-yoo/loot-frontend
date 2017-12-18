import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/functions";
import CoinList from "./CoinList";
import CoinChart from "./CoinChart";
import CoinSearch from "./CoinSearch";

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
		// this.props.fetchMarketData(this.state.filteredCoins);
		this.props.fetchCoinHistoData(this.state.selectedSym);

		setInterval(() => {
			this.props.fetchMarketData(this.state.filteredCoins);
			this.props.fetchCoinHistoData(this.state.selectedSym);
		}, 15000);
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

			console.log(
				"inside coin container, component will receive props -- if statement"
			);
			console.log("coins are: ", coins);
			console.log("--------------------------------------");

			this.setState(
				{
					filteredCoins: coins
				},
				() => nextProps.fetchMarketData(this.state.filteredCoins)
			);
		}
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
		console.log("coin matches are: ", coinMatches);

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
	}
}

const mapStateToProps = state => ({
	marketData: state.marketData,
	allCoins: state.allCoins,
	coinHisto: state.coinHisto
});

export default connect(mapStateToProps, actions)(CoinContainer);
