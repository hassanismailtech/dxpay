import axios from 'axios';

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL;

if (!baseURL) {
  console.warn("Warning: NEXT_PUBLIC_API_BASE_URL is missing. Defaulting to local server.");
}

export const api = axios.create({
  // The lifesaver fallback
  baseURL: baseURL || 'http://localhost:5000', 
  headers: { 'Content-Type': 'application/json' },
  timeout: 10000,
});

// UI error interceptor
api.interceptors.response.use(
  (res) => res,
  (err) => {
    const message = err.response?.data?.error || 'Something went wrong with the backend connection';
    console.error('API Error:', message);
    return Promise.reject(new Error(message));
  }
);