import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RecommendationModule } from './interface/modules/recommendation.module';
import { RecommendationController } from './interface/controllers/recommendation.controller';
import { PrismaService } from './infrastructure/prisma/prisma.service';
import { RecommendationPrismaRepository } from './infrastructure/prisma/recommendation.prisma.repository';
import { GeminiService } from './infrastructure/ai/gemini.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // esto hace que ConfigService esté disponible en todos los módulos
    }),
    RecommendationModule,
  ],
  controllers: [],
  providers: [PrismaService, RecommendationPrismaRepository, GeminiService],
})
export class AppModule {}
