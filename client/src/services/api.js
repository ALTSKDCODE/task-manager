import axios from 'axios';

const API = axios.create({
  // Ensure this points to your Render Backend
  baseURL: 'https://task-manager-api-9lz1.onrender.com/api',
});

// 1. Request Interceptor: Add Token to every request
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// 2. Response Interceptor: Handle 401 Errors (Zombie Tokens)
API.interceptors.response.use(
  (response) => response, // If success, just return the response
  (error) => {
    // If the error is 401 (Unauthorized), it means the token is bad/expired
    if (error.response && error.response.status === 401) {
      // Clear the bad data
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');

      // Force redirect to login
      // We use window.location to ensure a hard refresh, clearing any React state
      if (
        window.location.pathname !== '/login' &&
        window.location.pathname !== '/register'
      ) {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default API;
