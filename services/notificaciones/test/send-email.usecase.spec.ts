import { Test, TestingModule } from '@nestjs/testing';
import { SendEmailUseCase } from '../src/core/application/emails/usecases/send-email.usecase';
import { EmailRepositoryPort } from '../src/core/domain/emails/email.repository.port';

describe('SendEmailUseCase', () => {
  let usecase: SendEmailUseCase;
  let repo: jest.Mocked<EmailRepositoryPort>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SendEmailUseCase,
        {
          provide: 'EmailRepositoryPort',
          useValue: {
            send: jest.fn(),
          },
        },
      ],
    }).compile();

    usecase = module.get<SendEmailUseCase>(SendEmailUseCase);
    repo = module.get('EmailRepositoryPort');
  });

  it('debería enviar un correo usando el repositorio', async () => {
    repo.send.mockResolvedValue(); // Retorna void

    const email = {
      to: 'pruebaunitariaN@mail.com',
      subject: 'Bienvenido',
      body: 'Hola!',
    };

    const result = await usecase.execute(email);

    expect(repo.send).toHaveBeenCalledWith(email);
    expect(result).toBeUndefined(); // Porque el caso de uso retorna void
  });
});
