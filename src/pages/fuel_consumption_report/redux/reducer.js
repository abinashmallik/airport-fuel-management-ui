import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const stateName = "consumption";

const initialState = Immutable({
  loading: false,
  message: "",
  statusCode: 0,
  transactions: "",
  airports: null,
  aircrafts: null
});

export default function reduce(state = initialState, action = {}) {
  switch (action.type) {
    case types.LOADING:
    case types.LOADING_AIRCRAFTS:
    case types.LOADING_AIRPORTS:
      return {
        ...state,
        loading: true
      };
    case types.LOAD_DATA:
      return {
        ...state,
        loading: false,
        message: action.message,
        transactions: action.transactions,
        statusCode: action.status
      };
    case types.LOAD_DATA_AIRCRAFTS:
      return {
        ...state,
        loading: false,
        message: action.message,
        aircrafts: action.aircrafts,
        statusCode: action.status
      };
    case types.LOAD_DATA_AIRPORTS:
      return {
        ...state,
        loading: false,
        message: action.message,
        airports: action.airports,
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
