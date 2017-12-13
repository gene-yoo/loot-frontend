import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../actions/functions";

class CoinContainer extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		this.props.fetchMarketData();
	}

	render() {
		console.log("inside coin container, render");
		console.log("props: ", this.props);
		console.log("store: ", this.store);
		console.log("--------------------------------------");

		return <div>Inside Coin Container</div>;
	}
}

const mapStateToProps = state => ({
	marketData: state.marketData
});

export default connect(mapStateToProps, actions)(CoinContainer);
