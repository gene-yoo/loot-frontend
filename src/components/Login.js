import React from "react";
import {
	Button,
	Form,
	Grid,
	Header,
	Icon,
	Message,
	Segment
} from "semantic-ui-react";

const Login = props => {
	return (
		<Grid textAlign="center" style={{ height: "100%" }} verticalAlign="middle">
			<Grid.Column style={{ maxWidth: 450 }}>
				<Header
					as="h2"
					style={{ color: "rgba(153,204,255,1)" }}
					textAlign="center"
				>
					<Icon name="creative commons" size="small" />
					Welcome to Loot!
				</Header>
				<Form size="large">
					<Form.Input
						fluid
						icon="user"
						iconPosition="left"
						placeholder="Username"
					/>
					<Form.Input
						fluid
						icon="lock"
						iconPosition="left"
						placeholder="Password"
						type="password"
					/>

					<Button
						style={{ backgroundColor: "rgba(153,204,255,1)", color: "white" }}
						fluid
						size="large"
					>
						Login
					</Button>
				</Form>
				<Message>
					New User? <a href="/signup">Please Sign Up Here</a>
				</Message>
			</Grid.Column>
		</Grid>
	);
};

export default Login;
