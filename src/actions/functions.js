import { FETCH_MARKET_DATA, FETCH_COIN_LIST } from "./types.js";
import API from "../services/Api";

export function fetchMarketData() {
	return dispatch => {
		console.log("inside actions/functions, fetchMarketData");
		console.log("--------------------------------------");

		return API.fetchMarketData().then(res =>
			dispatch({
				type: FETCH_MARKET_DATA,
				payload: res
			})
		);
	};
}
