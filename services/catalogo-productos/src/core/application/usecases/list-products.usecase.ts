import { ProductRepository } from '../../domain/repositories/product.repository.port';
import { Product } from '../../domain/entities/product.entity';

export class ListProductsUseCase {
  constructor(private readonly userRepo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.userRepo.findAllAvailable();
  }
}
