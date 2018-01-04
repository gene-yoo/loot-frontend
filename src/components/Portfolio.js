import React, { Component } from "react";
import { Grid, Table, Header, Image } from "semantic-ui-react";
import { withRouter } from "react-router-dom";
import PortfolioChart from "./PortfolioChart";

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			interval: ""
		};
	}

	componentDidMount() {
		console.log("inside portfolio, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		if (localStorage.getItem("token") && this.props.portfolio.id !== "") {
			// console.log("--------------------------------------");
			// console.log("        CLEARING CC INTERVAL           ");
			// console.log("--------------------------------------");
			clearInterval(this.props.coinContainerInterval);
			let token = localStorage.getItem("token");
			this.props.fetchExistingPortfolio(token);
			this.setPortfolioInterval();
		}
	}

	componentWillReceiveProps(nextProps) {
		console.log("inside portfolio, comp will receive props");
		console.log("props: ", this.props);
		console.log("props: ", nextProps);
		console.log("--------------------------------------");
	}

	componentWillUnmount() {
		console.log("inside portfolio, comp will unmount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		// console.log("--------------------------------------");
		// console.log("        CLEARING P INTERVAL           ");
		// console.log("--------------------------------------");

		clearInterval(this.state.interval);
		this.props.setCoinContainerInterval();
	}

	// --- set interval ----------------------------------------------------

	setPortfolioInterval = () => {
		// console.log("--------------------------------------");
		// console.log("         SETTING P INTERVAL           ");
		// console.log("--------------------------------------");

		let coinSyms = Object.keys(this.props.portfolio.net_holdings);
		this.props.fetchMarketData(coinSyms);

		let interval = setInterval(
			() => this.props.fetchMarketData(coinSyms),
			30000
		);

		this.setState({ interval });
	};

	// --- helper methods --------------------------------------------------

	mapHoldings() {
		// console.log("inside portfolio, mapHoldings");

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

		// console.log("coins from mapHoldings: ", coins);
		// console.log("--------------------------------------");

		return coins;
	}

	mapTransactions() {
		// console.log("inside portfolio, mapEarnings");
		// console.log("props are: ", this.props);
		// console.log("--------------------------------------");

		let netTransactions = {};

		for (let trans of this.props.portfolio.transactions) {
			if (trans.trans_type === "buy") {
				netTransactions[trans.coin_symbol]
					? (netTransactions[trans.coin_symbol] +=
							parseFloat(trans.trans_price) * parseFloat(trans.quantity))
					: (netTransactions[trans.coin_symbol] =
							parseFloat(trans.trans_price) * parseFloat(trans.quantity));
			} else {
				netTransactions[trans.coin_symbol]
					? (netTransactions[trans.coin_symbol] -=
							parseFloat(trans.trans_price) * parseFloat(trans.quantity))
					: (netTransactions[trans.coin_symbol] =
							parseFloat(trans.trans_price) * parseFloat(trans.quantity));
			}
		}

		console.log("netTransactions from mapTransactions: ", netTransactions);

		return netTransactions;
	}

	sumTransactions() {
		let netTransactions = this.mapTransactions();
		let sum = 0;

		for (const coinSym in netTransactions) {
			sum += netTransactions[coinSym];
		}
		return sum;
	}

	// --- render methods --------------------------------------------------

	renderCoinImage = coinSym => {
		let coin = this.props.allCoins.find(coin => coin.Symbol === coinSym);

		return (
			<Image
				src={`https://www.cryptocompare.com${coin.ImageUrl}`}
				style={{
					maxWidth: "30px",
					paddingRight: "10px",
					display: "inline-block"
				}}
			/>
		);
	};

	renderHoldings() {
		// console.log("inside portfolio, renderHoldings");
		// console.log("props are: ", this.props);
		// console.log("--------------------------------------");

		let holdings = "Loading ...";

		let totalPortfolio = this.mapHoldings().reduce((acc, curr) => {
			return acc + parseFloat(curr.totalValue);
		}, 0);

		let rank = 0;

		let netTransactions = this.mapTransactions();

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
						<Table.Cell>
							{this.renderCoinImage(coin.symbol)}
							{coin.symbol}
						</Table.Cell>
						<Table.Cell>
							{(coin.totalValue / totalPortfolio * 100).toFixed(2)} %
						</Table.Cell>
						<Table.Cell>$ {coin.totalValue.toFixed(2)}</Table.Cell>
						{coin.totalValue - netTransactions[coin.symbol] > 0 ? (
							<Table.Cell style={{ color: "green" }}>
								+ ${" "}
								{Math.abs(
									coin.totalValue - netTransactions[coin.symbol]
								).toFixed(2)}
							</Table.Cell>
						) : (
							<Table.Cell style={{ color: "red" }}>
								- ${" "}
								{Math.abs(
									coin.totalValue - netTransactions[coin.symbol]
								).toFixed(2)}
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
					<Table.Cell>
						{this.renderCoinImage(trans.coin_symbol)}
						{trans.coin_symbol}
					</Table.Cell>
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

		let totalTransactions = this.sumTransactions();

		let totalEarnings = totalValue - totalTransactions;

		let totalPerf = totalEarnings / totalTransactions * 100;

		stats = (
			<div style={{ width: "100%", textAlign: "center" }}>
				<div
					style={{
						display: "inline-block",
						border: "1px solid white",
						minWidth: "175px",
						minHeight: "30px",
						margin: "25px",
						textAlign: "center"
					}}
				>
					<span
						style={{
							fontSize: "3.5em",
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
						margin: "25px",
						textAlign: "center"
					}}
				>
					{totalEarnings > 0 ? (
						<span
							style={{
								color: "green",
								fontSize: "3.5em",
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
								fontSize: "3.5em",
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
						margin: "25px",
						textAlign: "center"
					}}
				>
					{totalPerf > 0 ? (
						<span
							style={{
								color: "green",
								fontSize: "3.5em",
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
								fontSize: "3.5em",
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
			<Grid centered columns={1}>
				<Grid.Column width={10}>{this.renderPerformance()}</Grid.Column>

				<Grid.Row centered columns={2}>
					<Grid.Column width={5}>
						<Header as="h3" style={{ textAlign: "left" }}>
							Net Holdings
						</Header>

						<PortfolioChart holdings={this.mapHoldings()} />

						<Table selectable textAlign="left" style={{ width: "100%" }}>
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

					<Grid.Column width={7}>
						<Header as="h3" style={{ textAlign: "left" }}>
							Recent Transactions
						</Header>
						<Table selectable textAlign="left" style={{ width: "100%" }}>
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
				</Grid.Row>
			</Grid>
		) : (
			<div>Loading ...</div>
		);
	}
}

export default withRouter(Portfolio);
