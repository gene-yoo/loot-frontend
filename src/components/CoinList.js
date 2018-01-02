import React, { Component } from "react";
import { Table, Image, Button, Modal, Grid } from "semantic-ui-react";

class CoinList extends Component {
	constructor(props) {
		super(props);
	}

	handleExchangeSelection = ev => {
		console.log("inside coin list, handle Transaction Type");
		console.log("ev: ", ev.target);
		console.log("--------------------------------------");

		debugger;
	};

	filterCoins() {
		// console.log("inside coin list, filter coins");
		return this.props.allCoins.filter(coin =>
			Object.keys(this.props.marketData.DISPLAY).includes(coin.Symbol)
		);
	}

	renderExchangeModals() {
		let selectedCoinInfo = this.props.allCoins.find(
			coin => coin.Symbol === this.props.selectedSym
		);
		let selectedCoinPricing = this.props.marketData["RAW"][
			this.props.selectedSym
		]["USD"];

		console.log("selectedCoinInfo: ", selectedCoinInfo);
		console.log("selectedCoinPricing: ", selectedCoinPricing);

		return (
			<div>
				<Modal trigger={<Button>Buy</Button>}>
					<Modal.Header>Buy</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Grid>
								<Grid.Column width={8}>Inside First Column</Grid.Column>

								<Grid.Column width={8}>Inside Second Column</Grid.Column>
							</Grid>
						</Modal.Description>
					</Modal.Content>
				</Modal>
				<Modal trigger={<Button>Sell</Button>}>
					<Modal.Header>Sell</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							Inside Modal Description - Sell
						</Modal.Description>
					</Modal.Content>
				</Modal>
			</div>
		);
	}

	renderCoins() {
		let coins = "Loading ...";

		let marketDataKeys = this.props.marketData.DISPLAY
			? Object.keys(this.props.marketData.DISPLAY)
			: [];
		let updateStatus = marketDataKeys.every(key =>
			this.props.filteredCoins.includes(key)
		);

		if (this.props.marketData.DISPLAY && updateStatus) {
			coins = this.filterCoins().map(coin => {
				let coinData = this.props.marketData.DISPLAY[coin.Symbol]["USD"];
				let priceChangeStatus =
					this.props.marketData.RAW[coin.Symbol]["USD"]["CHANGE24HOUR"] > 0
						? "green"
						: "red";
				let selected =
					this.props.selectedSym === coin.Symbol ? "#E3F6FC" : "white";

				return (
					<Table.Row
						key={coin.Id}
						style={{
							height: "50px",
							backgroundColor: selected
						}}
						onClick={() => this.props.handleChartSelection(coin.Symbol)}
					>
						<Table.Cell>{coin.SortOrder}</Table.Cell>
						<Table.Cell verticalAlign="middle">
							<Image
								src={`https://www.cryptocompare.com${coin.ImageUrl}`}
								style={{
									maxWidth: "30px",
									paddingRight: "10px",
									display: "inline-block"
								}}
							/>
							{coin.CoinName}
						</Table.Cell>
						<Table.Cell>{coin.Symbol}</Table.Cell>
						<Table.Cell>{coinData.MKTCAP}</Table.Cell>
						<Table.Cell>{coinData.PRICE}</Table.Cell>
						<Table.Cell style={{ color: priceChangeStatus }}>
							{coinData.CHANGE24HOUR}
						</Table.Cell>
						<Table.Cell>{coinData.HIGH24HOUR}</Table.Cell>
						<Table.Cell>{coinData.LOW24HOUR}</Table.Cell>
						<Table.Cell>{this.renderExchangeModals()}</Table.Cell>
					</Table.Row>
				);
			});
		}

		return coins;
	}

	render() {
		console.log("inside coin list, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<Table selectable textAlign="left" style={{ width: "1000px" }}>
				<Table.Header>
					<Table.Row style={{ height: "25px" }}>
						<Table.HeaderCell>Rank</Table.HeaderCell>
						<Table.HeaderCell>Name</Table.HeaderCell>
						<Table.HeaderCell>Symbol</Table.HeaderCell>
						<Table.HeaderCell>Market Cap</Table.HeaderCell>
						<Table.HeaderCell>Price</Table.HeaderCell>
						<Table.HeaderCell>Change (24 Hrs)</Table.HeaderCell>
						<Table.HeaderCell>High (24 Hrs)</Table.HeaderCell>
						<Table.HeaderCell>Low (24 Hrs)</Table.HeaderCell>
						<Table.HeaderCell>Exchange</Table.HeaderCell>
					</Table.Row>
				</Table.Header>
				<Table.Body>{this.renderCoins()}</Table.Body>
			</Table>
		);
	}
}

export default CoinList;
