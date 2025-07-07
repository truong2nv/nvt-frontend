// src/api/authApi.ts
import { fetchClient } from './fetchClient';

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
  return fetchClient('/auth/login', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};

export const register = (data: RegisterRequest) => {
  return fetchClient('/auth/register', {
    method: 'POST',
    body: JSON.stringify(data),
  });
};