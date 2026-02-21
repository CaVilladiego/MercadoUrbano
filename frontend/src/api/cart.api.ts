import axiosCart from "./axiosCart";

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

export const getCart = async (userId: string): Promise<Cart> => {
  const { data } = await axiosCart.get<Cart>(`/cart/${userId}`);
  return data;
};

export const addToCart = async (
  payload: AddToCartPayload
): Promise<Cart> => {
  const { data } = await axiosCart.post<Cart>("/cart/add", payload);
  return data;
};

export const updateQuantity = async (
  payload: UpdateQuantityPayload
): Promise<Cart> => {
  const { data } = await axiosCart.patch<Cart>("/cart/update", payload);
  return data;
};

export const removeFromCart = async (
  userId: string,
  productId: string
): Promise<Cart> => {
  const { data } = await axiosCart.delete<Cart>(`/cart/${userId}/item/${productId}`);
  return data;
};
