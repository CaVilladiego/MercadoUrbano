import { Module } from '@nestjs/common';
import { RecommendationsController } from './interface/controllers/recommendations.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { RecommendationPrismaRepository } from './infrastructure/prisma/recommendation.prisma.repository';
import { GeminiService } from './infrastructure/ai/gemini.service';

@Module({
  imports: [],
  controllers: [RecommendationsController],
  providers: [PrismaService, RecommendationPrismaRepository, GeminiService],
})
export class AppModule {}
