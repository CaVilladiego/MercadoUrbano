import { Product } from '../entities/product.entity';

export interface ProductRepository {
  findById(id: string): Promise<Product | null>;
  save(product: Product): Promise<void>;
  findAllAvailable(): Promise<Product[]>;
}