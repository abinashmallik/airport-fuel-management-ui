import axios from "axios";
import api from "./apiBaseUrl";

class TransactionService {
  async addTransaction(payload) {
    return axios
      .post(`${api.apiBaseUrl}/api/v1/transactions`, payload)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async getTransactions() {
    return axios
      .get(`${api.apiBaseUrl}/api/v1/transactions`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }

  async resetTransactions() {
    return axios
      .delete(`${api.apiBaseUrl}/api/v1/transactions`)
      .then((response) => {
        return response;
      })
      .catch((error) => {
        return error.response;
      });
  }
}

export default new TransactionService();
