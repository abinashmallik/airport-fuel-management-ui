import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const stateName = "transactions";

const initialState = Immutable({
  loading: false,
  message: "",
  statusCode: 0,
  transactions: "",
  loadingReset: false,
  messageReset: "",
  statusCodeReset: 0,
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADING:
      return {
        ...state,
        loading: true,
      };
    case types.LOAD_DATA:
      return {
        ...state,
        loading: false,
        message: action.message,
        transactions: action.transactions,
        statusCode: action.status,
      };
    case types.LOADING_RESET_TRANS:
      return {
        ...state,
        loadingReset: true,
      };
    case types.RESET_TRANS:
      return {
        ...state,
        loadingReset: false,
        messageReset: action.message,
        statusCodeReset: action.status,
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
