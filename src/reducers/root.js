import { combineReducers } from "redux";

import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO,
	SET_CURRENT_USER
} from "../actions/types";

const defaultInitialState = {
	marketData: {},
	allCoins: [],
	coinHisto: []
};

const coinsReducer = (state = defaultInitialState, action) => {
	switch (action.type) {
		case FETCH_ALL_COINS:
			console.log("inside coinsReducer, fetch all coins");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return { ...state, allCoins: action.payload };

		case FETCH_MARKET_DATA:
			console.log("inside coinsReducer, fetch market data");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return { ...state, marketData: action.payload };

		case FETCH_COIN_HISTO:
			console.log("inside coinsReducer, fetch coin histo");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");
			return { ...state, coinHisto: action.payload };

		default:
			console.log("inside coinsReducer, default case");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return state;
	}
};

const authReducer = (state = { currentUser: {} }, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			console.log("inside authReduer, set current user");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");
			debugger;

			const { id, username } = action.user;
			return { ...state, currentUser: { id, username } };
		default:
			return state;
	}
};

const rootReducer = combineReducers({ coins: coinsReducer, auth: authReducer });

export default rootReducer;
