import axios from 'axios';

const rawBaseUrl = import.meta.env.VITE_API_URL?.trim();
const fallbackBaseUrl = 'http://localhost:8000/api';

function resolveApiBaseUrl(value) {
  if (!value) {
    return fallbackBaseUrl;
  }

  const normalized = value.replace(/\/+$/, '');
  return normalized.endsWith('/api') ? normalized : `${normalized}/api`;
}

const api = axios.create({
  baseURL: resolveApiBaseUrl(rawBaseUrl),
  headers: { 'Content-Type': 'application/json' },
});

// Attach token to every request
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
