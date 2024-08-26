import axios from "axios";
import http from "../utils/http";

export const axiosJWT = axios.create();

export const userAPI = {
  loginUser(body) {
    return http.post("user/sign-in", body);
  },
  registerUser(body) {
    return http.post("user/sign-up", body);
  },
  getUserDetail(id, access_token) {
    return axiosJWT.get(
      `${process.env.REACT_APP_API_URL}/user/user-detail/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getAllUser(access_token) {
    return axiosJWT.get(`${process.env.REACT_APP_API_URL}/user/allUser`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  // refreshToken() {
  //   return http.post(`user/refresh-token`, {
  //     withCredentials: true, // tự động lấy cookies
  //   });
  // },
  refreshToken(refresh_token) {
    return http.post(
      `user/refresh-token`,
      {},
      {
        headers: { token: `Bearer ${refresh_token}` },
      }
    );
  },
  logoutUser() {
    return http.post(`user/logout`);
  },
  updateUser(id, data, access_token) {
    return axiosJWT.put(
      `${process.env.REACT_APP_API_URL}/user/update-user/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  deleteUser(id, access_token) {
    return axiosJWT.delete(
      `${process.env.REACT_APP_API_URL}/user/delete-user/${id}`,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  deleteManyUser(data, access_token) {
    return axiosJWT.post(
      `${process.env.REACT_APP_API_URL}/user/delete-many`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
};
