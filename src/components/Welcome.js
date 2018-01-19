import React from "react";
import { Segment, Button } from "semantic-ui-react";
import { Link, withRouter } from "react-router-dom";

import CoinContainer from "./CoinContainer";

// const imageURL =
// 	"https://images.unsplash.com/photo-1484344825633-f1a3d9927251?auto=format&fit=crop&w=3300&q=80";

const imageURL =
	"https://images.unsplash.com/photo-1484344825633-f1a3d9927251?auto=format&fit=crop&w=2750&q=80";

const Welcome = props => {
	return (
		<div>
			<Segment
				style={{
					backgroundImage: `url(${imageURL})`,
					height: parseInt(window.innerHeight, 10) + "px",
					backgroundColor: "black"
				}}
			>
				<div
					style={{
						fontFamily: "Racing Sans One, cursive",
						color: "rgba(153,204,255,1)",
						fontSize: "5em",
						position: "relative",
						width: "100%",
						textAlign: "center",
						position: "relative",
						top: (parseInt(window.innerHeight, 10) + 14) / 3 + "px",
						margin: "25px"
					}}
				>
					{"L O O T"}
				</div>
				<div
					style={{
						color: "white",
						fontSize: "1.25em",
						position: "relative",
						width: "100%",
						textAlign: "center",
						position: "relative",
						top: (parseInt(window.innerHeight, 10) + 14) / 3 + 25 + "px",
						left: "20px"
					}}
				>
					{"Learn to trade cryptocurrencies without the risk."}
					<br />
					<br />

					<Link to="/markets">
						<Button
							inverted
							size="large"
							style={{ color: "rgba(153,204,255,1)" }}
						>
							Get Started
						</Button>
					</Link>
				</div>
			</Segment>
		</div>
	);
};

export default withRouter(Welcome);
