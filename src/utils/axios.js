import axios from "axios";
import { refreshToken } from "../services/api/user";
import { getAccessToken, getRefreshToken, storeAccessTokenLS } from "./helper";
import { BASE_URL } from "../config";
import { sendNotification } from "./notifications";

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



api.interceptors.request.use(
  async function (config) {
    if (config.url !== "/auth/login" && config.url !== "/auth/register") {
      config.headers["Authorization"] = `Bearer ${getAccessToken()}`;
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
      sendNotification("warning", "token expire");
      try {
        const res = await refreshToken({
          refresh_token: getRefreshToken(),
        });
        if (res?.status === 200) {
          // storeing access token in localstorage
          storeAccessTokenLS(res?.data?.access_token);
          // sending access token in headers
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
