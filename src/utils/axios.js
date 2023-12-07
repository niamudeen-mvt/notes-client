import axios from "axios";
import { refreshToken } from "../services/api/user";
import { getToken } from "./helper";

const BASE_URL = "http://localhost:5000/api/v1";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  async function (config) {
    if (config.url !== "/auth/login" && config.url !== "/auth/register") {
      config.headers["Authorization"] = `Bearer ${getToken()}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

let isRefreshing = false;

api.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response && error.response.status === 401 && !isRefreshing) {
      isRefreshing = true;
      try {
        const refresh_token = localStorage.getItem("refresh_token");
        const res = await refreshToken({
          refresh_token,
        });

        if (res?.status === 200) {
          localStorage.setItem("access_token", res.data.access_token);
          originalRequest.headers["Authorization"] =
            "Bearer " + res.data.access_token;
          return axios(originalRequest);
        }
      } catch (refreshError) {
        console.error("Refresh token failed:", refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;
