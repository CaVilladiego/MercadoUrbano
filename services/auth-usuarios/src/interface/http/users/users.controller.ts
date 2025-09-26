import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '@app/users/usecases/register-user.usecase';
import { LoginUserUseCase } from '@app/users/usecases/login-user.usecase';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { LoginDto } from '@app/users/dto/login.dto';
import { GetUserUseCase } from '@app/users/usecases/get-user.usecase';
import { ListUsersUseCase } from '@app/users/usecases/list-users.usecase';

@Controller()
export class UsersController {
  constructor(
    private readonly register: RegisterUserUseCase,
    private readonly login: LoginUserUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly listUsers: ListUsersUseCase,
  ) {}

  @Post('auth/register')
  registerUser(@Body() dto: CreateUserDto) {
    return this.register.execute(dto);
  }

  @Post('auth/login')
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }

  @Get('users')
  list() {
    return this.listUsers.execute();
  }

  @Get('users/:id')
  get(@Param('id') id: string) {
    return this.getUser.execute(id);
  }
}
