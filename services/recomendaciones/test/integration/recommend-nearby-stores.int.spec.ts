import { Test, TestingModule } from '@nestjs/testing';
import { HttpModule } from '@nestjs/axios';
import { RecommendNearbyStoresUseCase } from '../../src/core/application/use-cases/recommend-nearby-stores.usecase';
import { UsuariosApiClient } from '../../src/infrastructure/http/usuarios-api.client';
import {
  USERS_API,
  GEMINI_SERVICE,
  RECOMMENDATION_REPO,
} from '../../src/core/application/tokens';

// Mocks simples para Gemini y RecommendationRepository (no son parte de la integración real)
const mockGemini = {
  generateText: jest.fn().mockResolvedValue(`
  [
    { "idSede": "000900b8-7dae-4e7e-86f1-780b111f495f", "distancia": "2.5 km" }
  ]
  `),
};

const mockRecommendationRepo = {
  create: jest.fn((data) => Promise.resolve({ ...data, id: 'fake-id' })),
};

describe('Integración real con microservicio de Usuarios', () => {
  let useCase: RecommendNearbyStoresUseCase;

  beforeAll(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      providers: [
        RecommendNearbyStoresUseCase,
        UsuariosApiClient,
        {
          provide: USERS_API,
          useExisting: UsuariosApiClient,
        },
        {
          provide: GEMINI_SERVICE,
          useValue: mockGemini,
        },
        {
          provide: RECOMMENDATION_REPO,
          useValue: mockRecommendationRepo,
        },
      ],
    }).compile();

    useCase = moduleRef.get(RecommendNearbyStoresUseCase);
  });

  it('debería comunicarse exitosamente con el microservicio de usuarios y generar una recomendación', async () => {
    // Usa un ID de usuario real que exista en el microservicio de usuarios.
    const userId = '76502528-4713-40f1-bf48-a2b8a48757e4';

    const result = await useCase.execute(userId);

    // Verifica que haya llamado realmente a los endpoints remotos
    expect(result).toHaveProperty('id', 'fake-id');
    expect(mockRecommendationRepo.create).toHaveBeenCalled();
    expect(mockGemini.generateText).toHaveBeenCalled();

    // Si el microservicio de usuarios responde bien, el resultado debe contener la recomendación
    expect(result.sedes).toBeInstanceOf(Array);
    expect(result.sedes.length).toBeGreaterThan(0);

    console.log('✅ Resultado de integración:', result);
  }, 20000); // timeout extendido por si la API tarda un poco
});
