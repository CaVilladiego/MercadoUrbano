import axios from "axios";

const axiosCart = axios.create({
  baseURL: import.meta.env.VITE_API_CART,
});

axiosCart.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default axiosCart;
