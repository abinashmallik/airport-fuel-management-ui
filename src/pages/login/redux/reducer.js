import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const stateName = "login";

const initialState = Immutable({
  loading: false,
  message: "",
  statusCode: 0,
  token: ""
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true
      };
    case types.LOAD_DATA:
      return {
        ...state,
        loading: false,
        message: action.message,
        token: action.token,
        statusCode: action.status
      };
    default:
      return state;
  }
}

//Selectors
export function getValue(state, key) {
  const value = state[stateName][key];
  switch (key) {
    default:
      return value;
  }
}
