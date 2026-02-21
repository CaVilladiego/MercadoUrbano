import { Inject, Injectable } from "@nestjs/common";
import { StoreRepositoryPort } from "@domain/stores/store.repository.port";
import { StoreMapper } from "../mappers/store.mapper";
import { StoreDto } from "../dto/store.dto";
import { STORE_REPO } from "@app/users/tokens";

@Injectable()
export class ListStoresUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}

  async execute(): Promise<StoreDto[]> {
    const stores = await this.repo.list();
    return stores.map(StoreMapper.toDto);
  }
}
