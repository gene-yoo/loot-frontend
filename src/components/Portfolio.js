import React, { Component } from "react";
import {
	Form,
	Button,
	Header,
	Container,
	Checkbox,
	Card,
	Input,
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

		this.setState({
			[event.target.name]: event.target.value
		});
	};

	handlePortfolioCheckboxes = event => {
		let collection = this.state[event.target.name];

		if (event.target.checked) {
			collection.push(parseInt(event.target.value));
		} else {
			collection = collection.filter(
				item => item !== parseInt(event.target.value)
			);
		}

		this.setState({
			[event.target.name]: collection
		});
	};

	render() {
		console.log("inside portfolio, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		// let initialCoins = this.props.allCoins.slice(0, 18).map(coin => (
		// 	<Card
		// 		key={coin.Id}
		// 		align="center"
		// 		style={{
		// 			width: "250px",
		// 			height: "50px",
		// 			display: "inline-block",
		// 			textAlign: "left"
		// 		}}
		// 	>
		// 		<Card.Content
		// 			style={{
		// 				paddingTop: "5px",
		// 				fontSize: "0.9em",
		// 				display: "inline-block"
		// 			}}
		// 		>
		// 			<Checkbox
		// 				name="preferredSources"
		// 				value={coin.Symbol}
		// 				onChange={this.handleSignUpCheckboxes}
		// 				style={{
		// 					display: "inline-block",
		// 					width: "50px"
		// 				}}
		// 			/>
		// 			<Image
		// 				src={`https://www.cryptocompare.com${coin.ImageUrl}`}
		// 				style={{
		// 					maxWidth: "40px",
		// 					paddingRight: "10px",
		// 					display: "inline-block"
		// 				}}
		// 			/>
		// 			{coin.CoinName}
		// 		</Card.Content>
		// 	</Card>
		// ));

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
						name="preferredSources"
						value={coin.Symbol}
						onChange={this.handleSignUpCheckboxes}
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
					textAlign="left"
				>
					Create a New Portfolio
				</Header>
				<Container>
					<Form
						size="large"
						onSubmit={ev => {
							ev.preventDefault();
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

						<Form.Field>{initialCoins}</Form.Field>

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
