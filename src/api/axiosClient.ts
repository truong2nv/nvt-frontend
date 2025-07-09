// src/api/axios/axiosClient.ts
import axios from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';
import { refreshAccessToken } from './authApi';

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const axiosInstance = axios.create({
  baseURL: API_BASE,
  headers: {
    'Content-Type': 'application/json',
  },
});

// JWT Interceptor
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = localStorage.getItem('accessToken');
  if (accessToken) {
    config.headers = config.headers || {};
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return config;
});

// Loading spinner logic (to be set from outside)
let showLoading: () => void = () => {};
let hideLoading: () => void = () => {};
export const setAxiosLoadingHandlers = (show: () => void, hide: () => void) => {
  showLoading = show;
  hideLoading = hide;
};

let requestCount = 0;
axiosInstance.interceptors.request.use((config) => {
  requestCount++;
  showLoading();
  return config;
});
axiosInstance.interceptors.response.use(
  (response) => {
    requestCount--;
    if (requestCount === 0) hideLoading();
    return response;
  },
  (error) => {
    requestCount--;
    if (requestCount === 0) hideLoading();
    return Promise.reject(error);
  }
);

// Auto refresh token & logout
let logoutCallback: () => void = () => {};
export const setAxiosLogout = (cb: () => void) => {
  logoutCallback = cb;
};

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const newAccessToken = await refreshAccessToken();
      if (newAccessToken) {
        localStorage.setItem('accessToken', newAccessToken);
        originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
        return axiosInstance(originalRequest);
      } else {
        logoutCallback();
        return Promise.reject(new Error('Session expired. Please login again.'));
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
