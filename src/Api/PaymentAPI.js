import axios from "axios";
import http from "../utils/http";

export const axiosJWT = axios.create();

export const PaymentAPI = {
  getConfig() {
    return http.get(`payment/config`);
  },
};
