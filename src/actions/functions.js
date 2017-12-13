import { FETCH_MARKET_DATA, FETCH_ALL_COINS } from "./types.js";
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

export function fetchAllCoins() {
	return dispatch => {
		console.log("inside actions/functions, fetchAllCoins");
		console.log("--------------------------------------");

		return API.fetchAllCoins().then(res => {
			let coins = [];
			for (const coin in res["Data"]) {
				coins.push(res["Data"][coin]);
			}
			coins.sort((a, b) => {
				return parseInt(a.SortOrder) - parseInt(b.SortOrder);
			});
			console.log("coins array: ", coins);

			dispatch({
				type: FETCH_ALL_COINS,
				payload: coins
			});
		});
	};
}

export function fetchMarketDataByCoins() {}
