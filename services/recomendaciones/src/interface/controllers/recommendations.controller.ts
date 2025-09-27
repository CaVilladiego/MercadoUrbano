import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';
import { GetRecommendationsUseCase } from '../../core/application/use-cases/get-recommendations.usecase';
import { RecommendationPrismaRepository } from '../../infrastructure/prisma/recommendation.prisma.repository';
import { GeminiService } from '../../infrastructure/ai/gemini.service';
import { PrismaService } from '../../infrastructure/prisma/prisma.service';

@ApiTags('Recommendations')
@Controller('recommendations')
export class RecommendationsController {
  private useCase: GetRecommendationsUseCase;

  constructor(
    private readonly prisma: PrismaService,
    private readonly geminiService: GeminiService,
    private readonly recommendationRepo: RecommendationPrismaRepository,
  ) {
    this.useCase = new GetRecommendationsUseCase(
      this.recommendationRepo,
      this.geminiService,
    );
  }

  @Get(':userId')
  @ApiOperation({
    summary: 'Generar recomendaciones de sedes cercanas para un usuario',
  })
  @ApiParam({
    name: 'userId',
    description: 'ID del usuario',
    example: 'user-123',
  })
  @ApiResponse({
    status: 200,
    description: 'Recomendaciones generadas con éxito',
    schema: {
      example: {
        recommendation: {
          id: 'rec-abc123',
          userId: 'user-123',
          sedes: [{ idSede: 'sede-1', distancia: '2 km' }],
          promptUsed: 'Prompt usado...',
          createdAt: '2025-09-26T22:15:00.000Z',
        },
        recomendacionIA: 'La sede más cercana es la de la Calle 60...',
      },
    },
  })
  async getRecommendations(@Param('userId') userId: string) {
    // 👉 Aquí obtienes `userLocation` y `sedes` de la DB
    const userLocation = await this.prisma.direcciones_usuarios.findFirst({
      where: { id_usuario: userId, predeterminada: true },
    });

    const sedes = await this.prisma.sedes.findMany();

    return this.useCase.execute(userId, userLocation, sedes);
  }
}
