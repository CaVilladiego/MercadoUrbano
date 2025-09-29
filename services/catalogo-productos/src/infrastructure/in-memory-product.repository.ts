import { Injectable } from '@nestjs/common';
import { ProductRepository } from '../core/domain/repositories/product.repository.port';
import { Product } from '../core/domain/entities/product.entity';

@Injectable()
export class InMemoryProductRepository implements ProductRepository {
  private products: Product[] = [];

  // Save a new product
  async save(product: Product): Promise<void> {
    this.products.push(product);
  }

  // Find a product by ID
  async findById(id: string): Promise<Product | null> {
    const product = this.products.find(p => p.id === id);
    return product || null;
  }

  // Return all products
  async findAllAvailable(): Promise<Product[]> {
    return this.products;
  }
}