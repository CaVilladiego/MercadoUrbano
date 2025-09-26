import { Inject, Injectable } from '@nestjs/common';
import { StoreRepositoryPort } from '@domain/stores/store.repository.port';
import { STORE_REPO } from '@app/users/tokens';

@Injectable()
export class UpdateStoreUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}
  execute(id: string, data: Partial<{ name: string; telefono: string; description?: string | null; email?: string | null; isActive?: boolean; }>) {
    return this.repo.update(id, data);
  }
}
