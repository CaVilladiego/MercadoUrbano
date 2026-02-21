import { GetAllRecommendationsUseCase } from '../../src/core/application/use-cases/get-all-recommendations.usecase';
import { IRecommendationRepository } from '../../src/core/domain/repositories/recommendation.repository.interface';
import { RecommendationResponseDto } from '../../src/core/application/dto/recomendation-response.dto';

describe('GetAllRecommendationsUseCase', () => {
  let useCase: GetAllRecommendationsUseCase;
  let repository: jest.Mocked<IRecommendationRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new GetAllRecommendationsUseCase(repository);
  });

  it('✅ debería retornar todas las recomendaciones', async () => {
    // Arrange
    const mockRecommendations: RecommendationResponseDto[] = [
      {
        id: 'rec-001',
        userId: 'user-123',
        sedes: [{ idsede: 'sede-1', distancia: 3.5 }],
        promptUsed: 'Prompt ejemplo',
        createdAt: new Date(),
      },
      {
        id: 'rec-002',
        userId: 'user-456',
        sedes: [{ idsede: 'sede-2', distancia: 5 }],
        promptUsed: 'Otro prompt',
        createdAt: new Date(),
      },
    ];

    repository.findAll.mockResolvedValue(mockRecommendations);

    // Act
    const result = await useCase.execute();

    // Assert
    expect(repository.findAll).toHaveBeenCalledTimes(1);
    expect(result).toEqual(mockRecommendations);
  });

  it('❌ debería lanzar un error si el repositorio falla', async () => {
    // Arrange
    repository.findAll.mockRejectedValue(
      new Error('Error de conexión a la base de datos'),
    );

    // Act & Assert
    await expect(useCase.execute()).rejects.toThrow(
      'Error de conexión a la base de datos',
    );
    expect(repository.findAll).toHaveBeenCalledTimes(1);
  });
});
