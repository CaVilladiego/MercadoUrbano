import { GetProductUseCase } from '../src/core/application/usecases/get-product.usecase';
import type { ProductRepository } from '../src/core/domain/repositories/product.repository.port';
import type { Product } from '../src/core/domain/entities/product.entity';

describe('GetProductUseCase', () => {
  let mockRepo: jest.Mocked<ProductRepository>;
  let useCase: GetProductUseCase;

  beforeEach(() => {
    mockRepo = {
      findAllAvailable: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new GetProductUseCase(mockRepo);
  });

  it('should return a product if found', async () => {
    const product: Product = {
      id_producto: '1',
      id_vendedor: 'v1',
      nombre: 'Laptop',
      descripcion: 'Awesome laptop',
      precio: 1000,
      stock: 10,
      estado: 'activo',
    } as any;

    mockRepo.findById.mockResolvedValue(product);

    const result = await useCase.execute('1');

    expect(result).toEqual(product);
    expect(mockRepo.findById).toHaveBeenCalledWith('1');
  });

  it('should return null if product not found', async () => {
    mockRepo.findById.mockResolvedValue(null);

    const result = await useCase.execute('999');

    expect(result).toBeNull();
    expect(mockRepo.findById).toHaveBeenCalledWith('999');
  });
});