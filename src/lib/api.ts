import axios from "axios";

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Attach auth token to every request if present
api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

// Global response error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        const hadToken = !!localStorage.getItem("token");
        localStorage.removeItem("token");
        // Only redirect if the user had an active session (token existed).
        // Avoid redirecting on a failed login attempt which also returns 401.
        if (hadToken) {
          window.location.href = "/";
        }
      }
    }
    return Promise.reject(error);
  }
);
