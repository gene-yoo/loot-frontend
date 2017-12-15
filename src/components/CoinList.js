import React from "react";
import { Table, Image } from "semantic-ui-react";

const CoinList = props => {
	console.log("inside coin list, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	let coins = "Loading ...";

	if (props.marketData.DISPLAY) {
		coins = props.allCoins.slice(0, 49).map(coin => {
			let coinData = props.marketData.DISPLAY[coin.Symbol]["USD"];
			return (
				<Table.Row
					key={coin.Id}
					style={{ height: "50px" }}
					onClick={() => props.handleChartSelection(coin.Symbol)}
				>
					<Table.Cell>{coin.SortOrder}</Table.Cell>
					<Table.Cell verticalAlign="middle">
						<Image
							src={`https://www.cryptocompare.com${coin.ImageUrl}`}
							style={{ maxWidth: "20px", paddingRight: "10px" }}
						/>
						{coin.CoinName}
					</Table.Cell>
					<Table.Cell>{coin.Symbol}</Table.Cell>
					<Table.Cell>{coinData.MKTCAP}</Table.Cell>
					<Table.Cell>{coinData.PRICE}</Table.Cell>
					<Table.Cell>{coinData.CHANGE24HOUR}</Table.Cell>
					<Table.Cell>{coinData.HIGH24HOUR}</Table.Cell>
					<Table.Cell>{coinData.LOW24HOUR}</Table.Cell>
				</Table.Row>
			);
		});
	}

	return (
		<Table textAlign="left" style={{ width: "1000px" }}>
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
			<Table.Body>{coins}</Table.Body>
		</Table>
	);
};

export default CoinList;
