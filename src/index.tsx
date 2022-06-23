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
import {composeWithDevTools} from "redux-devtools-extension";
import { load, save } from "redux-localstorage-simple";




const sagaMiddleware = createSagaMiddleware()


// Stay logged in using local storage
const PERSISTED_KEYS: string[] = ['user.token']
const loadedState = load({
    states: PERSISTED_KEYS,
    disableWarnings: true
})

//const store = createStore(rootReducer,loadedState, composeWithDevTools(applyMiddleware(sagaMiddleware, save({ states: PERSISTED_KEYS }))));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(rootSaga)

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

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
