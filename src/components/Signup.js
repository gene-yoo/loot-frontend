import React, { Component } from "react";
import { Container, Form, Header, Button } from "semantic-ui-react";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			passwordConfirmation: ""
		};
	}

	handleSignUpTerms = event => {
		console.log("inside signup form, handle sign up terms");
		console.log("event target name: ", event.target.name);
		console.log("event target value: ", event.target.value);
		console.log("--------------------------------------");

		this.setState({
			[event.target.name]: event.target.value
		});
	};

	render() {
		console.log("inside signup, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return (
			<Container align="center">
				<Header
					as="h2"
					style={{ color: "rgba(153,204,255,1)" }}
					textAlign="center"
				>
					Please signup below.
				</Header>
				<Form
					size="large"
					onSubmit={ev => {
						ev.preventDefault();
						this.props.signupUser({ user: this.state }, this.props.history);
					}}
				>
					<Container style={{ width: "500px" }}>
						<Form.Input
							fluid
							icon="user"
							iconPosition="left"
							placeholder="Username"
							name="username"
							type="text"
							onChange={this.handleSignUpTerms}
							value={this.state.username}
						/>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Password"
							name="password"
							type="password"
							onChange={this.handleSignUpTerms}
							value={this.state.password}
						/>
						<Form.Input
							fluid
							icon="lock"
							iconPosition="left"
							placeholder="Confirm Password"
							name="passwordConfirmation"
							type="password"
							onChange={this.handleSignUpTerms}
							value={this.state.passwordConfirmation}
						/>
						<Button
							style={{ backgroundColor: "rgba(153,204,255,1)", color: "white" }}
							fluid
							size="large"
						>
							Submit
						</Button>
					</Container>
				</Form>
			</Container>
		);
	}
}

export default Signup;
