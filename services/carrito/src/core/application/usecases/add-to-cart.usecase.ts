import { Inject, Injectable } from '@nestjs/common';
import { AddToCartDto } from '../dto/add-to-cart.dto';
import { CartRepository } from '../../domain/repositories/cart.repository.interface';
import { TOKENS } from '../tokens';

@Injectable()
export class AddToCartUseCase {
  constructor(
    @Inject(TOKENS.repositories.Cart)
    private readonly cartRepo: CartRepository,
  ) {}

  async execute(dto: AddToCartDto) {
    if (dto.quantity <= 0) throw new Error('Quantity must be > 0');

    const cart = await this.cartRepo.findByUserId(dto.userId);
    if (!cart) {
      return this.cartRepo.createCartWithItem(
        dto.userId,
        dto.productId,
        dto.quantity,
      );
    }

    return this.cartRepo.addOrUpdateItem(
      dto.userId,
      dto.productId,
      dto.quantity,
    );
  }
}
