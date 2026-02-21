import { Inject, Injectable } from '@nestjs/common';
import { CartRepository } from '../../domain/repositories/cart.repository.interface';
import { TOKENS } from '../tokens';

@Injectable()
export class RemoveFromCartUseCase {
  constructor(
    @Inject(TOKENS.repositories.Cart)
    private readonly cartRepo: CartRepository,
  ) {}

  async execute(userId: string, productId: string) {
    return this.cartRepo.removeItem(userId, productId);
  }
}
