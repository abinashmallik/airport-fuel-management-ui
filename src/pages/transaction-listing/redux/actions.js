import * as types from "./actionTypes";
import api from "../../../services/transactionService";
import airportApi from "../../../services/airportService";

export function getTransactions() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING,
    });
    try {
      const res = await api.getTransactions();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data.message,
          transactions: res.data.data,
          status: res.status,
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data,
          status: res.status,
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA,
        message: "Unable to connect to the server",
        status: 500,
      });
    }
  };
}

export function resetTransactions() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING_RESET_TRANS,
    });
    try {
      const res = await api.resetTransactions();
      const response = await airportApi.resetAirport();
      if (res.status === 200 && response.status === 200) {
        dispatch({
          type: types.RESET_TRANS,
          message: res.data.message,
          status: res.status,
        });
      }
      if (res.status === 401 || response.status === 401) {
        dispatch({
          type: types.RESET_TRANS,
          message: res.data,
          status: res.status,
        });
      }
    } catch (error) {
      dispatch({
        type: types.RESET_TRANS,
        message: "Unable to connect to the server",
        status: 500,
      });
    }
  };
}
