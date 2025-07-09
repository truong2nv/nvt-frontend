// // src/api/authApi.ts
// import { fetchClient } from './fetchClient';

// export interface LoginRequest {
//   email: string;
//   password: string;
// }

// export interface RegisterRequest {
//   email: string;
//   password: string;
//   firstName: string;
//   lastName: string;
// }

// export const login = (data: LoginRequest) => {
//   return fetchClient('/auth/login', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
// };

// export const register = (data: RegisterRequest) => {
//   return fetchClient('/auth/register', {
//     method: 'POST',
//     body: JSON.stringify(data),
//   });
// };

// export const refreshAccessToken = async (): Promise<string | null> => {
//   const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
//   const refreshToken = localStorage.getItem('refreshToken');
//   if (!refreshToken) {
//     return null;
//   }

//   try {
//     const response = await fetch(`${API_BASE}/auth/refresh`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ refreshToken }),
//     });

//     if (!response.ok) {
//       return null;
//     }

//     const data = await response.json();
//     localStorage.setItem('accessToken', data.accessToken);
//     localStorage.setItem('refreshToken', data.refreshToken);
//     return data.accessToken;
//   } catch (error) {
//     console.error('Failed to refresh access token:', error);
//     return null;
//   }
// };