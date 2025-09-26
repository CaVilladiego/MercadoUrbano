import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UpdateUserDto } from '../dto/update-user.dto';
import { USER_REPO } from '../tokens';

@Injectable()
export class UpdateUserUseCase {
  constructor(@Inject(USER_REPO) private readonly repo: UserRepositoryPort) {}

  async execute(id: string, data: UpdateUserDto) {
    return this.repo.update(id, data);
  }
}
