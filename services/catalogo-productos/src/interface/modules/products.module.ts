// recommendation.module.ts
import { Module } from '@nestjs/common';
import { ProductsController } from '../controllers/products.controller';
import { CreateProductUseCase } from '../../core/application/usecases/create-product.usecase';
import { GetProductUseCase } from '../../core/application/usecases/get-product.usecase';
import { ListProductsUseCase } from '../../core/application/usecases/list-products.usecase';
import { InMemoryProductRepository } from 'src/infrastructure/in-memory-product.repository';

@Module({
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: InMemoryProductRepository,
    },
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
  ],
  exports: [CreateProductUseCase, GetProductUseCase, ListProductsUseCase], // 👈 export if needed in AppModule
})
export class ProductsModule {}
