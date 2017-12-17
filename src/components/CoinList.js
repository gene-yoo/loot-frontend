import React, { Component } from "react";
import { Table, Image } from "semantic-ui-react";

class CoinList extends Component {
	filterCoins() {
		console.log("inside coin list, filter coins");
		console.log("coins are: ", this.props.allCoins);

		return this.props.allCoins;
	}

	renderCoins() {
		let coins = "Loading ...";

		if (this.props.marketData.DISPLAY) {
			coins = this.filterCoins()
				.slice(0, 49)
				.map(coin => {
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
					</Table.Row>
				</Table.Header>
				<Table.Body>{this.renderCoins()}</Table.Body>
			</Table>
		);
	}
}

export default CoinList;
