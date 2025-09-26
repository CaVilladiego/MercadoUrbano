import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { USER_REPO } from '../tokens';

@Injectable()
export class DeleteUserUseCase {
  constructor(@Inject(USER_REPO) private readonly repo: UserRepositoryPort) {}

  async execute(id: string) {
    return this.repo.delete(id);
  }
}
