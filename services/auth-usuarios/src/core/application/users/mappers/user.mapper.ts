import { UserEntity } from '@domain/users/user.entity';
import { UserDto } from '../dto/user.dto';

export class UserMapper {
  static toDto(u: UserEntity): UserDto {
    const dto = new UserDto();
    dto.id = u.id;
    dto.email = u.email;
    dto.fullName = u.fullName;
    dto.role = u.role;
    dto.createdAt = u.createdAt;
    dto.updatedAt = u.updatedAt;
    return dto;
  }
}
