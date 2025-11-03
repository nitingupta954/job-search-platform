import axios from 'axios';
import { useAuthStore } from '../store/useAuthStore';

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true, // Important for sending/receiving the refresh_token cookie
});

// Request interceptor to add access token
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor to handle 401 and refresh token
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    // Handle 401 unauthorized errors
    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      originalRequest.url !== '/api/auth/refresh' &&
      originalRequest.url !== '/api/auth/logout'
    ) {
      originalRequest._retry = true;
      try {
        // Attempt silent refresh
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000'}/api/auth/refresh`,
          {},
          { withCredentials: true }
        );
        
        const { access_token, user } = data;
        
        // Update store with new session data
        useAuthStore.getState().setSession(user, access_token);
        
        // Retry the original request with new token
        originalRequest.headers.Authorization = `Bearer ${access_token}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // Refresh failed (e.g. refresh token expired), clear session
        useAuthStore.getState().clearSession();
        // The router should automatically redirect to /login based on state
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
