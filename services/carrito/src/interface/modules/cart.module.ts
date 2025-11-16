import { Module } from '@nestjs/common';
import { CartController } from '../controllers/cart.controller';
import { AddToCartUseCase } from '../../core/application/usecases/add-to-cart.usecase';
import { RemoveFromCartUseCase } from '../../core/application/usecases/remove-from-cart.usecase';
import { ViewCartUseCase } from '../../core/application/usecases/view-cart.usecase';
import { UpdateQuantityUseCase } from '../../core/application/usecases/update-quantity.usecase';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaCartRepository } from '../../infrastructure/prisma/cart.repository.prisma';
import { TOKENS } from '../../core/application/tokens';

@Module({
  controllers: [CartController],
  providers: [
    AddToCartUseCase,
    RemoveFromCartUseCase,
    ViewCartUseCase,
    UpdateQuantityUseCase,
    PrismaService,
    PrismaCartRepository,
    { provide: TOKENS.repositories.Cart, useExisting: PrismaCartRepository },
  ],
})
export class CartModule {}
