import { CreateProductUseCase } from '../src/core/application/usecases/create-product.usecase';
import type { ProductRepository } from '../src/core/domain/repositories/product.repository.port';
import { CreateProductDto } from '../src/core/application/dto/create-product.dto';

describe('CreateProductUseCase', () => {
  let mockRepo: jest.Mocked<ProductRepository>;
  let useCase: CreateProductUseCase;

  beforeEach(() => {
    mockRepo = {
      findAllAvailable: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new CreateProductUseCase(mockRepo);
  });

  it('should create a product and call save', async () => {
    const dto: CreateProductDto = {
      id_producto: '1',
      id_vendedor: 'v1',
      nombre: 'Laptop',
      descripcion: 'Awesome laptop',
      precio: 1000,
      stock: 10,
      estado: 'activo',
    };

    const result = await useCase.execute(dto);

    expect(result).toMatchObject(dto);
    expect(mockRepo.save).toHaveBeenCalledWith(expect.objectContaining({ id_producto: '1' }));
  });

  it('should throw if stock is negative', async () => {
    const dto: CreateProductDto = {
      id_producto: '2',
      id_vendedor: 'v2',
      nombre: 'Laptop',
      descripcion: 'Bad stock',
      precio: 500,
      stock: -1,
      estado: 'activo',
    };

    await expect(useCase.execute(dto)).rejects.toThrow('Stock cannot be negative');
  });
});