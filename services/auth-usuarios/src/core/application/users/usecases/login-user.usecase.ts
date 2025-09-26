import { Inject, Injectable } from '@nestjs/common';
import { UserRepositoryPort } from '@domain/users/user.repository.port';
import { PasswordHasherPort } from '@domain/security/password-hasher.port';
import { TokenSignerPort } from '@domain/security/token-signer.port';
import { LoginDto } from '../dto/login.dto';
import { USER_REPO, PASSWORD_HASHER, TOKEN_SIGNER } from '../tokens';

@Injectable()
export class LoginUserUseCase {
  constructor(
    @Inject(USER_REPO) private readonly repo: UserRepositoryPort,
    @Inject(PASSWORD_HASHER) private readonly hasher: PasswordHasherPort,
    @Inject(TOKEN_SIGNER) private readonly signer: TokenSignerPort,
  ) {}

  async execute(input: LoginDto): Promise<{ access_token: string }> {
    const user = await this.repo.findByEmail(input.email);
    if (!user) throw new Error('InvalidCredentials');

    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error('InvalidCredentials');

    const access_token = await this.signer.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });
    return { access_token };
  }
}
