import { CreateRecommendationUseCase } from '../../src/core/application/use-cases/create-recommendation.usecase';
import { IRecommendationRepository } from '../../src/core/domain/repositories/recommendation.repository.interface';
import { CreateRecommendationDto } from '../../src/core/application/dto/create-recommendation.dto';
import { RecommendationResponseDto } from '../../src/core/application/dto/recomendation-response.dto';

describe('CreateRecommendationUseCase', () => {
  let useCase: CreateRecommendationUseCase;
  let repository: jest.Mocked<IRecommendationRepository>;

  beforeEach(() => {
    repository = {
      create: jest.fn(),
      findAll: jest.fn(),
    };

    useCase = new CreateRecommendationUseCase(repository);
  });

  it('✅ debería crear una recomendación correctamente', async () => {
    // Arrange
    const dto: CreateRecommendationDto = {
      userId: 'user-123',
      sedes: [{ idSede: 'sede-1', distancia: '3.5km' }],
      promptUsed: 'Prompt de prueba',
    };

    const expectedResponse: RecommendationResponseDto = {
      id: 'rec-001',
      userId: 'user-123',
      sedes: dto.sedes,
      promptUsed: dto.promptUsed,
      createdAt: new Date(),
    };

    repository.create.mockResolvedValue(expectedResponse);

    // Act
    const result = await useCase.execute(dto);

    // Assert
    expect(repository.create).toHaveBeenCalledTimes(1);
    expect(repository.create).toHaveBeenCalledWith(dto);
    expect(result).toEqual(expectedResponse);
  });

  it('❌ debería lanzar un error si el repositorio falla', async () => {
    // Arrange
    const dto: CreateRecommendationDto = {
      userId: 'user-999',
      sedes: [{ idSede: 'sede-1', distancia: '5km' }],
      promptUsed: 'Prompt con error',
    };

    repository.create.mockRejectedValue(
      new Error('Error al crear recomendación'),
    );

    // Act & Assert
    await expect(useCase.execute(dto)).rejects.toThrow(
      'Error al crear recomendación',
    );
    expect(repository.create).toHaveBeenCalledWith(dto);
  });
});
