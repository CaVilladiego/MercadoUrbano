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
  ) { }

  async execute(input: LoginDto): Promise<any> {
    const user = await this.repo.findByEmail(input.email);
    console.log("USER FOUND:", user);
    if (!user) {
      console.log("❌ NO EXISTE USUARIO");
      throw new Error('InvalidCredentials');
    }

    console.log("Comparing:", input.password, "with hash:", user.passwordHash);

    const ok = await this.hasher.compare(input.password, user.passwordHash);
    console.log("COMPARE RESULT:", ok);
    if (!ok) {
      console.log("❌ PASSWORD INCORRECTA");
      throw new Error('InvalidCredentials');
    }
    const payload = {
      id: user.id,
      email: user.email,
      Rol: user.Rol,
    };

    const token = await this.signer.sign(payload, { expiresIn: '3600' });

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: `${user.PrimerNombre} ${user.Apellido}`,
        Rol: user.Rol, // Cliente | Vendedor | Administrador
      },
    };
  }
}
