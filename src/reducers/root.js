import { combineReducers } from "redux";

import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO,
	CREATE_PORTFOLIO,
	SET_PORTFOLIO,
	SET_CURRENT_USER,
	LOGOUT_USER
} from "../actions/types";

const defaultInitialStateCoinReducer = {
	marketData: {},
	allCoins: [],
	coinHisto: []
};

const defaultInitialStateAuthReducer = {
	user_id: "",
	username: ""
};

const defaultInitialStatePortfolioReducer = {
	id: "",
	balance: "",
	description: "",
	name: "",
	transactions: []
};

const coinsReducer = (state = defaultInitialStateCoinReducer, action) => {
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

const authReducer = (state = defaultInitialStateAuthReducer, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			console.log("inside authReducer, set current user");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return {
				...state,
				user_id: action.payload.id,
				username: action.payload.username
			};
		case LOGOUT_USER:
			console.log("inside authReducer, logout user");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return { ...state, user_id: "", username: "" };
		default:
			return state;
	}
};

const portfolioReducer = (
	state = defaultInitialStatePortfolioReducer,
	action
) => {
	switch (action.type) {
		case CREATE_PORTFOLIO:
			console.log("inside portfolioReducer, create portfolio");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return action.payload;
		case SET_PORTFOLIO:
			console.log("inside portfolioReducer, set portfolio");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return action.payload;
		default:
			return state;
	}
};

const rootReducer = combineReducers({
	coins: coinsReducer,
	auth: authReducer,
	portfolio: portfolioReducer
});

export default rootReducer;
