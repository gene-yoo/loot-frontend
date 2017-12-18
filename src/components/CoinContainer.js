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
			filteredCoins: ["BTC", "ETH"]
		};
	}

	componentDidMount() {
		console.log("inside coin container, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		this.props.fetchAllCoins();
		this.props.fetchMarketData(this.state.filteredCoins);
		this.props.fetchCoinHistoData(this.state.selectedSym);

		// setInterval(() => this.props.fetchAllCoins(), 60000);
		// setInterval(
		// 	() => this.props.fetchCoinHistoData(this.state.selectedSym),
		// 	60000
		// );
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
		console.log("inside coin cointainer, handle search term");
		console.log("event target: ", ev.target.value);
		this.setState({
			searchTerm: ev.target.value
		});
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
