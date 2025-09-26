import { Inject, Injectable } from '@nestjs/common';
import { USER_REPO } from './register-user.usecase';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UserMapper } from '../mappers/user.mapper';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class ListUsersUseCase {
  constructor(@Inject(USER_REPO) private readonly repo: UserRepositoryPort) {}

  async execute(): Promise<UserDto[]> {
    const list = await this.repo.list();
    return list.map(UserMapper.toDto);
  }
}
