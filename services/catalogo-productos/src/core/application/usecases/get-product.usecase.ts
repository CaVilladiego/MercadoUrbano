import { ProductRepository } from '../../domain/repositories/product.repository.port';
import { Product } from '../../domain/entities/product.entity';

export class GetProductUseCase {
  constructor(private readonly userRepo: ProductRepository) {}

  async execute(id: string): Promise<Product | null> {
    return this.userRepo.findById(id);
  }
}
