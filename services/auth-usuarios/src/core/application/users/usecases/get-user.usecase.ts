import { Inject, Injectable } from '@nestjs/common';
import { USER_REPO } from './register-user.usecase';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { UserMapper } from '../mappers/user.mapper';
import { UserDto } from '../dto/user.dto';

@Injectable()
export class GetUserUseCase {
  constructor(@Inject(USER_REPO) private readonly repo: UserRepositoryPort) {}

  async execute(id: string): Promise<UserDto> {
    const u = await this.repo.findById(id);
    if (!u) throw new Error('UserNotFound');
    return UserMapper.toDto(u);
  }
}
