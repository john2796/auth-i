import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import { BrowserRouter as Router, withRouter } from "react-router-dom";
import store from "./store/store";
const AppWithRouter = withRouter(App);
const app = (
  <Provider store={store}>
    <Router>
      <AppWithRouter />
    </Router>
  </Provider>
);
ReactDOM.render(app, document.getElementById("root"));
serviceWorker.unregister();
