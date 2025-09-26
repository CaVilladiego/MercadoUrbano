import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserUseCase } from '@app/users/usecases/register-user.usecase';
import { LoginUserUseCase } from '@app/users/usecases/login-user.usecase';
import { CreateUserDto } from '@app/users/dto/create-user.dto';
import { LoginDto } from '@app/users/dto/login.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { UserDto } from '@app/users/dto/user.dto';

@ApiTags('1️⃣ Autenticación')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly register: RegisterUserUseCase,
    private readonly login: LoginUserUseCase,
  ) {}

  @Post('register')
  @ApiOperation({ summary: 'Registrar un nuevo usuario' })
  @ApiResponse({ status: 201, description: 'Usuario creado', type: UserDto })
  registerUser(@Body() dto: CreateUserDto) {
    return this.register.execute(dto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Iniciar sesión y obtener token JWT' })
  @ApiResponse({ status: 200, description: 'Token JWT' })
  loginUser(@Body() dto: LoginDto) {
    return this.login.execute(dto);
  }
}
