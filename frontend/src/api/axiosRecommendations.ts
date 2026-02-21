import axios from "axios";

const axiosRecom = axios.create({
  baseURL: import.meta.env.VITE_API_RECOMMENDATIONS,
});

axiosRecom.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosRecom;
