import { Inject, Injectable } from '@nestjs/common';
import { StoreRepositoryPort } from '@domain/stores/store.repository.port';
import { STORE_REPO } from '@app/users/tokens';

@Injectable()
export class CreateStoreUseCase {
  constructor(@Inject(STORE_REPO) private readonly repo: StoreRepositoryPort) {}

  async execute(
    ownerId: string,
    data: {
      name: string;
      telefono: string;
      description?: string;
      email?: string;
      direccion: string;
      ciudad: string;
      departamento: string;
      pais: string;
      codigoPostal?: string;
      referencia?: string;
    }
  ) {
    return this.repo.create({ ownerId, ...data });
  }
}
