// recommendation.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { APP_GUARD } from '@nestjs/core';

import { RecommendationController } from '../controllers/recommendation.controller';

import { PrismaRecommendationRepository } from '../../core/domain/repositories/prisma-recommendation.repository';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

import { GeminiService } from '../../infrastructure/ai/gemini.service';
import { UsuariosApiClient } from '../../infrastructure/http/usuarios-api.client';

import {
  USERS_API,
  GEMINI_SERVICE,
  RECOMMENDATION_REPO,
} from '../../core/application/tokens';

import { CreateRecommendationUseCase } from '../../core/application/use-cases/create-recommendation.usecase';
import { GetAllRecommendationsUseCase } from '../../core/application/use-cases/get-all-recommendations.usecase';
import { RecommendNearbyStoresUseCase } from '../../core/application/use-cases/recommend-nearby-stores.usecase';

import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../../infrastructure/security/jwt/jwt.strategy';
import { JwtAuthGuard } from '../../infrastructure/security/jwt/jwt-auth.guard';
import { RolesGuard } from '../../infrastructure/security/roles/roles.guard';

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({ isGlobal: true }),

    // JWT
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
    }),
  ],

  controllers: [RecommendationController],

  providers: [
    // Prisma
    PrismaService,

    // Infraestructura
    GeminiService,
    UsuariosApiClient,

    // Repositorios y tokens
    { provide: 'IRecommendationRepository', useClass: PrismaRecommendationRepository },
    { provide: RECOMMENDATION_REPO, useClass: PrismaRecommendationRepository },
    { provide: USERS_API, useClass: UsuariosApiClient },
    { provide: GEMINI_SERVICE, useClass: GeminiService },

    // Use cases
    CreateRecommendationUseCase,
    GetAllRecommendationsUseCase,
    RecommendNearbyStoresUseCase,

    // Seguridad
    JwtStrategy,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
  ],
})
export class RecommendationModule {}
