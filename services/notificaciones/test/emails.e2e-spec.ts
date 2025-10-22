import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { EmailRepositoryPort } from '../src/core/domain/emails/email.repository.port';
import { SendEmailDto } from '../src/core/application/emails/dto/send-email.dto';

describe('Emails E2E - /emails/send', () => {
  let app: INestApplication;

  // Mock del repositorio de correo (NodemailerEmailRepository)
  const emailRepoMock: Partial<EmailRepositoryPort> = {
    send: jest.fn().mockResolvedValue(undefined),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Sobrescribimos el proveedor real con el mock
      .overrideProvider('EmailRepositoryPort')
      .useValue(emailRepoMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it(' debería enviar un correo exitosamente (POST /emails/send)', async () => {
    const payload: SendEmailDto = {
      to: 'usuario@prueba.com',
      subject: 'Bienvenido a MercadoUrbano',
      body: '¡Tu cuenta ha sido creada exitosamente!',
    };

    const response = await request(app.getHttpServer())
      .post('/emails/send')
      .send(payload)
      .expect(201);

    // Validar respuesta
    expect(response.body).toEqual({
      message: 'Correo mandado exitosamente',
    });

    // Validar que el mock fue invocado
    expect(emailRepoMock.send).toHaveBeenCalledWith(
      expect.objectContaining({
        to: 'usuario@prueba.com',
        subject: 'Bienvenido a MercadoUrbano',
        body: '¡Tu cuenta ha sido creada exitosamente!',
      }),
    );
  });
});
