import axios from "axios";
import api from "./apiBaseUrl";

class LoginService {
  async login(payload) {
    return axios
      .post(`${api.apiBaseUrl}/api/v1/users/login`, payload)
      .then(response => {
        return response;
      })
      .catch(error => {
        return error.response;
      });
  }
}

export default new LoginService();
