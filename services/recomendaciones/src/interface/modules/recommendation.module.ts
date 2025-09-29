// recommendation.module.ts
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecommendationController } from '../controllers/recommendation.controller';
import { PrismaRecommendationRepository } from '../../core/domain/repositories/prisma-recommendation.repository';
import { CreateRecommendationUseCase } from '../../core/application/use-cases/create-recommendation.usecase';
import { GetAllRecommendationsUseCase } from '../../core/application/use-cases/get-all-recommendations.usecase';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';
import { GeminiService } from '../../infrastructure/ai/gemini.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })], // hacer global evita problemas con GeminiService
  controllers: [RecommendationController],
  providers: [
    PrismaService,
    GeminiService,
    {
      provide: 'IRecommendationRepository',
      useClass: PrismaRecommendationRepository,
    },
    CreateRecommendationUseCase,
    GetAllRecommendationsUseCase,
  ],
})
export class RecommendationModule {}
