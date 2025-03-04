import axios from "axios";
import { useRouter } from "vue-router";

// Create Axios instance
const axiosIns = axios.create({
  baseURL: "http://127.0.0.1:8000/api", // Base URL of your Django API
  headers: {
    "Content-Type": "application/json",
  },
});

// Request Interceptor: Add Authorization Token (if available)
axiosIns.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Retrieve token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response Interceptor: Handle Errors Globally
axiosIns.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token"); // Remove invalid token
      const router = useRouter();
      router.push("/login"); // Redirect to login if unauthorized
    }
    return Promise.reject(error);
  }
);

export default axiosIns;
