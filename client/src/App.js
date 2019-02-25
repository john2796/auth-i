import React, { Component } from "react";
import { Route } from "react-router-dom";
import Register from "./container/register/Register";
import Login from "./container/login/Login";
import Dashboard from "./container/dashboard/Dashboard";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/" component={Register} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/login" component={Login} />
      </div>
    );
  }
}

export default App;
