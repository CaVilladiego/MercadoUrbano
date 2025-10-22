import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../../src/app.module';
import type { ProductRepository } from '../../src/core/domain/repositories/product.repository.port';

describe('Productos Catalogo Integration', () => {
  let app: INestApplication;
  let repo: ProductRepository;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    await app.init();

    repo = moduleFixture.get<ProductRepository>('ProductRepository');
  });

  afterAll(async () => {
    await app.close();
  });

  it('should create and retrieve a product', async () => {
    const dto = {
      id_producto: 'p1',
      id_vendedor: 'v1',
      nombre: 'Laptop',
      descripcion: 'Awesome laptop',
      precio: 1000,
      stock: 10,
      estado: 'activo',
    };

    // POST via HTTP
    await request(app.getHttpServer())
      .post('/api/products')
      .send(dto)
      .expect(201);

    // GET via repo directly
    const product = await repo.findById('p1');
    expect(product).toBeDefined();
    expect(product?.nombre).toBe(dto.nombre);
    expect(product?.precio).toBe(dto.precio);
  });

  it('should list products', async () => {
    const response = await request(app.getHttpServer())
      .get('/api/products')
      .expect(200);

    expect(Array.isArray(response.body)).toBe(true);
    expect(response.body.length).toBeGreaterThan(0);
  });
});