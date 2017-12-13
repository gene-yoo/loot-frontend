import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/functions";
import CoinList from "./CoinList";

class CoinContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("inside coin container, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		this.props.fetchAllCoins();
		this.props.fetchMarketData();
	}

	render() {
		console.log("inside coin container, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<div>
				<CoinList
					marketData={this.props.marketData}
					allCoins={this.props.allCoins}
				/>
			</div>
		);
	}
}

const mapStateToProps = state => ({
	marketData: state.marketData,
	allCoins: state.allCoins
});

export default connect(mapStateToProps, actions)(CoinContainer);
