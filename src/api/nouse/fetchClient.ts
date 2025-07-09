// // src/api/fetchClient.ts
// import { refreshAccessToken } from './authApi';
// import {
//   addRequestInterceptor,
//   addResponseInterceptor,
//   applyRequestInterceptors,
//   applyResponseInterceptors
// } from './fetchInterceptors';

// let logoutCallback: () => void = () => {};
// let showLoading: () => void = () => {};
// let hideLoading: () => void = () => {};

// export const setLogout = (cb: () => void) => {
//   logoutCallback = cb;
// };

// export const setLoadingHandlers = (show: () => void, hide: () => void) => {
//   showLoading = show;
//   hideLoading = hide;
// };

// const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// // Register request interceptor for JWT token (if not already in fetchInterceptors)
// addRequestInterceptor(async (url, options) => {
//   const accessToken = localStorage.getItem('accessToken');
//   const headers = {
//     'Content-Type': 'application/json',
//     ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
//     ...(options.headers || {}),
//   };
//   return { url, options: { ...options, headers } };
// });

// // Register request interceptor for loading spinner
// addRequestInterceptor(async (url, options) => {
//   showLoading();
//   return { url, options };
// });

// // Register response interceptor for loading spinner
// addResponseInterceptor(async (response, request) => {
//   hideLoading();
//   return response;
// });

// // Register response interceptor for auto logout and refresh token
// addResponseInterceptor(async (response, request) => {
//   if (response.status === 401) {
//     // Thử refresh token
//     const newAccessToken = await refreshAccessToken();
//     if (!newAccessToken) {
//       logoutCallback();
//       throw new Error('Session expired. Please login again.');
//     }
//     // Retry request với token mới
//     const retryHeaders = {
//       ...((request.options.headers as Record<string, string>) || {}),
//       Authorization: `Bearer ${newAccessToken}`,
//     };
//     const retryOptions = { ...request.options, headers: retryHeaders };
//     return fetch(request.url, retryOptions);
//   }
//   return response;
// });

// export const fetchClient = async (
//   url: string,
//   options: RequestInit = {}
// ): Promise<Response> => {
//   const fullUrl = `${API_BASE}${url}`;
//   const { url: interceptedUrl, options: interceptedOptions } = await applyRequestInterceptors(fullUrl, options);
//   let response = await fetch(interceptedUrl, interceptedOptions);
//   response = await applyResponseInterceptors(response, { url: interceptedUrl, options: interceptedOptions });
//   return response;
// };