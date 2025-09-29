import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/product.repository.port';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class ListProductsUseCase {
  constructor(@Inject('ProductRepository') private readonly productRepo: ProductRepository) {}

  async execute(): Promise<Product[]> {
    return this.productRepo.findAllAvailable();
  }
}