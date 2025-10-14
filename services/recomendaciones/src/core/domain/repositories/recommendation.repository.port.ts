import { RecommendationEntity } from '../entities/recommendation.entity';

export interface RecommendationRepositoryPort {
  create(data: {
    userId: string;
    sedes: any[];
    promptUsed: string;
  }): Promise<RecommendationEntity>;
}
