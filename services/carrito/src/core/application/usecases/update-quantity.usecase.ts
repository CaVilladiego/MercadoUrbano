import { Inject, Injectable } from '@nestjs/common';
import { UpdateQuantityDto } from '../dto/update-quantity.dto';
import { CartRepository } from '../../domain/repositories/cart.repository.interface';
import { TOKENS } from '../tokens';

@Injectable()
export class UpdateQuantityUseCase {
  constructor(
    @Inject(TOKENS.repositories.Cart)
    private readonly cartRepo: CartRepository,
  ) {}

  async execute(dto: UpdateQuantityDto) {
    if (dto.quantity < 0) throw new Error('Quantity cannot be negative');
    if (dto.quantity === 0) {
      return this.cartRepo.removeItem(dto.userId, dto.productId);
    }
    return this.cartRepo.setItemQuantity(
      dto.userId,
      dto.productId,
      dto.quantity,
    );
  }
}
