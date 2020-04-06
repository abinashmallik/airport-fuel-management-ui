import * as types from "./actionTypes";
import api from "../../../services/aircraftService";

export function getAircrafts() {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING,
    });
    try {
      const res = await api.aircrafts();
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data.message,
          aircrafts: res.data.data,
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

export function addAircraft(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING_ADD_AIRCRAFT,
    });
    try {
      const res = await api.addAircraft(payload);
      console.log(res);
      if (res.status === 201) {
        dispatch({
          type: types.LOAD_DATA_ADD_AIRCRAFT,
          message: res.data.message,
          aircrafts: res.data.data,
          status: res.status,
        });
      }
      if (res.status === 401) {
        dispatch({
          type: types.LOAD_DATA_ADD_AIRCRAFT,
          message: res.data,
          status: res.status,
        });
      }
    } catch (error) {
      dispatch({
        type: types.LOAD_DATA_ADD_AIRCRAFT,
        message: "Unable to connect to the server",
        status: 500,
      });
    }
  };
}
