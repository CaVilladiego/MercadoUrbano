import { Injectable, Inject } from '@nestjs/common';
import type { ProductRepository } from '../../domain/repositories/product.repository.port';
import { Product } from '../../domain/entities/product.entity';

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('ProductRepository') private readonly productRepo: ProductRepository
  ) {}

  async execute(id: string): Promise<Product | null> {
    return this.productRepo.findById(id);
  }
}