import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="container">
            <Route path="/" component={AppRoutes} />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
