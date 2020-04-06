import * as types from "./actionTypes";
import api from "../../../services/loginService";

export function authenticateUser(payload) {
  return async (dispatch, getState) => {
    dispatch({
      type: types.LOADING
    });
    try {
      const res = await api.login(payload);
      if (res.status === 200) {
        dispatch({
          type: types.LOAD_DATA,
          message: res.data.message,
          token: res.data.data.token,
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
