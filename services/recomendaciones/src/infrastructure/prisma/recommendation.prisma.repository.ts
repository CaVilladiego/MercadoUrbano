import { Injectable } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Recommendation } from '../../core/domain/entities/recommendation.entity';
import { RecommendationRepository } from '../../core/domain/repositories/recommendation.repository';

@Injectable()
export class RecommendationPrismaRepository
  implements RecommendationRepository
{
  constructor(private prisma: PrismaService) {}

  async createRecommendation(
    data: Omit<Recommendation, 'id' | 'createdAt'>,
  ): Promise<Recommendation> {
    const rec = await this.prisma.recommendation.create({
      data: {
        userId: data.userId,
        sedes: data.sedes,
        promptUsed: data.promptUsed,
      },
    });
    return new Recommendation(
      rec.id,
      rec.userId,
      rec.sedes,
      rec.promptUsed,
      rec.createdAt,
    );
  }

  async findByUserId(userId: string): Promise<Recommendation[]> {
    const recs = await this.prisma.recommendation.findMany({
      where: { userId },
    });
    return recs.map(
      (r) =>
        new Recommendation(r.id, r.userId, r.sedes, r.promptUsed, r.createdAt),
    );
  }
}
