import { Body, Controller, Delete, Get, Param, Patch } from '@nestjs/common';
import { GetUserUseCase } from '@app/users/usecases/get-user.usecase';
import { ListUsersUseCase } from '@app/users/usecases/list-users.usecase';
import { SearchUsersUseCase } from '@app/users/usecases/search-users.usecase';
import { UpdateUserUseCase } from '@app/users/usecases/update-user.usecase';
import { DeleteUserUseCase } from '@app/users/usecases/delete-user.usecase';
import { UpdateUserDto } from '@app/users/dto/update-user.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { UserDto } from '@app/users/dto/user.dto';

@ApiTags('2️⃣ Usuarios')
@Controller('users')
export class UsersController {
  constructor(
    private readonly getUser: GetUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly searchUsers: SearchUsersUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get()
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Listar todos los usuarios' })
  @ApiResponse({ status: 200, type: [UserDto] })
  list() {
    return this.listUsers.execute();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Obtener un usuario por su ID' })
  @ApiResponse({ status: 200, type: UserDto })
  get(@Param('id') id: string) {
    return this.getUser.execute(id);
  }

  @Get('search/:term')
  @ApiOperation({ summary: 'Buscar usuarios por nombre, email o teléfono' })
  @ApiResponse({ status: 200, type: [UserDto] })
  search(@Param('term') term: string) {
    return this.searchUsers.execute(term);
  }

  @Patch(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Actualizar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario actualizado' })
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.updateUser.execute(id, dto);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Eliminar un usuario' })
  @ApiResponse({ status: 200, description: 'Usuario eliminado' })
  remove(@Param('id') id: string) {
    return this.deleteUser.execute(id);
  }
}
