import React, { Component } from "react";
import { Grid, Table, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import PortfolioChart from "./PortfolioChart";

class Portfolio extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("inside portfolio, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		// if (localStorage.getItem("token")) {
		// 	let token = localStorage.getItem("token");
		// 	this.props.fetchExistingPortfolio(token);
		// }

		if (this.props.portfolio.id !== "") {
			let coinSyms = Object.keys(this.props.portfolio.net_holdings);
			this.props.fetchMarketData(coinSyms);
		}
	}

	componentWillReceiveProps() {
		console.log("inside portfolio, comp will receive props");
		console.log("props: ", this.props);
		console.log("--------------------------------------");
	}

	// --- helper methods --------------------------------------------------

	mapHoldings() {
		console.log("inside portfolio, mapHoldings");

		let marketData = this.props.marketData["RAW"];
		let holdings = this.props.portfolio.net_holdings;
		let coins = [];

		for (const coin in holdings) {
			coins.push({
				symbol: coin,
				totalValue:
					marketData[coin]["USD"]["PRICE"] * parseFloat(holdings[coin])
			});
		}

		console.log("coins from mapHoldings: ", coins);
		console.log("--------------------------------------");

		return coins;
	}

	mapInvestments() {
		// console.log("inside portfolio, mapEarnings");
		// console.log("props are: ", this.props);
		// console.log("--------------------------------------");

		let investments = {};

		for (let trans of this.props.portfolio.transactions) {
			if (investments[trans.coin_symbol]) {
				trans.trans_type === "buy"
					? (investments[trans.coin_symbol] += parseFloat(trans.trans_amt))
					: (investments[trans.coin_symbol] -= parseFloat(trans.trans_amt));
			} else {
				investments[trans.coin_symbol] = parseFloat(trans.trans_amt);
			}
		}

		// console.log("investments from mapInvestments: ", investments);

		return investments;
	}

	sumInvestments() {
		let allInv = this.mapInvestments();
		let sum = 0;

		for (const coinSym in allInv) {
			sum += allInv[coinSym];
		}
		return sum;
	}

	// --- render methods --------------------------------------------------

	renderHoldings() {
		// console.log("inside portfolio, renderHoldings");
		// console.log("props are: ", this.props);
		// console.log("--------------------------------------");

		let holdings = "Loading ...";

		let totalPortfolio = this.mapHoldings().reduce((acc, curr) => {
			return acc + parseFloat(curr.totalValue);
		}, 0);

		let rank = 0;

		let inv = this.mapInvestments();

		holdings = this.mapHoldings()
			.sort((a, b) => b.totalValue - a.totalValue)
			.map(coin => {
				return (
					<Table.Row
						key={coin.symbol}
						style={{
							height: "50px"
						}}
					>
						<Table.Cell>{(rank += 1)}</Table.Cell>
						<Table.Cell>{coin.symbol}</Table.Cell>
						<Table.Cell>
							{(coin.totalValue / totalPortfolio * 100).toFixed(2)} %
						</Table.Cell>
						<Table.Cell>$ {coin.totalValue.toFixed(2)}</Table.Cell>
						{coin.totalValue - inv[coin.symbol] > 0 ? (
							<Table.Cell style={{ color: "green" }}>
								+ $ {Math.abs(coin.totalValue - inv[coin.symbol]).toFixed(2)}
							</Table.Cell>
						) : (
							<Table.Cell style={{ color: "red" }}>
								- $ {Math.abs(coin.totalValue - inv[coin.symbol]).toFixed(2)}
							</Table.Cell>
						)}
					</Table.Row>
				);
			});

		return holdings;
	}

	renderTransactions() {
		let transactions = "Loading ...";

		transactions = this.props.portfolio.transactions.map(trans => {
			return (
				<Table.Row
					key={trans.trans_id}
					style={{
						height: "50px"
					}}
				>
					<Table.Cell>{new Date(trans.created_at).toLocaleString()}</Table.Cell>
					<Table.Cell>{trans.trans_type}</Table.Cell>
					<Table.Cell>{trans.coin_symbol}</Table.Cell>
					<Table.Cell>$ {parseFloat(trans.trans_amt).toFixed(2)}</Table.Cell>
					<Table.Cell>$ {parseFloat(trans.trans_price).toFixed(2)}</Table.Cell>
					<Table.Cell>{trans.quantity}</Table.Cell>
				</Table.Row>
			);
		});

		return transactions;
	}

	renderPerformance() {
		let stats = "Loading ...";
		// console.log("transactions are: ", portfolio.transactions);

		let totalValue = this.mapHoldings().reduce((acc, curr) => {
			return acc + curr.totalValue;
		}, 0);

		let totalInv = this.sumInvestments();

		let totalEarnings = totalValue - totalInv;

		let totalPerf = totalEarnings / totalInv * 100;

		stats = (
			<div style={{ width: "100%" }}>
				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "5px"
					}}
				>
					<span
						style={{
							fontSize: "2em",
							position: "relative",
							top: "15px"
						}}
					>
						$ {totalInv.toFixed(2)}
					</span>
					<Header as="h5">Total Invested</Header>
				</div>
				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "5px"
					}}
				>
					<span
						style={{
							fontSize: "2em",
							position: "relative",
							top: "15px"
						}}
					>
						$ {parseFloat(this.props.portfolio.balance).toFixed(2)}
					</span>
					<Header as="h5">Remaining Free Cash</Header>
				</div>

				<br />

				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "5px"
					}}
				>
					<span
						style={{
							fontSize: "2em",
							position: "relative",
							top: "15px"
						}}
					>
						$ {totalValue.toFixed(2)}
					</span>
					<Header as="h5">Total Portfolio Value</Header>
				</div>
				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "5px"
					}}
				>
					{totalEarnings > 0 ? (
						<span
							style={{
								color: "green",
								fontSize: "2em",
								position: "relative",
								top: "15px"
							}}
						>
							+ $ {Math.abs(totalEarnings).toFixed(2)}
						</span>
					) : (
						<span
							style={{
								color: "red",
								fontSize: "2em",
								position: "relative",
								top: "15px"
							}}
						>
							- $ {Math.abs(totalEarnings).toFixed(2)}
						</span>
					)}
					<Header as="h5">YTD Performance $</Header>
				</div>
				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "5px"
					}}
				>
					{totalPerf > 0 ? (
						<span
							style={{
								color: "green",
								fontSize: "2em",
								position: "relative",
								top: "15px"
							}}
						>
							+ {Math.abs(totalPerf).toFixed(2)} %
						</span>
					) : (
						<span
							style={{
								color: "red",
								fontSize: "2em",
								position: "relative",
								top: "15px"
							}}
						>
							- {Math.abs(totalPerf).toFixed(2)} %
						</span>
					)}
					<Header as="h5">YTD Performance %</Header>
				</div>
			</div>
		);

		return stats;
	}

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		let marketDataKeys = this.props.marketData.DISPLAY
			? Object.keys(this.props.marketData.DISPLAY)
			: [];

		let updateStatus = marketDataKeys.every(key =>
			Object.keys(this.props.portfolio.net_holdings).includes(key)
		);

		return this.props.marketData.DISPLAY && updateStatus ? (
			<Grid>
				<Grid.Column width={6}>
					<Header as="h3" style={{ textAlign: "left" }}>
						Portfolio Distribution $
					</Header>
					<PortfolioChart holdings={this.mapHoldings()} />
					<Header as="h3" style={{ textAlign: "left" }}>
						Net Holdings
					</Header>
					<Table textAlign="left" style={{ width: "475px" }}>
						<Table.Header>
							<Table.Row style={{ height: "25px" }}>
								<Table.HeaderCell>Rank</Table.HeaderCell>
								<Table.HeaderCell>Coin Symbol</Table.HeaderCell>
								<Table.HeaderCell>% Portfolio</Table.HeaderCell>
								<Table.HeaderCell>Tot Value $</Table.HeaderCell>
								<Table.HeaderCell>Net Earnings $</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>{this.renderHoldings()}</Table.Body>
					</Table>
				</Grid.Column>
				<Grid.Column width={10}>
					<Header as="h3" style={{ textAlign: "left" }}>
						Portfolio Performance
					</Header>
					<div>{this.renderPerformance()}</div>
					<Header as="h3" style={{ textAlign: "left" }}>
						Recent Transactions
					</Header>
					<Table textAlign="left" style={{ width: "800px" }}>
						<Table.Header>
							<Table.Row style={{ height: "25px" }}>
								<Table.HeaderCell>Timestamp</Table.HeaderCell>
								<Table.HeaderCell>Type</Table.HeaderCell>
								<Table.HeaderCell>Coin Symbol</Table.HeaderCell>
								<Table.HeaderCell>Trans Amt $</Table.HeaderCell>
								<Table.HeaderCell>Trans Price</Table.HeaderCell>
								<Table.HeaderCell>Trans Qty</Table.HeaderCell>
							</Table.Row>
						</Table.Header>
						<Table.Body>{this.renderTransactions()}</Table.Body>
					</Table>
				</Grid.Column>
			</Grid>
		) : (
			<div>Loading ...</div>
		);
	}
}

export default withRouter(Portfolio);
