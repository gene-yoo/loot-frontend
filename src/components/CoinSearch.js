import React from "react";
import { Input } from "semantic-ui-react";

const CoinSearch = props => {
	console.log("inside coin search, render");
	console.log("props: ", this.props);
	console.log("--------------------------------------");

	return (
		<div>
			<Input icon="search" placeholder="Search..." />
		</div>
	);
};

export default CoinSearch;
