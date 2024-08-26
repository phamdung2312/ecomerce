import { axiosJWT } from "./UserAPI";

const { default: http } = require("../utils/http");

const productAPI = {
  getAllProduct(search, limit) {
    if (search || limit) {
      return http.get(
        `product/get-all?limit=${limit}&filter=name&filter=${search}`
      );
    } else {
      return http.get(`product/get-all`);
    }
  },
  getTypeProductFilter(type, page, limit) {
    if (type) {
      return http.get(
        `product/get-all?&filter=type&filter=${type}&limit=${limit}&page=${page}}`
      );
    }
  },
  createProduct(data) {
    return http.post("product/create", data);
  },
  getProductDetail(id) {
    return http.get(`product/get-detail/${id}`);
  },
  updateProduct(id, data, access_token) {
    return axiosJWT.put(
      `http://localhost:3000/api/product/update/${id}`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  deleteProduct(id, access_token) {
    return axiosJWT.delete(`http://localhost:3000/api/product/delete/${id}`, {
      headers: { token: `Bearer ${access_token}` },
    });
  },
  deleteManyProduct(data, access_token) {
    return axiosJWT.post(
      `http://localhost:3000/api/product/delete-many`,
      data,
      {
        headers: { token: `Bearer ${access_token}` },
      }
    );
  },
  getTypeProduct() {
    return http.get("product/get-type");
  },
};
export default productAPI;
