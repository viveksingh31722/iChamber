import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a response interceptor to handle 401 errors
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      // Prevent infinite redirect loops for session check
      if (error.config?.url?.includes('/users/profile') && error.config?.method?.toLowerCase() === 'get') {
        return Promise.reject(error);
      }

      // Redirect to register page if unauthorized
      if (typeof window !== 'undefined') {
        const publicPaths = ['/login', '/register'];
        if (!publicPaths.includes(window.location.pathname)) {
          window.location.href = '/register';
        }
      }
    }
    return Promise.reject(error);
  }
);

export default api;
