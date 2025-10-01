import { UserEntity } from './user.entity';

export interface UserRepositoryPort {
  create(data: {
    email: string;
    passwordHash: string;
    PrimerNombre: string;
    SegundoNombre?: string | null;
    Apellido: string;
    Telefono: string;
    Rol?: 'Cliente' | 'Vendedor' | 'Administrador';
    // Dirección principal
    Direccion: string;
    Ciudad: string;
    Departamento: string;
    Pais: string;
    CodigoPostal?: string | null;
    Referencia?: string | null;
    // Tiendas del vendedor
    Tiendas?: Array<{
      name: string;
      telefono: string;
      description?: string;
      email?: string;
    }>;
  }): Promise<UserEntity>;

  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
  update(id: string, data: Partial<Omit<UserEntity, 'id' | 'createdAt' | 'updatedAt'>>): Promise<UserEntity>;
  delete(id: string): Promise<UserEntity>;
  search(term: string): Promise<UserEntity[]>;
}
