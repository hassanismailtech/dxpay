import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// Global error interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || 'Something went wrong';
    return Promise.reject(new Error(message));
  }
);
