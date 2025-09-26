import { Inject, Injectable } from '@nestjs/common';
import { USER_REPO } from '../tokens';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UserMapper } from '../mappers/user.mapper';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class SearchUsersUseCase {
  constructor(@Inject(USER_REPO) private readonly repo: UserRepositoryPort) {}

  async execute(term: string): Promise<UserDto[]> {
    const list = await this.repo.search(term);
    return list.map(UserMapper.toDto);
  }
}
