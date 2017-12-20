import React, { Component } from "react";
import { Grid, Form, Button, Header, Icon, Message } from "semantic-ui-react";
import { Link } from "react-router-dom";

class Portfolio extends Component {
	constructor(props) {
		super(props);

		this.state = {
			name: "",
			description: ""
		};
	}

	handleChange = event => {
		console.log("inside portfolio handle change");
	};

	render() {
		return (
			<div>
				<Header
					as="h2"
					style={{ color: "rgba(153,204,255,1)" }}
					textAlign="left"
				>
					Create a New Portfolio
				</Header>
				<Form
					size="large"
					onSubmit={ev => {
						ev.preventDefault();
						this.props.loginUser({ auth: this.state }, this.props.history);
					}}
				>
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="Portfolio Name"
						onChange={this.handleLoginTerms}
						name="name"
						value={this.state.name}
					/>

					<Button
						style={{ backgroundColor: "rgba(153,204,255,1)", color: "white" }}
						fluid
						size="large"
					>
						Submit
					</Button>
				</Form>
			</div>
		);
	}
}

export default Portfolio;
