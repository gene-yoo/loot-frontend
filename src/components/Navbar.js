import React, { Component } from "react";
import { Menu, Container } from "semantic-ui-react";

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
					<Menu.Item>Todays Markets</Menu.Item>
					<Menu.Item>My Porfolio</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default Navbar;
