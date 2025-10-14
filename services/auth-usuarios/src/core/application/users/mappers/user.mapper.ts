import { UserEntity } from '@domain/users/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static toDto(u: UserEntity): UserDto {
    const dto = new UserDto();

    dto.id = u.id;
    dto.email = u.email;
    dto.PrimerNombre = u.PrimerNombre;
    dto.SegundoNombre = u.SegundoNombre || undefined;
    dto.Apellido = u.Apellido;
    dto.Telefono = u.Telefono;
    dto.Rol = u.Rol;
    dto.isActive = u.isActive;
    dto.createdAt = u.createdAt;
    dto.updatedAt = u.updatedAt;
    dto.Direccion = u.Direccion;
    dto.Ciudad = u.Ciudad;

    return dto;
  }
}
