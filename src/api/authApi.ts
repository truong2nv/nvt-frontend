// src/api/axios/authApi.ts
import axiosInstance from './axiosClient';

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

export const login = (data: LoginRequest) => {
  return axiosInstance.post('/auth/login', data);
};

export const register = (data: RegisterRequest) => {
  return axiosInstance.post('/auth/register', data);
};

export const refreshAccessToken = async (): Promise<string | null> => {
  try {
    const response = await axiosInstance.post('/auth/refresh', {
      refreshToken: localStorage.getItem('refreshToken'),
    });
    const { accessToken, refreshToken } = response.data;
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
    return accessToken;
  } catch (error) {
    return null;
  }
};
