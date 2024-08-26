import axios from "axios";
class Http {
  constructor() {
    this.instance = axios.create({
      baseURL: "${process.env.REACT_APP_API_URL}/",
      timeout: 1000,
      headers: { "X-Custom-Header": "foobar" },
    });
    this.instance.interceptors.request.use(
      (config) => {
        if (this.access_token && config.headers) {
          config.headers.authorization = this.access_token;
        }
        return config;
      },
      function (error) {
        // Do something with request error
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;
export default http;
