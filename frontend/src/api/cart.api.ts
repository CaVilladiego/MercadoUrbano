import api from "./axiosInstance";

export interface CartItem {
  productId: string;
  nombre: string;
  precio: number;
  quantity: number;
  subtotal: number;
}

export interface Cart {
  userId: string;
  items: CartItem[];
  total: number;
}

export interface AddToCartPayload {
  userId: string;
  productId: string;
  quantity: number;
}

export interface UpdateQuantityPayload {
  userId: string;
  productId: string;
  quantity: number;
}

// Obtener carrito
export const getCart = async (userId: string): Promise<Cart> => {
  const { data } = await api.get(`/cart/${userId}`);
  return data;
};

// Agregar al carrito
export const addToCart = async (payload: AddToCartPayload): Promise<Cart> => {
  const { data } = await api.post("/cart/add", payload);
  return data;
};

// Actualizar cantidad
export const updateQuantity = async (
  payload: UpdateQuantityPayload
): Promise<Cart> => {
  const { data } = await api.patch("/cart/update", payload);
  return data;
};

// Eliminar un producto
export const removeFromCart = async (
  userId: string,
  productId: string
): Promise<Cart> => {
  const { data } = await api.delete(`/cart/${userId}/item/${productId}`);
  return data;
};
