// src/api/index.js
import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((cfg) => {
  const token = localStorage.getItem("token");
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export const login = (creds) => api.post("/auth/login", creds);

export const resetPassword = (token, password) =>
  api.post("/auth/reset-password", { token, password });

export const forgotPassword = (email) =>
  api.post("/auth/forgot-password", { email });

export const fetchOrganizers = () => api.get("/organizers");
export const createOrganizer = (data) => api.post("/organizers", data);
export const updateOrganizer = (id, data) => api.put(`/organizers/${id}`, data);
export const deleteOrganizer = (id) => api.delete(`/organizers/${id}`);
