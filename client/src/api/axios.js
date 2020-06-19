import Axios from "axios";
import { getToken } from "../utils/token";

const BASE_URL = "http://localhost:7777";

export const axiosInstance = Axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    // TO-DO allow with credentials only for certain endpoints
    withCredentials: true
});

axiosInstance.interceptors.request.use((config) => {
    config.headers["Authorization"] = `Bearer ${getToken()}`;
    return config;
});

axiosInstance.interceptors.response.use(
    function (response) {
      return response.data;
    },
  
    function (error) {
      if (error.response && error.response.data) {
        return Promise.reject(error.response.data);
      } else {
        return Promise.reject({
          message: "Some unusual error occured, please try again",
        });
      }
    }
  );

export default axiosInstance;
