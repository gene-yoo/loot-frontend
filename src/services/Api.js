const marketDataURL =
	"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
const coinListURL = "https://min-api.cryptocompare.com/data/all/coinlist";

const API = {
	fetchMarketData: () => {
		console.log("inside API, fetch market data");
		console.log("--------------------------------------");

		return fetch(marketDataURL).then(res => res.json());
	},

	fetchAllCoins: () => {
		console.log("inside API, fetch all coins");
		console.log("--------------------------------------");

		return fetch(coinListURL).then(res => res.json());
	}
};

export default API;
