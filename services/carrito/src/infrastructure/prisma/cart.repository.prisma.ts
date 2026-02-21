/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { CartRepository } from '../../core/domain/repositories/cart.repository.interface';
import { Cart } from '../../core/domain/entities/cart.entity';
import { CartItem } from '../../core/domain/entities/cart-item.entity';

@Injectable()
export class PrismaCartRepository implements CartRepository {
  constructor(private readonly prisma: PrismaService) {}

  private mapToCart(record: any): Cart {
    const items = (record.items || []).map(
      (i: any) => new CartItem(i.id, i.productId, i.quantity),
    );
    return new Cart(record.id, record.userId, items);
  }

  async findByUserId(userId: string): Promise<Cart | null> {
    const c = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!c) return null;
    return this.mapToCart(c);
  }

  async createCartWithItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const created = await this.prisma.cart.create({
      data: {
        userId,
        items: {
          create: [{ productId, quantity }],
        },
      },
      include: { items: true },
    });
    return this.mapToCart(created);
  }

  async addOrUpdateItem(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return this.createCartWithItem(userId, productId, quantity);

    const existing = cart.items.find((i) => i.productId === productId);
    if (existing) {
      await this.prisma.cartItem.update({
        where: { id: existing.id },
        data: { quantity: existing.quantity + quantity },
      });
    } else {
      await this.prisma.cartItem.create({
        data: { cartId: cart.id, productId, quantity },
      });
    }

    const updated = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return this.mapToCart(updated);
  }

  async removeItem(userId: string, productId: string): Promise<Cart | null> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) return null;

    const existing = cart.items.find((i) => i.productId === productId);
    if (!existing) return this.mapToCart(cart);

    await this.prisma.cartItem.delete({ where: { id: existing.id } });
    const updated = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return this.mapToCart(updated);
  }

  async setItemQuantity(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<Cart> {
    const cart = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    if (!cart) throw new Error('Cart not found');

    const existing = cart.items.find((i) => i.productId === productId);
    if (!existing) throw new Error('Item not found');

    await this.prisma.cartItem.update({
      where: { id: existing.id },
      data: { quantity },
    });

    const updated = await this.prisma.cart.findUnique({
      where: { userId },
      include: { items: true },
    });
    return this.mapToCart(updated);
  }
}
