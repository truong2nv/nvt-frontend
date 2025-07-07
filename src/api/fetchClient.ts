// src/api/fetchClient.ts

let logoutCallback: () => void = () => {};

export const setLogout = (cb: () => void) => {
  logoutCallback = cb;
};

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const refreshAccessToken = async (): Promise<string | null> => {
  const refreshToken = localStorage.getItem('refreshToken');
  if (!refreshToken) {
    logoutCallback();
    return null;
  }

  try {
    const response = await fetch(`${API_BASE}/auth/refresh`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!response.ok) {
      logoutCallback();
      return null;
    }

    const data = await response.json();
    localStorage.setItem('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.accessToken;
  } catch (error) {
    console.error('Failed to refresh access token:', error);
    logoutCallback();
    return null;
  }
};

export const fetchClient = async (
  url: string,
  options: RequestInit = {},
  retry = true
): Promise<Response> => {
  const accessToken = localStorage.getItem('accessToken');
  const fullUrl = `${API_BASE}${url}`;

  const headers = {
    'Content-Type': 'application/json',
    ...(accessToken && { Authorization: `Bearer ${accessToken}` }),
    ...(options.headers || {}),
  };

  const response = await fetch(fullUrl, {
    ...options,
    headers,
  });

  if (response.status === 401 && retry) {
    const newAccessToken = await refreshAccessToken();
    if (!newAccessToken) {
      // logoutCallback đã gọi ở trên
      throw new Error('Session expired. Please login again.');
    }

    return fetchClient(url, options, false);
  }

  return response;
};