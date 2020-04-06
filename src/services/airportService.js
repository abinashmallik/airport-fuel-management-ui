import axios from "axios";
import api from "./apiBaseUrl";

class AirportService {
  async airports() {
    return axios
      .get(`${api.apiBaseUrl}/api/v1/airports`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async addAirport(payload) {
    return axios
      .post(`${api.apiBaseUrl}/api/v1/airports`, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async resetAirport() {
    return axios
      .put(`${api.apiBaseUrl}/api/v1/resetAirport`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new AirportService();
