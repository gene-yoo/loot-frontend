import React, { Component } from "react";
import { Menu, Container, Button, Icon, Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

class Navbar extends Component {
	render() {
		console.log("inside navbar, render");
		console.log("props: ", this.props);
		console.log("--------------------------------------");

		return this.props.history.location.pathname === "/welcome" ? null : (
			<Menu
				attached="top"
				size="large"
				style={{
					backgroundColor: "rgba(153,204,255,1)"
				}}
				inverted
			>
				<Container>
					<Menu.Item header style={{ border: "none" }}>
						<Icon name="creative commons" size="big" />
						LOOT
					</Menu.Item>

					<Menu.Item style={{ border: "none" }}>
						<Dropdown
							button
							text="Main Menu"
							style={{
								color: "white",
								backgroundColor: "rgba(153,204,255,1)",
								border: "2px solid rgba(153,204,255,1)"
							}}
						>
							<Dropdown.Menu>
								<Dropdown.Item className="Item">
									<Link
										to="/markets"
										style={{ color: "black", fontSize: "0.9em" }}
									>
										<Icon name="folder" size="small" /> Latest Market Prices
									</Link>
								</Dropdown.Item>
								<Dropdown.Item className="Item">
									<Link
										to="/myportfolio"
										style={{ color: "black", fontSize: "0.9em" }}
									>
										<Icon name="folder" size="small" /> View Portfolio
									</Link>
								</Dropdown.Item>
								<Dropdown.Item className="Item">
									<Link
										to="/createportfolio"
										style={{ color: "black", fontSize: "0.9em" }}
									>
										<Icon name="folder" size="small" /> Create New Portfolio
									</Link>
								</Dropdown.Item>
							</Dropdown.Menu>
						</Dropdown>
					</Menu.Item>

					<Menu.Item position="right">
						{this.props.username === "" ? (
							<Button
								as="a"
								inverted
								onClick={() => this.props.history.push("/login")}
							>
								Login
							</Button>
						) : (
							<Button
								as="a"
								inverted
								onClick={() => this.props.logoutUser(this.props.history)}
							>
								Logout
							</Button>
						)}
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default withRouter(Navbar);
