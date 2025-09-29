import { Injectable } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import type { IRecommendationRepository } from '../../domain/repositories/recommendation.repository.interface';
import { CreateRecommendationDto } from '../dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../dto/recomendation-response.dto';

@Injectable()
export class CreateRecommendationUseCase {
  // Aquí usamos @Inject con el token que definimos en el módulo
  constructor(
    @Inject('IRecommendationRepository')
    private recommendationRepo: IRecommendationRepository,
  ) {}

  async execute(
    data: CreateRecommendationDto,
  ): Promise<RecommendationResponseDto> {
    return this.recommendationRepo.create(data);
  }
}
