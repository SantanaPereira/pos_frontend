import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import reducers from "./reducers";
import logger from "redux-logger";
import { composeWithDevTools } from 'redux-devtools-extension';

var middlewares = null;

if (process.env.REACT_APP_IS_PRODUCTION === "1") {
  middlewares = applyMiddleware(thunk);
} else {
  middlewares = applyMiddleware(thunk, logger);
}

const store = createStore(reducers, composeWithDevTools(middlewares));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

