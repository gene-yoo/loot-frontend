import React, { Component } from "react";
import { Grid, Table, Header } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Portfolio extends Component {
	constructor(props) {
		super(props);
	}

	componentDidMount() {
		console.log("inside portfolio, comp did mount");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		if (localStorage.getItem("token")) {
			let token = localStorage.getItem("token");
			this.props.fetchExistingPortfolio(token);
		}
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
					<Table.Cell>{trans.balance}</Table.Cell>
					<Table.Cell>{new Date(trans.created_at).toLocaleString()}</Table.Cell>
					<Table.Cell>{trans.trans_type}</Table.Cell>
					<Table.Cell>{trans.coin_symbol}</Table.Cell>
					<Table.Cell>{trans.trans_amt}</Table.Cell>
					<Table.Cell>{trans.trans_price}</Table.Cell>
					<Table.Cell>{trans.quantity}</Table.Cell>
				</Table.Row>
			);
		});

		return transactions;
	}

	renderPerformance() {
		let stats = "Loading ...";
		let portfolio = this.props.portfolio;
		let marketData = this.props.marketData["RAW"];
		console.log("transactions are: ", portfolio.transactions);

		let totalValue = portfolio.transactions.reduce((acc, curr) => {
			return acc + curr.quantity * marketData[curr.coin_symbol]["USD"]["PRICE"];
		}, 0);

		let totalInv = portfolio.transactions.reduce((acc, curr) => {
			return acc + parseFloat(curr.trans_amt);
		}, 0);

		let totalPerf = (totalValue - totalInv) / totalInv * 100;
		console.log("total Value: ", totalValue);
		console.log("total Inv: ", totalInv);
		console.log("total Perf: ", totalPerf);

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
						$ {parseFloat(portfolio.balance).toFixed(2)}
					</span>
					<Header as="h5">Remaining Free Cash</Header>
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
						$ {Math.round(totalInv, -2).toFixed(2)}
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
						$ {Math.round(totalValue, -2).toFixed(2)}
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
					{totalPerf > 0 ? (
						<span
							style={{
								color: "green",
								fontSize: "2em",
								position: "relative",
								top: "15px"
							}}
						>
							+ {totalPerf.toFixed(2)} %
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
							- {totalPerf.toFixed(2)} %
						</span>
					)}
					<Header as="h5">YTD Performance</Header>
				</div>
			</div>
		);

		return stats;
	}

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<Grid>
				<Grid.Column width={6}>
					<Header as="h3">Inside First Column</Header>
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
								<Table.HeaderCell>Index</Table.HeaderCell>
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
		);
	}
}

export default withRouter(Portfolio);
