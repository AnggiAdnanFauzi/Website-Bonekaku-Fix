import axios from 'axios';
import API_BASE from './api';

const api = axios.create({
  baseURL: `${API_BASE}/api`,
  headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
  timeout: 10000,
});

// Attach token if exists
api.interceptors.request.use(config => {
  const token = localStorage.getItem('bonekaku_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Handle 401
api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('bonekaku_token');
      localStorage.removeItem('bonekaku_user');
      window.location.href = '/login';
    }
    return Promise.reject(err);
  }
);

export default api;
