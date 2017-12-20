import { combineReducers } from "redux";

import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO,
	SET_CURRENT_USER
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
		default:
			return state;
	}
};

const rootReducer = combineReducers({ coins: coinsReducer, auth: authReducer });

export default rootReducer;
