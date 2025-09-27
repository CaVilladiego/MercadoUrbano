// src/core/domain/repositories/recommendation.repository.ts
import { Recommendation } from '../entities/recommendation.entity';

export abstract class RecommendationRepository {
  abstract createRecommendation(
    data: Omit<Recommendation, 'id' | 'createdAt'>,
  ): Promise<Recommendation>;

  abstract findByUserId(userId: string): Promise<Recommendation[]>;
}
