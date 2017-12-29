const marketDataURL =
	"https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=";
const coinListURL = "https://min-api.cryptocompare.com/data/all/coinlist";
const coinHistoURL =
	"https://min-api.cryptocompare.com/data/histominute?tsym=USD&limit=1440&aggregate=3&e=CCCAGG&fsym=";
const apiURL = "http://localhost:3000/api/v1/";
const headers = {
	"Content-Type": "application/json",
	Accepts: "application/json"
};

const API = {
	fetchMarketData: coinSyms => {
		console.log("inside API, fetch market data");
		console.log("--------------------------------------");

		return fetch(marketDataURL + coinSyms.join(",")).then(res => res.json());
	},

	fetchAllCoins: () => {
		console.log("inside API, fetch all coins");
		console.log("--------------------------------------");

		return fetch(coinListURL).then(res => res.json());
	},

	fetchCoinHistoData: coinSym => {
		console.log("inside API, fetch coin histo data");
		console.log("--------------------------------------");

		return fetch(coinHistoURL + coinSym).then(res => res.json());
	},

	fetchExistingPortfolio: token => {
		console.log("inside API, fetch existing portfolio");
		console.log("--------------------------------------");

		return fetch(apiURL + "portfolios", {
			headers: Object.assign({}, headers, { token: token })
		}).then(res => res.json());
	},

	signupUser: data => {
		console.log("inside API, signup User");
		console.log("data is: ", data);
		console.log("--------------------------------------");

		return fetch(apiURL + "signup", {
			method: "POST",
			headers,
			body: JSON.stringify(data)
		}).then(res => res.json());
	},

	loginUser: data => {
		console.log("inside API, loginUser");
		console.log("data is: ", data);
		console.log("--------------------------------------");

		return fetch(apiURL + "login", {
			method: "POST",
			headers,
			body: JSON.stringify(data)
		}).then(res => res.json());
	},

	getCurrentUser: token => {
		console.log("inside API, getCurrentUser");
		console.log("--------------------------------------");

		return fetch(apiURL + "current_user", {
			headers: Object.assign({}, headers, { token: token })
		}).then(res => res.json());
	},

	submitNewPortfolio: formData => {
		console.log("inside API, submitNewPortfolio");
		console.log("form data is: ", formData);
		console.log("--------------------------------------");

		return fetch(apiURL + "portfolios", {
			method: "POST",
			headers,
			body: JSON.stringify(formData)
		}).then(res => res.json());
	}
};

export default API;
