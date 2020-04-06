import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Login from "../pages/login/";
import Transaction from "../pages/transaction";
import Airport from "../pages/airport";
import Aircraft from "../pages/aircraft";
import Consumption from "../pages/fuel_consumption_report/index";
import Transactions from "../pages/transaction-listing";

class AppRoutes extends Component {
  render() {
    return (
      <div>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route path="/add-transaction" component={Transaction} />
          <Route path="/airports" component={Airport} />
          <Route path="/aircrafts" component={Aircraft} />
          <Route path="/fuel-consumption-report" component={Consumption} />
          <Route path="/transaction-listing" component={Transactions} />
        </Switch>
      </div>
    );
  }
}

export default AppRoutes;
