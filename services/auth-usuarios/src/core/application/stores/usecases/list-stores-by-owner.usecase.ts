import { Inject, Injectable } from '@nestjs/common';
import { StoreRepositoryPort } from '@domain/stores/store.repository.port';
import { STORE_REPO } from '@app/users/tokens';

@Injectable()
export class ListStoresByOwnerUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}

  async execute(ownerId: string) {
    return this.repo.findByOwner(ownerId);
  }
}
