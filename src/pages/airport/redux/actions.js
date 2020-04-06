import * as types from "./actionTypes";
import api from "../../../services/airportService";

export function getAirports() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING,
    });
    try {
      const res = await api.airports();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data.message,
          airports: res.data.data,
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

//action tp add a aiport
export function addAiport(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING_ADD_AIRPORT,
    });
    try {
      const res = await api.addAirport(payload);
      if (res.status === 201) {
        dispatch({
          type: types.LOAD_DATA_ADD_AIRPORT,
          message: res.data.message,
          status: res.status,
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA_ADD_AIRPORT,
          message: res.data,
          status: res.status,
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA_ADD_AIRPORT,
        message: "Unable to connect to the server",
        status: 500,
      });
    }
  };
}
