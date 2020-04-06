import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const stateName = "airport";

const initialState = Immutable({
  loading: false,
  message: "",
  statusCode: 0,
  airports: "",
  loadingAddAirport: false,
  statusCodeAddAirport: 0,
  messageAddAirport: "",
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
        airports: action.airports,
        statusCode: action.status,
      };
    case types.LOADING_ADD_AIRPORT:
      return {
        ...state,
        loadingAddAirport: true,
      };
    case types.LOAD_DATA_ADD_AIRPORT:
      return {
        ...state,
        loadingAddAirport: false,
        messageAddAirport: action.message,
        statusCodeAddAirport: action.status,
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
