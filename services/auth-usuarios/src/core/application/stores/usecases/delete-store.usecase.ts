import { Inject, Injectable } from '@nestjs/common';
import { StoreRepositoryPort } from '@domain/stores/store.repository.port';
import { STORE_REPO } from '@app/users/tokens';

@Injectable()
export class DeleteStoreUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}
  execute(id: string) { return this.repo.delete(id); }
}
