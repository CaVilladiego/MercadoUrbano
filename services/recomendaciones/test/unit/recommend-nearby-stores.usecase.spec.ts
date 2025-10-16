import { RecommendNearbyStoresUseCase } from '../../src/core/application/use-cases/recommend-nearby-stores.usecase';
import { UsersApiPort } from '../../src/core/domain/repositories/users-api.port';
import { GeminiPort } from '../../src/core/domain/repositories/gemini.port';
import { RecommendationRepositoryPort } from '../../src/core/domain/repositories/recommendation.repository.port';

describe('RecommendNearbyStoresUseCase', () => {
  let useCase: RecommendNearbyStoresUseCase;
  let usersApiMock: jest.Mocked<UsersApiPort>;
  let geminiMock: jest.Mocked<GeminiPort>;
  let recommendationsMock: jest.Mocked<RecommendationRepositoryPort>;

  beforeEach(() => {
    usersApiMock = {
      getUserById: jest.fn(),
      listAllStores: jest.fn(),
    };

    geminiMock = {
      generateText: jest.fn(),
    };

    recommendationsMock = {
      create: jest.fn(),
    };

    useCase = new RecommendNearbyStoresUseCase(
      usersApiMock,
      geminiMock,
      recommendationsMock,
    );
  });

  it('debe generar recomendaciones correctamente y guardarlas', async () => {
    // 1️⃣ Mock de usuario
    usersApiMock.getUserById.mockResolvedValue({
      id: 'user-123',
      PrimerNombre: 'Juan',
      Apellido: 'Pérez',
      Direccion: 'Calle 100 #10-20',
      Ciudad: 'Bogotá',
      Departamento: 'Cundinamarca',
      Pais: 'Colombia',
    });

    // 2️⃣ Mock de sedes
    usersApiMock.listAllStores.mockResolvedValue([
      {
        id: 'sede-1',
        name: 'Sede Norte',
        ciudad: 'Bogotá',
        direccion: 'Carrera 50 #100',
        departamento: 'Cundinamarca',
        pais: 'Colombia',
      },
      {
        id: 'sede-2',
        name: 'Sede Sur',
        ciudad: 'Bogotá',
        direccion: 'Calle 10 #15',
        departamento: 'Cundinamarca',
        pais: 'Colombia',
      },
    ]);

    // 3️⃣ Mock del modelo Gemini
    geminiMock.generateText.mockResolvedValue(`
      [
        { "idSede": "sede-1", "distancia": "1.5 km" },
        { "idSede": "sede-2", "distancia": "3.2 km" }
      ]
    `);

    // 4️⃣ Mock del repositorio
    recommendationsMock.create.mockResolvedValue({
      id: 'rec-001',
      userId: 'user-123',
      sedes: [
        { idSede: 'sede-1', distancia: '1.5 km' },
        { idSede: 'sede-2', distancia: '3.2 km' },
      ],
      promptUsed: expect.any(String),
      createdAt: new Date(),
    } as any);

    // 5️⃣ Ejecutar el caso de uso
    const result = await useCase.execute('user-123');

    // 6️⃣ Validar resultados
    expect(usersApiMock.getUserById).toHaveBeenCalledWith('user-123');
    expect(usersApiMock.listAllStores).toHaveBeenCalled();
    expect(geminiMock.generateText).toHaveBeenCalledWith(
      expect.stringContaining('Juan Pérez'),
    );
    expect(recommendationsMock.create).toHaveBeenCalledWith(
      expect.objectContaining({
        userId: 'user-123',
        sedes: [
          { idSede: 'sede-1', distancia: '1.5 km' },
          { idSede: 'sede-2', distancia: '3.2 km' },
        ],
      }),
    );

    expect(result).toHaveProperty('id', 'rec-001');
  });

  it('debe lanzar error si el usuario no tiene dirección registrada', async () => {
    usersApiMock.getUserById.mockResolvedValue({ id: 'user-999' });
    usersApiMock.listAllStores.mockResolvedValue([]);

    await expect(useCase.execute('user-999')).rejects.toThrow(
      'El usuario no tiene dirección registrada.',
    );
  });
});
