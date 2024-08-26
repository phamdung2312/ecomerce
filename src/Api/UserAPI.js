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
    return axiosJWT.get(`http://localhost:3000/api/user/user-detail/${id}`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  getAllUser(access_token) {
    return axiosJWT.get(`http://localhost:3000/api/user/allUser`, {
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
      `http://localhost:3000/api/user/update-user/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  deleteUser(id, access_token) {
    return axiosJWT.delete(`http://localhost:3000/api/user/delete-user/${id}`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  deleteManyUser(data, access_token) {
    return axiosJWT.post(`http://localhost:3000/api/user/delete-many`, data, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
};
