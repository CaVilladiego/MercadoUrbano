import { Injectable, Inject  } from '@nestjs/common';
import { Product } from '../../domain/entities/product.entity';
import type { ProductRepository } from '../../domain/repositories/product.repository.port';
import { CreateProductDto } from '../dto/create-product.dto';

@Injectable()
export class CreateProductUseCase {
  constructor(@Inject('ProductRepository') private readonly productRepo: ProductRepository) {}

  async execute(input: CreateProductDto): Promise<Product> {
    // Create a new domain entity
    const product = new Product(
      input.id_producto,
      input.id_vendedor,
      input.nombre,
      input.descripcion,
      input.precio,
      input.stock
    );

    if (+product.stock < 0) throw new Error('Stock cannot be negative');


    await this.productRepo.save(product);
    return product
  }
}
