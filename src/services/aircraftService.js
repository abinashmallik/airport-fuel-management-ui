import axios from "axios";
import api from "./apiBaseUrl";

class AircraftService {
  async aircrafts() {
    return axios
      .get(`${api.apiBaseUrl}/api/v1/aircrafts`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async addAircraft(payload) {
    return axios
      .post(`${api.apiBaseUrl}/api/v1/aircrafts`, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new AircraftService();
