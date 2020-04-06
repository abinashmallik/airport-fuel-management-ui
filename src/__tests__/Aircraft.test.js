import React from "react";
import { render, waitForElement, fireEvent } from "@testing-library/react";
import Aircraft from "../pages/aircraft";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import * as reducers from "../reducers";

const initialState = {
  loading: false,
  message: "",
  statusCode: 0,
  aircrafts: "",
  loadingAddAircraft: false,
  statusCodeAddAircraft: 0,
  messageAddAircraft: "",
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

describe("Aircraft", () => {
  beforeEach(() => {});

  test("renders the aircraft page successfully", () => {
    const { getByText } = renderWithRedux(<Aircraft />);
    const header = getByText(/Aircrafts/i);
    expect(header).toBeInTheDocument();
  });

  test("renders the table headers", () => {
    const { getByText } = renderWithRedux(<Aircraft />);
    const tableHead = getByText(/Aircraft Number/i);
    expect(tableHead).toBeInTheDocument();
  });

  test("renders add aircraft form on clicking add aircraft button", async () => {
    const { getByText } = renderWithRedux(<Aircraft />);
    const addAircraft = getByText(/ADD AIRCRAFT/i);
    fireEvent.click(addAircraft);
    const formHead = await waitForElement(() => getByText(/Add a Aircraft/i));
    expect(formHead).toBeInTheDocument();
  });
});
