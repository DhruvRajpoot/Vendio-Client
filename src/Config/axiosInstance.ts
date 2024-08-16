import axios from "axios";
import { serverurl } from "../Config/baseurl";

const axiosInstance = axios.create({
  baseURL: serverurl,
});

// Variables to keep track of the refresh token status
let isRefreshing = false;
let failedQueue: Array<(token: string) => void> = [];

// Function to get a new access token using the refresh token
const refreshToken = async (): Promise<string> => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) throw new Error("No refresh token available");

  if (isRefreshing) {
    return new Promise((resolve) => {
      failedQueue.push((token: string) => {
        resolve(token);
      });
    });
  }

  isRefreshing = true;

  try {
    const response = await axios.post(`${serverurl}/auth/getaccesstoken`, {
      refreshToken,
    });
    const { accessToken } = response.data;
    localStorage.setItem("access_token", accessToken);

    isRefreshing = false;
    failedQueue.forEach((cb) => cb(accessToken));
    failedQueue = [];

    return accessToken;
  } catch (error) {
    isRefreshing = false;
    failedQueue = [];
    throw new Error("Failed to refresh access token");
  }
};

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Add a response interceptor to handle errors globally and refresh tokens if needed
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newAccessToken = await refreshToken();
        axiosInstance.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        window.location.href = "/login";
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
