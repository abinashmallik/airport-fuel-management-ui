import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Airport from "../pages/airport";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import * as reducers from "../reducers";

const initialState = {
  loading: false,
  message: "",
  statusCode: 0,
  airports: "",
  loadingAddAirport: false,
  statusCodeAddAirport: 0,
  messageAddAirport: "",
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

describe("Airport", () => {
  beforeEach(() => {});

  test("renders the airport page successfully", () => {
    const { getByText } = renderWithRedux(<Airport />);
    const header = getByText(/Airports/i);
    expect(header).toBeInTheDocument();
  });

  test("render the table headers", () => {
    const { getByText } = renderWithRedux(<Airport />);
    const tableHead = getByText(/Airport Name/i);
    expect(tableHead).toBeInTheDocument();
  });

  test("renders add airport form on clicking add airport button", async () => {
    const { getByText } = renderWithRedux(<Airport />);
    const addAirport = getByText(/ADD AIRPORT/i);
    fireEvent.click(addAirport);
    const formHead = await waitForElement(() => getByText(/Add a Airport/i));
    expect(formHead).toBeInTheDocument();
  });
});
