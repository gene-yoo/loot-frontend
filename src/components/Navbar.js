import React, { Component } from "react";
import { Menu, Container, Button, Icon, Dropdown } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

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
					<Menu.Item header>
						<Icon name="creative commons" size="big" />
						LOOT
					</Menu.Item>
					<Menu.Item>
						<Button
							as="a"
							inverted
							onClick={() => this.props.history.push("/markets")}
						>
							Latest Market Prices
						</Button>
					</Menu.Item>

					<Menu.Item>
						<Dropdown
							button
							text="Manage Portfolio"
							style={{
								color: "white",
								backgroundColor: "rgba(153,204,255,1)",
								border: "2px solid white"
							}}
						>
							<Dropdown.Menu>
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
						<Button
							as="a"
							inverted
							onClick={() => this.props.history.push("/login")}
						>
							Login
						</Button>
					</Menu.Item>
				</Container>
			</Menu>
		);
	}
}

export default withRouter(Navbar);
