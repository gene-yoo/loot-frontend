import { FETCH_MARKET_DATA, FETCH_ALL_COINS } from "./types.js";
import API from "../services/Api";

// export function fetchMarketData() {
// 	return dispatch => {
// 		console.log("inside actions/functions, fetchMarketData");
// 		console.log("--------------------------------------");
//
// 		return API.fetchMarketData().then(res =>
// 			dispatch({
// 				type: FETCH_MARKET_DATA,
// 				payload: res
// 			})
// 		);
// 	};
// }

export function fetchAllCoinsAndMarketData() {
	return dispatch => {
		console.log("inside actions/functions, fetchAllCoinsAndMarketData");
		console.log("--------------------------------------");

		return API.fetchAllCoins()
			.then(res => {
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

				return coins;
			})
			.then(coins => {
				let coinSyms = coins.slice(0, 50).map(coin => coin.Symbol);

				API.fetchMarketData(coinSyms).then(res =>
					dispatch({
						type: FETCH_MARKET_DATA,
						payload: res
					})
				);
			});
	};
}

export function fetchMarketDataByCoins() {}