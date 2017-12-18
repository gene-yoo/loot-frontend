import React, { Component } from "react";
import { Container, Form, Header, Button, Input } from "semantic-ui-react";

class Signup extends Component {
	constructor(props) {
		super(props);
		this.state = {
			username: "",
			password: "",
			passwordConfirmation: "",
			preferredSources: [],
			preferredCategories: []
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
		return (
			<Container align="center">
				<Header as="h1">Please sign up below:</Header>
				<Form
					onSubmit={ev => {
						ev.preventDefault();
						this.props.handleSignupSubmit(this.state);
					}}
				>
					<Container style={{ width: "500px" }}>
						<Form.Field className="field">
							<Input
								onChange={this.handleSignUpTerms}
								value={this.state.username}
								type="text"
								name="username"
								placeholder="Username"
							/>
						</Form.Field>
						<Form.Field>
							<Input
								onChange={this.handleSignUpTerms}
								value={this.state.password}
								type="password"
								name="password"
								placeholder="Password"
							/>
						</Form.Field>

						<Form.Field>
							<Input
								onChange={this.handleSignUpTerms}
								value={this.state.passwordConfirmation}
								type="password"
								name="passwordConfirmation"
								placeholder="Password Confirmation"
							/>
						</Form.Field>
					</Container>
					<br />
					<Form.Field>
						<Button type="submit">Submit</Button>
					</Form.Field>
				</Form>
			</Container>
		);
	}
}

export default Signup;
