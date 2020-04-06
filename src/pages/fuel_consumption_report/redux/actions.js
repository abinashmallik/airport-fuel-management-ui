import * as types from "./actionTypes";
import api from "../../../services/transactionService";
import aircraftApi from "../../../services/aircraftService";
import airportApi from "../../../services/airportService";

export function fetchTransaction() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING
    });
    try {
      const res = await api.getTransactions();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data.message,
          transactions: res.data.data,
          status: res.status
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data,
          status: res.status
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA,
        message: "Unable to connect to the server",
        status: 500
      });
    }
  };
}

export function getAircrafts() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING_AIRCRAFTS
    });
    try {
      const res = await aircraftApi.aircrafts();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA_AIRCRAFTS,
          message: res.data.message,
          aircrafts: res.data.data,
          status: res.status
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA_AIRCRAFTS,
          message: res.data,
          status: res.status
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA_AIRCRAFTS,
        message: "Unable to connect to the server",
        status: 500
      });
    }
  };
}

export function getAirports() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING_AIRPORTS
    });
    try {
      const res = await airportApi.airports();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA_AIRPORTS,
          message: res.data.message,
          airports: res.data.data,
          status: res.status
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA_AIRPORTS,
          message: res.data,
          status: res.status
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA_AIRPORTS,
        message: "Unable to connect to the server",
        status: 500
      });
    }
  };
}
