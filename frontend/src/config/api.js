// API Configuration - base URL must end with /api (backend mounts routes at /api/...)
const raw = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
export const API_BASE_URL = raw.endsWith('/api') ? raw : `${raw.replace(/\/?$/, '')}/api`;

// Get token from localStorage
export const getToken = () => {
  return localStorage.getItem('token');
};

// Set token in localStorage
export const setToken = (token) => {
  localStorage.setItem('token', token);
};

// Remove token from localStorage
export const removeToken = () => {
  localStorage.removeItem('token');
};

// Get auth headers
export const getAuthHeaders = () => {
  const token = getToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};
