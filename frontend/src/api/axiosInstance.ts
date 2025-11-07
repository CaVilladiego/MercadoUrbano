import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH, // Esta es la base para el microservicio Auth-Usuarios
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
