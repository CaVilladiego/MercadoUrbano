// recommendation.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecommendationController } from '../controllers/recommendation.controller';
import { PrismaRecommendationRepository } from '../../core/domain/repositories/prisma-recommendation.repository';
import { CreateRecommendationUseCase } from '../../core/application/use-cases/create-recommendation.usecase';
import { GetAllRecommendationsUseCase } from '../../core/application/use-cases/get-all-recommendations.usecase';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { GeminiService } from '../../infrastructure/ai/gemini.service';
import { HttpModule } from '@nestjs/axios';
import { UsuariosApiClient } from '../../infrastructure/http/usuarios-api.client';
import {
  USERS_API,
  GEMINI_SERVICE,
  RECOMMENDATION_REPO,
} from '../../core/application/tokens';
import { RecommendNearbyStoresUseCase } from '../../core/application/use-cases/recommend-nearby-stores.usecase';

@Module({
  imports: [HttpModule, ConfigModule.forRoot({ isGlobal: true })], // hacer global evita problemas con GeminiService
  controllers: [RecommendationController],
  providers: [
    PrismaService,
    GeminiService,
    UsuariosApiClient,
    {
      provide: 'IRecommendationRepository',
      useClass: PrismaRecommendationRepository,
    },
    { provide: USERS_API, useClass: UsuariosApiClient },
    { provide: GEMINI_SERVICE, useClass: GeminiService },
    { provide: RECOMMENDATION_REPO, useClass: PrismaRecommendationRepository },
    CreateRecommendationUseCase,
    GetAllRecommendationsUseCase,
    RecommendNearbyStoresUseCase,
  ],
})
export class RecommendationModule {}
