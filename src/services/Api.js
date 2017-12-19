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

	signupUser: data => {
		console.log("inside API, signup User");
		console.log("data is: ", data);
		console.log("--------------------------------------");

		return fetch(apiURL + "signup", {
			method: "POST",
			headers,
			body: JSON.stringify(data)
		}).then(res => res.json());
	}
};

export default API;
