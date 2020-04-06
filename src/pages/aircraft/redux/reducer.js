import * as types from "./actionTypes";
import Immutable from "seamless-immutable";

const stateName = "aircraft";

const initialState = Immutable({
  loading: false,
  message: "",
  statusCode: 0,
  aircrafts: "",
  loadingAddAircraft: false,
  statusCodeAddAircraft: 0,
  messageAddAircraft: "",
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
        aircrafts: action.aircrafts,
        statusCode: action.status,
      };
    case types.LOADING_ADD_AIRCRAFT:
      return {
        ...state,
        loadingAddAircraft: true,
      };
    case types.LOAD_DATA_ADD_AIRCRAFT:
      return {
        ...state,
        loadingAddAircraft: false,
        messageAddAircraft: action.message,
        statusCodeAddAircraft: action.status,
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
