import React from "react";
import { Input, Header } from "semantic-ui-react";

const CoinSearch = props => {
	console.log("inside coin search, render");
	console.log("props: ", props);
	console.log("--------------------------------------");

	return (
		<div style={{ textAlign: "center" }}>
			<Header as="h3" style={{ display: "inline-block", paddingRight: "10px" }}>
				Filter:
			</Header>
			<Input
				icon="search"
				placeholder="Search by Coin..."
				style={{ width: "700px" }}
				onChange={props.handleSearchTerm}
				value={props.searchTerm}
			/>
		</div>
	);
};

export default CoinSearch;
