import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { PasswordHasherPort } from '@domain/security/password-hasher.port';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserMapper } from '../mappers/user.mapper';
import { UserDto } from '../dto/user.dto';
import { USER_REPO, PASSWORD_HASHER } from '../tokens';

@Injectable()
export class RegisterUserUseCase {
  constructor(
    @Inject(USER_REPO) private readonly repo: UserRepositoryPort,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasherPort,
  ) {}

  async execute(input: CreateUserDto): Promise<UserDto> {
    const exists = await this.repo.findByEmail(input.email);
    if (exists) throw new Error('EmailAlreadyInUse');

    const passwordHash = await this.hasher.hash(input.password);
    const entity = await this.repo.create({
      email: input.email,
      passwordHash,
      fullName: input.fullName,
      role: input.role ?? 'USER',
    });
    return UserMapper.toDto(entity);
  }
}
export { USER_REPO };

