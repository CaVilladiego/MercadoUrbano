// controllers/recommendation.controller.ts
import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Req,
  ForbiddenException,
} from '@nestjs/common';

import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

import { CreateRecommendationDto } from '../../core/application/dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../../core/application/dto/recomendation-response.dto';

import { CreateRecommendationUseCase } from '../../core/application/use-cases/create-recommendation.usecase';
import { GetAllRecommendationsUseCase } from '../../core/application/use-cases/get-all-recommendations.usecase';
import { RecommendNearbyStoresUseCase } from '../../core/application/use-cases/recommend-nearby-stores.usecase';

import { Roles } from '../../infrastructure/security/roles/roles.decorator';

@ApiTags('Recommendations')
@ApiBearerAuth()
@Controller('recommendations')
export class RecommendationController {
  constructor(
    private readonly createUseCase: CreateRecommendationUseCase,
    private readonly getAllUseCase: GetAllRecommendationsUseCase,
    private readonly recommendUseCase: RecommendNearbyStoresUseCase,
  ) {}

  // SOLO ADMIN puede ver todas las recomendaciones
  @Get()
  @Roles('Administrador')
  @ApiOperation({ summary: 'Obtener todas las recomendaciones (Admin)' })
  @ApiResponse({
    status: 200,
    description: 'Lista de recomendaciones',
    type: [RecommendationResponseDto],
  })
  getAll(): Promise<RecommendationResponseDto[]> {
    return this.getAllUseCase.execute();
  }

  // Crear una recomendación → Cliente o Administrador
  @Post()
  @Roles('Cliente', 'Administrador')
  @ApiOperation({ summary: 'Crear una nueva recomendación' })
  @ApiResponse({
    status: 201,
    description: 'Recomendación creada correctamente',
    type: RecommendationResponseDto,
  })
  create(
    @Body() data: CreateRecommendationDto,
    @Req() req: RequestWithUser,
  ): Promise<RecommendationResponseDto> {
    data.userId = req.user.id; // siempre proteger la identidad

    return this.createUseCase.execute(data);
  }

  // Generar recomendaciones de sedes cercanas
  @Post(':userId')
  @Roles('Cliente', 'Administrador')
  @ApiOperation({ summary: 'Generar recomendaciones de sedes cercanas' })
  async generate(
    @Param('userId') userId: string,
    @Req() req: RequestWithUser,
  ) {
    const requester = req.user;

    // Cliente NO puede generar recomendaciones de otro usuario
    if (requester.Rol !== 'Administrador' && requester.id !== userId) {
      throw new ForbiddenException(
        'No puedes generar recomendaciones para otro usuario',
      );
    }

    return this.recommendUseCase.execute(userId);
  }
}
