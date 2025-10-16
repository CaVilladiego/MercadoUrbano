import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import { PrismaService } from '../../src/infrastructure/prisma/prisma.service';

describe('Recomendaciones (Integración)', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();

    prisma = moduleFixture.get(PrismaService);
  });

  afterAll(async () => {
    await prisma.$disconnect();
    await app.close();
  });

  it('debería crear una recomendación', async () => {
    const response = await request(app.getHttpServer())
      .post('/recommendations')
      .send({
        userId: '123',
        sedes: [{ id: 1, nombre: 'Sede Central' }],
        promptUsed: 'test-prompt',
      })
      .expect(201);

    expect(response.body).toHaveProperty('id');
  });
});
