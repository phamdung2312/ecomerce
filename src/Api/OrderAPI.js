import axios from "axios";
import http from "../utils/http";

export const axiosJWT = axios.create();

export const OrderAPI = {
  paymentOrder(data, access_token) {
    return axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/order/createOrder`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getAllOrder(id, access_token) {
    return axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getOrderDetail(id, access_token) {
    return axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/order/get-order-detail/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  cancelOrder(id, orderItems, access_token) {
    return axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/order/cancle-order/${id}`,
      {
        data: orderItems,
      },
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getAllOrderAdmin(access_token) {
    return axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/getAllOrder`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  updateOrder(id, data, access_token) {
    return axiosJWT.put(
      `${process.env.REACT_APP_API_URL}/order/updateOrder/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
};
