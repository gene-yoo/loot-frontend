const URL =
	"https://min-api.cryptocompare.com/data/pricemultifull?fsyms=BTC&tsyms=USD";

const API = {
	fetchMarketData: () => {
		console.log("inside API: fetch market data");
		return fetch(URL).then(res => res.json());
	}
};

export default API;
