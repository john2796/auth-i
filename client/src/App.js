import React, { Component } from "react";
import { Route } from "react-router-dom";
import Register from "./container/register/Register";
import Login from "./container/login/Login";
import Dashboard from "./container/dashboard/Dashboard";
import PrivateRoute from "./component/PrivateRoute";
import jwt_decode from "jwt-decode";
import { setCurrentUser, logoutUser } from "./store/action/authAction";
import setAuthToken from "./utlis/setAuthToken";
import store from "./store/store";

if (localStorage.jwtToken) {
  const token = localStorage.jwtToken;
  setAuthToken(token);

  const decoded = jwt_decode(token);
  store.dispatch(setCurrentUser(decoded));
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route exact path="/" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
      </div>
    );
  }
}

export default App;
