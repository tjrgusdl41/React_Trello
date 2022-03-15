import React from "react";
import ReactDOM from "react-dom";
import store from "./store";
import App from "./components/App";
import { Provider } from "react-redux";
import * as seviceWorker from "./serviceWorker";
import reportWebVitals from "./reportWebVitals";
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

//스토어의 상태를 Provider 에게 전달해서 업데이트를 시킬 수 있게함

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
