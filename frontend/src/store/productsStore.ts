import { create } from "zustand";
import type { Product } from "../api/products.api";

interface ProductsState {
  products: Product[];
  setProducts: (list: Product[]) => void;
}

export const useProductsStore = create<ProductsState>((set) => ({
  products: [],
  setProducts: (list) => set({ products: list }),
}));
