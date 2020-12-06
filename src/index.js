import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import thunk from "redux-thunk";

import ScrollToTop from "./hoc/ScrollToTop";
import userReducer from "./store/reducers/user";
import searchReducer from "./store/reducers/search";
import authReducer from "./store/reducers/auth";
import roomReducer from "./store/reducers/room";
import messageReducer from "./store/reducers/message";

const composeEnhancers = process.env.NODE_ENV === "development" ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null|| compose;

const rootReducer = combineReducers({
  user: userReducer,
  search: searchReducer,
  auth: authReducer,
  room: roomReducer,
  message: messageReducer
})

const store = createStore(rootReducer,composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <App />
      </BrowserRouter>
     </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
