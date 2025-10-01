import { Test, TestingModule } from '@nestjs/testing';
import { RegisterUserUseCase } from '../src/core/application/users/usecases/register-user.usecase';
import { UserRepositoryPort } from '../src/core/domain/users/user.repository.port';
import { USER_REPO, PASSWORD_HASHER } from '../src/core/application/users/tokens';
import { PasswordHasherPort } from '../src/core/domain/security/password-hasher.port';
import { ClientProxy } from '@nestjs/microservices';

describe('RegisterUserUseCase', () => {
  let usecase: RegisterUserUseCase;
  let repo: jest.Mocked<UserRepositoryPort>;
  let hasher: jest.Mocked<PasswordHasherPort>;
  let client: jest.Mocked<ClientProxy>;

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      RegisterUserUseCase,
      {
        provide: USER_REPO,
        useValue: { create: jest.fn(), findByEmail: jest.fn() },
      },
      {
        provide: PASSWORD_HASHER,
        useValue: { hash: jest.fn().mockResolvedValue('hashedPassword'), compare: jest.fn() },
      },
      {
        provide: 'NOTIFICATIONS_SERVICE',
        useValue: { emit: jest.fn(), send: jest.fn(), connect: jest.fn(), close: jest.fn(), on: jest.fn(), status: { subscribe: jest.fn() }, unwrap: jest.fn() },
      },
    ],
  }).compile();

  usecase = module.get(RegisterUserUseCase);
  repo = module.get(USER_REPO);
});

  it('Se registra un usuario con todos los campos requeridos', async () => {
    repo.findByEmail.mockResolvedValue(null); // No existe previamente
    repo.create.mockResolvedValue({
      id: '1',
      email: 'test@mail.com',
      PrimerNombre: 'Juan',
      Apellido: 'Pérez',
      Telefono: '3001234567',
      Direccion: 'Calle 123',
      Ciudad: 'Bogotá',
      Departamento: 'Cundinamarca',
      Pais: 'Colombia',
      createdAt: new Date(),
      updatedAt: new Date(),
    } as any);

    const result = await usecase.execute({
      email: 'test@mail.com',
      password: '123456',
      PrimerNombre: 'Juan',
      Apellido: 'Pérez',
      Telefono: '3001234567',
      Direccion: 'Calle 123',
      Ciudad: 'Bogotá',
      Departamento: 'Cundinamarca',
      Pais: 'Colombia',
    });

    expect(result).toHaveProperty('id');
    expect(hasher.hash).toHaveBeenCalledWith('123456');
    expect(repo.create).toHaveBeenCalled();
    expect(client.emit).toHaveBeenCalledWith('user.created', {
      email: 'test@mail.com',
      name: 'Juan',
    });
  });
});
