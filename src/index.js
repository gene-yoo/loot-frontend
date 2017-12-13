import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import App from "./App";

import { FETCH_MARKET_DATA, FETCH_ALL_COINS } from "./actions/types";
import "./index.css";

console.log("inside index.js");
console.log("--------------------------------------");

const defaultInitialState = { marketData: {}, allCoins: [] };

const reducer = (state = defaultInitialState, action) => {
	switch (action.type) {
		case FETCH_MARKET_DATA:
			console.log("inside reducer, fetch market data");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return { ...state, marketData: action.payload };

		case FETCH_ALL_COINS:
			console.log("inside reducer, fetch all coins");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return { ...state, allCoins: action.payload };

		default:
			console.log("inside reducer, default case");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return state;
	}
};

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById("root")
);
