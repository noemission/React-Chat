import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";
import { Provider } from 'react-redux'
import store from "./store/";

import App from './main'
import './styles/main.scss'


const wrapper = document.getElementById("app");
wrapper ? ReactDOM.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
    , wrapper) : false;