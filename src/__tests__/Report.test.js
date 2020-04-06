import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Reports from "../pages/fuel_consumption_report";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import * as reducers from "../reducers";

const initialState = {
  loading: false,
  message: "",
  statusCode: 0,
  transactions: "",
  airports: null,
  aircrafts: null,
};

function renderWithRedux(
  ui,
  {
    initialState,
    store = createStore(
      combineReducers(reducers),
      initialState,
      applyMiddleware(thunk)
    ),
  } = {}
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    store,
  };
}

describe("Fuel Consumption Report", () => {
  test("renders the fuel consumption report page successfully", () => {
    const { getByText } = renderWithRedux(<Reports />);
    const header = getByText(/Fuel Consumption Report/i);
    expect(header).toBeInTheDocument();
  });

  test("renders airport summary report on clicking add show airport consumption report button", async () => {
    const { getByText } = renderWithRedux(<Reports />);
    const showAirportReport = getByText(/SHOW AIRPORT CONSUMPTION REPORT/i);
    fireEvent.click(showAirportReport);
    const formHead = await waitForElement(() =>
      getByText(/Airport Summary Report/i)
    );
    expect(formHead).toBeInTheDocument();
  });
});
