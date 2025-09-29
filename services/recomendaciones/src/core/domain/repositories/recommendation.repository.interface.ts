// repositories/recommendation.repository.interface.ts
import { CreateRecommendationDto } from '../../application/dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../../application/dto/recomendation-response.dto';

export interface IRecommendationRepository {
  create(data: CreateRecommendationDto): Promise<RecommendationResponseDto>;
  findAll(): Promise<RecommendationResponseDto[]>;
}
