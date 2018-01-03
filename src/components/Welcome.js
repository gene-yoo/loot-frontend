import React from "react";
import { Segment } from "semantic-ui-react";

const imageURL =
	"https://images.unsplash.com/photo-1484344825633-f1a3d9927251?auto=format&fit=crop&w=1453&q=80";

const Welcome = props => {
	return (
		<div>
			<Segment
				style={{
					backgroundImage: `url(${imageURL})`,
					height: parseInt(window.innerHeight, 10) + 14 + "px",
					backgroundColor: "black"
				}}
			/>
		</div>
	);
};

export default Welcome;
