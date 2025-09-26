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
      PrimerNombre: input.PrimerNombre,
      SegundoNombre: input.SegundoNombre,
      Apellido: input.Apellido,
      Telefono: input.Telefono,
      Rol: input.Rol ?? 'Cliente',
      Direccion: input.Direccion,
      Ciudad: input.Ciudad,
      Departamento: input.Departamento,
      Pais: input.Pais,
      CodigoPostal: input.CodigoPostal,
      Referencia: input.Referencia,
      // Solo crea Tiendas si el rol es Vendedor y realmente vienen datos
      Tiendas:
        input.Rol === 'Vendedor' && input.Tiendas && input.Tiendas.length > 0
          ? input.Tiendas
          : undefined,
    });

    return UserMapper.toDto(entity);
  }
}
export { USER_REPO };
