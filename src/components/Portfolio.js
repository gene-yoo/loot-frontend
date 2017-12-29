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
					<Table.Cell>{new Date(trans.created_at).toUTCString()}</Table.Cell>
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

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<Grid>
				<Grid.Column width={4}>
					<Header as="h3">Inside First Column</Header>
				</Grid.Column>
				<Grid.Column width={12}>
					<Header as="h3">Inside Second Column</Header>
					<Table textAlign="left" style={{ width: "800px" }}>
						<Table.Header>
							<Table.Row style={{ height: "25px" }}>
								<Table.HeaderCell>Index</Table.HeaderCell>
								<Table.HeaderCell>Timestamp</Table.HeaderCell>
								<Table.HeaderCell>Type</Table.HeaderCell>
								<Table.HeaderCell>Coin Symbol</Table.HeaderCell>
								<Table.HeaderCell>Trans Amt $</Table.HeaderCell>
								<Table.HeaderCell>Trans Price</Table.HeaderCell>
								<Table.HeaderCell>Quantity</Table.HeaderCell>
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
