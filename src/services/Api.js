const marketDataURL =
	"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";
const coinListURL = "https://min-api.cryptocompare.com/data/all/coinlist";

const API = {
	fetchMarketData: () => {
		console.log("inside API, fetch market data");
		console.log("--------------------------------------");

		return fetch(marketDataURL).then(res => res.json());
	},

	fetchCoinList: () => {
		console.log("inside API, fetch coin list");
		console.log("--------------------------------------");

		return fetch(coinListURL)
			.then(res => res.json())
			.then(res => console.log(res));
	}
};

export default API;
