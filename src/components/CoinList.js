import React, { Component } from "react";
import {
	Table,
	Image,
	Button,
	Modal,
	Grid,
	Header,
	Form
} from "semantic-ui-react";

class CoinList extends Component {
	constructor(props) {
		super(props);

		this.state = {
			purchaseAmount: ""
		};
	}

	convertEpochToLocal = epoch => {
		let date = new Date(0);
		date.setUTCSeconds(epoch);
		return date.toLocaleString();
	};

	shortenPurchaseQty = qty => {
		return qty.toString().length > 15
			? qty
					.toString()
					.split("")
					.slice(0, 13)
					.join("") + "..."
			: qty.toString();
	};

	handlePurchaseAmount = ev => {
		console.log("inside coin list, handle purchase amount");
		console.log("--------------------------------------");

		this.setState(
			{
				purchaseAmount: ev.target.value
			},
			() => console.log(this.state.purchaseAmount)
		);
	};

	handlePurchaseSubmit = ev => {
		console.log("inside coin list, handle purchase submit");
		console.log("--------------------------------------");
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

		return (
			<div>
				<Modal trigger={<Button>Buy</Button>}>
					<Modal.Header>Buy</Modal.Header>
					<Modal.Content>
						<Modal.Description>
							<Grid>
								<Grid.Column width={16}>
									<Grid.Row style={{ marginBottom: "30px" }}>
										<div
											style={{
												display: "inline-block",
												border: "1px solid white",
												minHeight: "30px",
												marginRight: "40px"
											}}
										>
											<Header as="h5" textAlign="left">
												Coin Name
											</Header>
											<Image
												src={`https://www.cryptocompare.com${selectedCoinInfo.ImageUrl}`}
												style={{
													maxWidth: "30px",
													paddingRight: "10px",
													display: "inline-block"
												}}
											/>
											<span
												style={{
													fontSize: "1.5em",
													verticalAlign: "middle"
												}}
											>
												{selectedCoinInfo.FullName}
											</span>
										</div>
										<div
											style={{
												display: "inline-block",
												border: "1px solid white",
												minHeight: "30px",
												marginRight: "40px"
											}}
										>
											<Header as="h5" textAlign="left">
												Current Price
											</Header>
											<span
												style={{
													fontSize: "1.5em",
													verticalAlign: "middle"
												}}
											>
												$ {selectedCoinPricing.PRICE}
											</span>
										</div>
										<div
											style={{
												display: "inline-block",
												border: "1px solid white",
												minHeight: "30px",
												marginRight: "40px"
											}}
										>
											<Header as="h5" textAlign="left">
												As Of
											</Header>
											<span
												style={{
													fontSize: "1.5em",
													verticalAlign: "middle"
												}}
											>
												{this.convertEpochToLocal(
													selectedCoinPricing.LASTUPDATE
												)}
											</span>
										</div>
										<div
											style={{
												display: "inline-block",
												border: "1px solid white",
												minHeight: "30px",
												marginRight: "40px"
											}}
										>
											<Header as="h5" textAlign="left">
												Source
											</Header>
											<span
												style={{
													fontSize: "1.5em",
													verticalAlign: "middle"
												}}
											>
												{selectedCoinPricing.LASTMARKET}
											</span>
										</div>
									</Grid.Row>
									<Grid.Row style={{ marginBottom: "30px" }}>
										<Form
											style={{ display: "inline-block" }}
											onSubmit={this.handlePurchaseSubmit}
										>
											<div
												style={{
													display: "inline-block",
													border: "1px solid white",
													minHeight: "30px",
													marginRight: "40px"
												}}
											>
												<Header as="h5" textAlign="left">
													Available Free Cash
												</Header>
												<span
													style={{
														fontSize: "1.5em",
														verticalAlign: "middle"
													}}
												>
													$
													{parseFloat(this.props.portfolio.balance).toFixed(2)}
												</span>
											</div>
											<div
												style={{
													display: "inline-block",
													border: "1px solid white",
													minHeight: "30px",
													marginRight: "40px"
												}}
											>
												<Header as="h5" textAlign="left">
													Enter Purchase $ Amount
												</Header>
												<Form.Input
													id="purchase-amount"
													placeholder="Purchase Amount ($)"
													onChange={this.handlePurchaseAmount}
												/>
											</div>
											<div
												style={{
													display: "inline-block",
													border: "1px solid white",
													minHeight: "30px",
													marginRight: "40px"
												}}
											>
												<Header as="h5" textAlign="left">
													Purchase Qty
												</Header>
												<span
													style={{
														fontSize: "1.5em",
														verticalAlign: "middle"
													}}
												>
													{this.state.purchaseAmount === ""
														? 0
														: this.shortenPurchaseQty(
																parseFloat(this.state.purchaseAmount) /
																	selectedCoinPricing.PRICE
															)}
												</span>
											</div>
											<div
												style={{
													display: "inline-block",
													border: "1px solid white",
													minHeight: "30px",
													marginRight: "40px"
												}}
											>
												<Header as="h5" textAlign="left">
													Net Remaining Free Cash
												</Header>
												<span
													style={{
														fontSize: "1.5em",
														verticalAlign: "middle"
													}}
												>
													$
													{this.state.purchaseAmount === ""
														? parseFloat(this.props.portfolio.balance).toFixed(
																2
															)
														: (parseFloat(this.props.portfolio.balance) -
																parseFloat(this.state.purchaseAmount)
															).toFixed(2)}
												</span>
											</div>
											<br />
											<Header as="h5">Confirm your purchase?</Header>
											<Button type="submit">Yes, I Confirm</Button>
											<Button type="submit">No, Cancel Transaction</Button>
										</Form>
									</Grid.Row>
								</Grid.Column>
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
