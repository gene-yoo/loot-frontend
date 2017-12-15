import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO
} from "../actions/types";

const defaultInitialState = { marketData: {}, allCoins: [], coinHisto: [] };

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

		case FETCH_COIN_HISTO:
			console.log("inside reducer, fetch coin histo");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");
			return { ...state, coinHisto: action.payload };

		default:
			console.log("inside reducer, default case");
			console.log("state: ", state);
			console.log("action: ", action);
			console.log("--------------------------------------");

			return state;
	}
};

export default reducer;
