import {
	FETCH_MARKET_DATA,
	FETCH_ALL_COINS,
	FETCH_COIN_HISTO,
	SET_CURRENT_USER,
	CREATE_PORTFOLIO,
	SET_PORTFOLIO,
	LOGOUT_USER
} from "./types.js";

import API from "../services/Api";

// API FETCH FUNCTIONS -------------------------------------------------------

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

export function fetchCoinHistoData(chartTiming, coinSym) {
	return dispatch => {
		console.log("inside actions/functions, fetchCoinHistoData");
		console.log("--------------------------------------");

		return API.fetchCoinHistoData(chartTiming, coinSym).then(res => {
			dispatch({
				type: FETCH_COIN_HISTO,
				payload: res.Data
			});
		});
	};
}

export function submitNewPortfolio(formData, history) {
	return dispatch => {
		console.log("inside actions/functions, submitNewPortfolio");
		console.log("--------------------------------------");

		return API.submitNewPortfolio(formData).then(res => {
			dispatch({
				type: CREATE_PORTFOLIO,
				payload: res
			});
			history.push("/myportfolio");
		});
	};
}

export function submitNewTransaction(transData, history) {
	return dispatch => {
		console.log("inside actions/functions, submitNewTransaction");
		console.log("--------------------------------------");

		return API.submitNewTransaction(transData).then(res => {
			dispatch({
				type: SET_PORTFOLIO,
				payload: res
			});
			history.push("/myportfolio");
		});
	};
}

export function fetchExistingPortfolio(token) {
	return dispatch => {
		console.log("inside actions/functions, fetch existing portfolio");
		console.log("--------------------------------------");

		return API.fetchExistingPortfolio(token).then(res => {
			dispatch({
				type: SET_PORTFOLIO,
				payload: res
			});
		});
	};
}

// AUTH FUNCTIONS -------------------------------------------------------

export function signupUser(data, history) {
	return dispatch => {
		console.log("inside actions/functions, signupUser");
		console.log("--------------------------------------");

		return API.signupUser(data).then(res => {
			console.log("response from signup is: ", res);
			localStorage.setItem("token", res.token);
			const { id, username } = res;
			dispatch({
				type: SET_CURRENT_USER,
				payload: { id, username }
			});
			history.push("/markets");
		});
	};
}

export function loginUser(data, history) {
	return dispatch => {
		console.log("inside actions/functions, loginUser");
		console.log("--------------------------------------");

		return API.loginUser(data).then(res => {
			console.log("response from login is: ", res);
			localStorage.setItem("token", res.token);
			const { id, username } = res;
			dispatch({
				type: SET_CURRENT_USER,
				payload: { id, username }
			});
			history.push("/markets");
		});
	};
}

export function getCurrentUser(token, history) {
	return dispatch => {
		console.log("inside actions/functions, get current user");
		console.log("--------------------------------------");

		return API.getCurrentUser(token).then(res => {
			console.log("response from fetch is: ", res);
			const { id, username } = res;
			dispatch({
				type: SET_CURRENT_USER,
				payload: { id, username }
			});

			if (history.location.pathname !== "/welcome") {
				history.push("/markets");
			}
		});
	};
}

export function logoutUser(history) {
	return dispatch => {
		console.log("inside actions/functions, logout user");
		console.log("--------------------------------------");
		localStorage.removeItem("token");

		history.push("/welcome");

		return dispatch({ type: LOGOUT_USER });
	};
}
