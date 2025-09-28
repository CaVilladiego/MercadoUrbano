import { Injectable, Inject } from '@nestjs/common';
import type { IRecommendationRepository } from '../../domain/repositories/recommendation.repository.interface';
import { RecommendationResponseDto } from '../dto/recomendation-response.dto';

@Injectable()
export class GetAllRecommendationsUseCase {
  constructor(
    @Inject('IRecommendationRepository')
    private recommendationRepo: IRecommendationRepository,
  ) {}

  async execute(): Promise<RecommendationResponseDto[]> {
    return this.recommendationRepo.findAll();
  }
}
