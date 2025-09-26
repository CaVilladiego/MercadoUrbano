import { StoreEntity } from './store.entity';

export interface StoreRepositoryPort {
  create(data: {
    ownerId: string;
    name: string;
    telefono: string;
    email?: string;
    description?: string;
    direccion: string;
    ciudad: string;
    departamento: string;
    pais: string;
    codigoPostal?: string;
    referencia?: string;
  }): Promise<StoreEntity>;

  findById(id: string): Promise<StoreEntity | null>;
  findByOwner(ownerId: string): Promise<StoreEntity[]>;
  list(): Promise<StoreEntity[]>;
  update(id: string, data: Partial<Omit<StoreEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<StoreEntity>;
  delete(id: string): Promise<StoreEntity>;
}
