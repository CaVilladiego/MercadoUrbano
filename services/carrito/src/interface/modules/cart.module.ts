import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';

import { CartController } from '../controllers/cart.controller';

import { AddToCartUseCase } from '../../core/application/usecases/add-to-cart.usecase';
import { RemoveFromCartUseCase } from '../../core/application/usecases/remove-from-cart.usecase';
import { ViewCartUseCase } from '../../core/application/usecases/view-cart.usecase';
import { UpdateQuantityUseCase } from '../../core/application/usecases/update-quantity.usecase';

import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { PrismaCartRepository } from '../../infrastructure/prisma/cart.repository.prisma';

import { TOKENS } from '../../core/application/tokens';

import { JwtStrategy } from '../../infrastructure/security/jwt/jwt.strategy';
import { JwtAuthGuard } from '../../infrastructure/security/jwt/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/roles/roles.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_SECRET || 'changeme').trim(),
    }),
  ],
  controllers: [CartController],
  providers: [
    // Repositorio
    PrismaService,
    PrismaCartRepository,
    { provide: TOKENS.repositories.Cart, useExisting: PrismaCartRepository },

    // Use Cases
    AddToCartUseCase,
    RemoveFromCartUseCase,
    ViewCartUseCase,
    UpdateQuantityUseCase,

    // Seguridad
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class CartModule {}
