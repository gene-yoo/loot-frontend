import React, { Component } from "react";
import {
	Form,
	Button,
	Header,
	Container,
	Checkbox,
	Image
} from "semantic-ui-react";
import { Link } from "react-router-dom";

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: "",
			initialCoins: []
		};
	}

	handlePortfolioAttributes = event => {
		console.log("inside portfolio handle change");
		console.log("event target name: ", event.target.name);
		console.log("event target value: ", event.target.value);
		console.log("--------------------------------");

		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePortfolioCheckboxes = event => {
		let elem = event.target.parentElement.firstChild;

		console.log("inside portfolio handle portfolio checkboxes");
		console.log("value: ", elem.value);
		console.log("checked: ", elem.checked);

		let collection = this.state[elem.name];

		if (!elem.checked) {
			collection.push(elem.value);
		} else {
			collection = collection.filter(item => item !== elem.value);
		}

		this.setState({
			initialCoins: collection
		});
	};

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		let initialCoins = this.props.allCoins.slice(0, 20).map(coin => (
			<div
				key={coin.Id}
				align="center"
				style={{
					width: "215px",
					height: "50px",
					textAlign: "left",
					border: "1px solid #b9cee5",
					borderRadius: "15px",
					display: "inline-block",
					margin: "5px"
				}}
			>
				<div
					style={{
						width: "25px",
						display: "inline-block",
						paddingRight: "20px"
					}}
				>
					<Checkbox
						name="initialCoins"
						value={coin.Symbol}
						onChange={this.handlePortfolioCheckboxes}
						style={{ position: "relative", top: "15px", marginLeft: "15px" }}
					/>
				</div>
				<div style={{ display: "inline-block" }}>
					<div
						style={{
							width: "40px",
							display: "inline-block",
							fontSize: "0.9em"
						}}
					>
						<Image
							src={`https://www.cryptocompare.com${coin.ImageUrl}`}
							style={{
								width: "35px",
								paddingRight: "10px",
								display: "inline-block",
								position: "relative",
								top: "10px",
								left: "20px"
							}}
						/>
					</div>
					<div
						style={{
							width: "125px",
							display: "inline-block",
							fontSize: "0.9em",
							position: "relative",
							top: "12px",
							left: "15px"
						}}
					>
						{coin.CoinName}
					</div>
				</div>
			</div>
		));

		return (
			<div>
				<Header
					as="h2"
					style={{ color: "rgba(153,204,255,1)" }}
					textAlign="center"
				>
					Create New Portfolio
				</Header>
				<Container>
					<Form
						size="large"
						onSubmit={ev => {
							ev.preventDefault();
							let props = this.props;
							let state = this.state;
							console.log(props);
							console.log(state);

							let coinInfo = props.allCoins
								.filter(coin => this.state.initialCoins.includes(coin.Symbol))
								.map(coin => {
									return {
										coinSymbol: coin.Symbol,
										coinName: coin.CoinName,
										coinPrice: props.marketData.RAW[coin.Symbol]["USD"]["PRICE"]
									};
								});

							debugger;

							this.props.submitNewPortfolio(
								{
									portfolio: {
										...this.state,
										user_id: this.props.user_id,
										initialCoins: coinInfo
									}
								},
								this.props.history
							);
						}}
					>
						<Form.Field>
							<Form.Input
								fluid
								icon="star"
								iconPosition="left"
								placeholder="Portfolio Name"
								onChange={this.handlePortfolioAttributes}
								name="name"
								value={this.state.name}
							/>
						</Form.Field>

						<Form.Field>
							<Form.Input
								fluid
								icon="content"
								iconPosition="left"
								placeholder="Portfolio Description (Optional)"
								onChange={this.handlePortfolioAttributes}
								name="description"
								value={this.state.description}
							/>
						</Form.Field>

						<Form.Field>
							<Header as="h3" style={{ color: "grey" }} textAlign="left">
								(Optional) Choose from the following coins to get started:
							</Header>
							{initialCoins}
						</Form.Field>

						<Button
							style={{ backgroundColor: "rgba(153,204,255,1)", color: "white" }}
							fluid
							size="large"
						>
							Submit
						</Button>
					</Form>
				</Container>
			</div>
		);
	}
}

export default Portfolio;
