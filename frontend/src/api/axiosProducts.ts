import axios from "axios";

const axiosProducts = axios.create({
  baseURL: import.meta.env.VITE_API_PRODUCTS,
});

axiosProducts.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosProducts;
