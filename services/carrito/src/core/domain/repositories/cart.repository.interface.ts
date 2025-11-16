import { Cart } from '../entities/cart.entity';

export interface CartRepository {
  findByUserId(userId: string): Promise<Cart | null>;
  createCartWithItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart>;
  addOrUpdateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart>;
  removeItem(userId: string, productId: string): Promise<Cart | null>;
  setItemQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart>;
}
