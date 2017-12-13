const marketDataURL =
	"https://min-api.cryptocompare.com/data/pricemultifull?tsyms=USD&fsyms=";
const coinListURL = "https://min-api.cryptocompare.com/data/all/coinlist";

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
	}
};

export default API;
