import axios from 'axios';

//Create an Axois instance
const API = axios.create({
  baseURL: 'https://task-manager-api-9lz1.onrender.com',
});

//Interceptor: Adds the token to every request automatically
API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
