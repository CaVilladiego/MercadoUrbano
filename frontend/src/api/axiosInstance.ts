import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_AUTH, // URL del microservicio Auth-Usuarios
});

api.interceptors.request.use((config) => {
  // Rutas públicas que no requieren token
  const isPublicRoute =
    config.url?.includes("/auth/register") ||
    config.url?.includes("/auth/login");

  if (!isPublicRoute) {
    const token = localStorage.getItem("token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default api;
