import axios from "axios";
import http from "../utils/http";

export const axiosJWT = axios.create();

export const OrderAPI = {
  paymentOrder(data, access_token) {
    return axiosJWT.post(`http://localhost:3000/api/order/createOrder`, data, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  getAllOrder(id, access_token) {
    return axiosJWT.get(`http://localhost:3000/api/order/get-all-order/${id}`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  getOrderDetail(id, access_token) {
    return axiosJWT.get(
      `http://localhost:3000/api/order/get-order-detail/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  cancelOrder(id, orderItems, access_token) {
    return axiosJWT.delete(
      `http://localhost:3000/api/order/cancle-order/${id}`,
      {
        data: orderItems,
      },
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getAllOrderAdmin(access_token) {
    return axiosJWT.get(`http://localhost:3000/api/order/getAllOrder`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  updateOrder(id, data, access_token) {
    return axiosJWT.put(
      `http://localhost:3000/api/order/updateOrder/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
};
