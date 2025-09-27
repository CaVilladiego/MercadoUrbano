// src/core/interface/recommendation.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { RecommendationPrismaRepository } from '../../infrastructure/prisma/recommendation.prisma.repository';
import { RecommendationRepository } from '../../core/domain/repositories/recommendation.repository';

import { GetRecommendationsUseCase } from '../../core/application/use-cases/get-recommendations.usecase';

import { GeminiService } from '../../infrastructure/ai/gemini.service';
import { RecommendationsController } from '../controllers/recommendations.controller';

@Module({
  controllers: [RecommendationsController],
  providers: [
    PrismaService,
    GeminiService,

    // Casos de uso
    GetRecommendationsUseCase,

    // Inversión de dependencias: enlazamos interfaz con implementación
    {
      provide: RecommendationRepository,
      useClass: RecommendationPrismaRepository,
    },
  ],
  exports: [GetRecommendationsUseCase],
})
export class RecommendationModule {}
