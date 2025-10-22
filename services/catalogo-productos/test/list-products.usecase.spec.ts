import { ListProductsUseCase } from '../src/core/application/usecases/list-products.usecase';
import type { ProductRepository } from '../src/core/domain/repositories/product.repository.port';
import type { Product } from '../src/core/domain/entities/product.entity';

describe('ListProductsUseCase', () => {
  let mockRepo: jest.Mocked<ProductRepository>;
  let useCase: ListProductsUseCase;

  beforeEach(() => {
    mockRepo = {
      findAllAvailable: jest.fn(),
      findById: jest.fn(),
      save: jest.fn(),
      delete: jest.fn(),
    } as any;

    useCase = new ListProductsUseCase(mockRepo);
  });

  it('should return all available products', async () => {
    const products: Product[] = [
      { id: '1', name: 'Laptop', price: 1000, available: true },
    ] as any;

    mockRepo.findAllAvailable.mockResolvedValue(products);

    const result = await useCase.execute();

    expect(result).toEqual(products);
    expect(mockRepo.findAllAvailable).toHaveBeenCalledTimes(1);
  });
});