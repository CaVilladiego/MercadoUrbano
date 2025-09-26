import { UserEntity } from './user.entity';

export interface UserRepositoryPort {
  create(data: { email: string; passwordHash: string; fullName: string; role?: 'USER'|'ADMIN'|'VENDOR' }): Promise<UserEntity>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  list(): Promise<UserEntity[]>;
}
