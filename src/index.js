import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxThunk from "redux-thunk";
import App from "./App";
import "./index.css";
import reducer from "./reducers/root";
import { BrowserRouter as Router } from "react-router-dom";

console.log("inside index.js");
console.log("--------------------------------------");

const store = createStore(reducer, applyMiddleware(reduxThunk));

ReactDOM.render(
	<Router>
		<Provider store={store}>
			<App />
		</Provider>
	</Router>,
	document.getElementById("root")
);
