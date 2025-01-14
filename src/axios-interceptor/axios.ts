// src/api/axios.ts
import axios from 'axios';

// Define the Axios instance with types
export const api = axios.create({
  baseURL: 'http://localhost:3000/api/v1/', // base URL
  withCredentials: true, // Send cookies with requests
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accesstoken'); // Get access token
    // If a token exists, attach it to the Authorization header
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    
    // Always return the modified config
    return config;
  },
  (error) => {
    // Handle any errors that occur during the request setup
    return Promise.reject(error);
  }
);
