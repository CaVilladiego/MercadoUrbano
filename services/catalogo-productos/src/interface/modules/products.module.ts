import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { ProductsController } from '../controllers/products.controller';

import { CreateProductUseCase } from '../../core/application/usecases/create-product.usecase';
import { GetProductUseCase } from '../../core/application/usecases/get-product.usecase';
import { ListProductsUseCase } from '../../core/application/usecases/list-products.usecase';

import { InMemoryProductRepository } from 'src/infrastructure/in-memory-product.repository';

import { JwtStrategy } from '../../infrastructure/security/jwt/jwt.strategy';
import { JwtAuthGuard } from '../../infrastructure/security/jwt/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/roles/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_SECRET || 'changeme').trim(),
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [ProductsController],
  providers: [
    {
      provide: 'ProductRepository',
      useClass: InMemoryProductRepository,
    },
    CreateProductUseCase,
    GetProductUseCase,
    ListProductsUseCase,
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class ProductsModule {}
