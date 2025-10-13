import { Inject, Injectable } from "@nestjs/common";
import { StoreRepositoryPort } from "@domain/stores/store.repository.port";
import { StoreMapper } from "../mappers/store.mapper";
import { StoreDto } from "../dto/store.dto";

// Define el mismo token que uses en tu módulo (similar a USER_REPO)
export const STORE_REPO = "STORE_REPO";

@Injectable()
export class ListStoresUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}

  async execute(): Promise<StoreDto[]> {
    const stores = await this.repo.list();
    return stores.map(StoreMapper.toDto);
  }
}
