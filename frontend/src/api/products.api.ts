import api from "./axiosInstance";

export interface Product {
  id_producto: string;
  id_vendedor: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export interface CreateProductPayload {
  id_vendedor: string;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  estado: boolean;
}

export const getProducts = async (): Promise<Product[]> => {
  const { data } = await api.get("/products");
  return data;
};

export const getProduct = async (id: string): Promise<Product> => {
  const { data } = await api.get(`/products/${id}`);
  return data;
};

export const createProduct = async (
  payload: CreateProductPayload
): Promise<Product> => {
  const { data } = await api.post("/products", payload);
  return data;
};
