import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/infrastructure/users/prisma/prisma.service';
import { ClientProxy } from '@nestjs/microservices';

describe('AuthUsuarios E2E - Registro', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  // Mock de NOTIFICATIONS_SERVICE para no depender de RabbitMQ real
  const notificationsMock: Partial<ClientProxy> = {
    emit: jest.fn(),
    send: jest.fn(),
    connect: jest.fn(),
    close: jest.fn(),
    on: jest.fn(),
    unwrap: jest.fn(),
    // Simulamos el observable status aunque no se use
    // @ts-expect-error simplificado
    status: { subscribe: jest.fn() },
  };

  beforeAll(async () => {
    // Creamos el módulo de prueba
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      // Sobrescribimos el cliente RabbitMQ con un mock
      .overrideProvider('NOTIFICATIONS_SERVICE')
      .useValue(notificationsMock)
      .compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = app.get(PrismaService);

    // Limpia la tabla de usuarios antes de empezar
    try {
      await prisma.$executeRawUnsafe(`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE;`);
    } catch {
      console.log(' Tabla User no encontrada, ignorando limpieza inicial.');
    }
  });

  afterAll(async () => {
    await app.close();
  });

  it(' debería registrar un usuario correctamente (POST /auth/register)', async () => {
    const payload = {
      email: 'integration@test.com',
      password: '123456',
      PrimerNombre: 'Integracion',
      Apellido: 'Prueba',
      Telefono: '3000000000',
      Direccion: 'Calle 123',
      Ciudad: 'Bogotá',
      Departamento: 'Cundinamarca',
      Pais: 'Colombia',
    };

    const response = await request(app.getHttpServer())
      .post('/auth/register')
      .send(payload)
      .expect(201);

    expect(response.body).toHaveProperty('id');
    expect(response.body.email).toBe('integration@test.com');

    // Verificar que se haya guardado en la base de datos
    const userInDb = await prisma.user.findUnique({
      where: { email: 'integration@test.com' },
    });

    expect(userInDb).not.toBeNull();
    expect(userInDb?.PrimerNombre).toBe('Integracion');

    // Verificar que el evento se haya emitido
    expect(notificationsMock.emit).toHaveBeenCalledWith('user.created', {
      email: 'integration@test.com',
      name: 'Integracion',
    });
  });
});
