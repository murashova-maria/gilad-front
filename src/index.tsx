import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./assets/styles/index.scss";
import reportWebVitals from "./reportWebVitals";
import { rootReducer } from "./store";
import { createStore, applyMiddleware } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./i18";
import createSagaMiddleware from "@redux-saga/core";
import { rootSaga } from "./store/rootSaga";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(rootSaga)

root.render(
    <Router>
      <Provider store={store}>
        <App />
      </Provider>
    </Router>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
