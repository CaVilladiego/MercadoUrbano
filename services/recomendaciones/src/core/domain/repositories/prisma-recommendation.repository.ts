import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../../infrastructure/prisma/prisma.service';
import { IRecommendationRepository } from './recommendation.repository.interface';
import { CreateRecommendationDto } from '../../application/dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../../application/dto/recomendation-response.dto';

@Injectable()
export class PrismaRecommendationRepository
  implements IRecommendationRepository
{
  constructor(private prisma: PrismaService) {}

  async create(
    data: CreateRecommendationDto,
  ): Promise<RecommendationResponseDto> {
    const rec = await this.prisma.recommendation.create({
      data: {
        userId: data.userId,
        sedes: data.sedes,
        promptUsed: data.promptUsed,
      },
    });

    // Mapeamos la entidad para asegurar el tipo de 'sedes'
    return {
      id: rec.id,
      userId: rec.userId,
      sedes: (rec.sedes ?? []) as { idsede: string; distancia: number }[],
      promptUsed: rec.promptUsed,
      createdAt: rec.createdAt,
    };
  }

  async findAll(): Promise<RecommendationResponseDto[]> {
    const recs = await this.prisma.recommendation.findMany();

    return recs.map((rec) => ({
      id: rec.id,
      userId: rec.userId,
      sedes: (rec.sedes ?? []) as { idsede: string; distancia: number }[],
      promptUsed: rec.promptUsed,
      createdAt: rec.createdAt,
    }));
  }

  async findByUserId(userId: string): Promise<RecommendationResponseDto[]> {
    const recs = await this.prisma.recommendation.findMany({
      where: { userId },
    });

    return recs.map((rec) => ({
      id: rec.id,
      userId: rec.userId,
      sedes: (rec.sedes ?? []) as { idsede: string; distancia: number }[],
      promptUsed: rec.promptUsed,
      createdAt: rec.createdAt,
    }));
  }
}
