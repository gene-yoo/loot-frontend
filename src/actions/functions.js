import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO
} from "./types.js";

import API from "../services/Api";

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
				return parseInt(a.SortOrder, 10) - parseInt(b.SortOrder, 10);
			});

			dispatch({
				type: FETCH_ALL_COINS,
				payload: coins
			});
		});
	};
}

export function fetchMarketData(coinSyms) {
	return dispatch => {
		console.log("inside actions/functions, fetchMarketData");
		console.log("--------------------------------------");

		return API.fetchMarketData(coinSyms).then(res =>
			dispatch({
				type: FETCH_MARKET_DATA,
				payload: res
			})
		);
	};
}

export function fetchCoinHistoData(coinSym) {
	return dispatch => {
		console.log("inside actions/functions, fetchCoinHistoData");
		console.log("--------------------------------------");

		return API.fetchCoinHistoData(coinSym).then(res => {
			dispatch({
				type: FETCH_COIN_HISTO,
				payload: res.Data
			});
		});
	};
}
