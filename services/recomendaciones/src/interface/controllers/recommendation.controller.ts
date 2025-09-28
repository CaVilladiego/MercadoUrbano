// controllers/recommendation.controller.ts
import { Controller, Get, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { CreateRecommendationDto } from '../../core/application/dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../../core/application/dto/recomendation-response.dto';
import { CreateRecommendationUseCase } from '../../core/application/use-cases/create-recommendation.usecase';
import { GetAllRecommendationsUseCase } from '../../core/application/use-cases/get-all-recommendations.usecase';

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendationController {
  constructor(
    private createUseCase: CreateRecommendationUseCase,
    private getAllUseCase: GetAllRecommendationsUseCase,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva recomendación' })
  @ApiResponse({
    status: 201,
    description: 'Recomendación creada correctamente',
    type: RecommendationResponseDto,
  })
  create(
    @Body() data: CreateRecommendationDto,
  ): Promise<RecommendationResponseDto> {
    return this.createUseCase.execute(data);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las recomendaciones' })
  @ApiResponse({
    status: 200,
    description: 'Lista de recomendaciones',
    type: [RecommendationResponseDto],
  })
  getAll(): Promise<RecommendationResponseDto[]> {
    return this.getAllUseCase.execute();
  }
}
