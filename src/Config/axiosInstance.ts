import axios from "axios";
import { serverurl } from "../Config/baseurl";
import { jwtDecode } from "jwt-decode";

const axiosInstance = axios.create({
  baseURL: serverurl,
});

let isRefreshing = false;
let failedQueue: Array<(token: string | null) => void> = [];
const MAX_TRIES = 3;
const TOKEN_EXPIRY_THRESHOLD = 30000; // 30 seconds

// Function to decode and check token expiration
const isTokenExpired = (token: string): boolean => {
  try {
    const decoded: { exp: number } = jwtDecode(token);
    const now = Date.now();
    return decoded.exp * 1000 - now < TOKEN_EXPIRY_THRESHOLD;
  } catch (e) {
    return true;
  }
};

// Function to get a new access token using the refresh token
const refreshToken = async (): Promise<string> => {
  const refreshToken = document.cookie
    .split("; ")
    .find((row) => row.startsWith("refreshToken="))
    ?.split("=")[1];

  if (!refreshToken) throw new Error("No refresh token available");

  if (isRefreshing) {
    return new Promise((resolve, reject) => {
      failedQueue.push((token) => {
        if (token) {
          resolve(token);
        } else {
          reject(new Error("Token refresh failed"));
        }
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
    failedQueue.forEach((cb) => cb(null));
    failedQueue = [];
    throw new Error("Failed to refresh access token");
  }
};

// Add a request interceptor to include the token
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("access_token");

    if (token && isTokenExpired(token)) {
      token = await refreshToken();
    }

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

    originalRequest._retryCount = originalRequest._retryCount || 0;

    if (
      error.response?.status === 401 &&
      originalRequest._retryCount < MAX_TRIES
    ) {
      originalRequest._retryCount += 1;

      if (!originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const newAccessToken = await refreshToken();
          if (newAccessToken) {
            originalRequest.headers[
              "Authorization"
            ] = `Bearer ${newAccessToken}`;
            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          if (!originalRequest._redirected) {
            originalRequest._redirected = true;
            window.location.href = "/login";
          }
          return Promise.reject(refreshError);
        }
      }
    }

    if (originalRequest._retryCount >= MAX_TRIES) {
      if (!originalRequest._redirected) {
        originalRequest._redirected = true;
        if (window.location.pathname !== "/login")
          window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
