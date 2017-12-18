import React, { Component } from "react";
import { Menu, Container, Button } from "semantic-ui-react";
import { withRouter } from "react-router-dom";

class Navbar extends Component {
	render() {
		return (
			<Menu
				attached="top"
				size="large"
				style={{
					backgroundColor: "rgba(153,204,255,1)"
				}}
				inverted
			>
				<Container>
					<Menu.Item>Home</Menu.Item>
					<Menu.Item>
						<Button
							as="a"
							inverted
							onClick={() => this.props.history.push("/markets")}
						>
							Todays Markets
						</Button>
					</Menu.Item>
					<Menu.Item>
						<Button
							as="a"
							inverted
							onClick={() => this.props.history.push("/signup")}
						>
							Signup
						</Button>
					</Menu.Item>
					<Menu.Item>My Porfolio</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default withRouter(Navbar);
