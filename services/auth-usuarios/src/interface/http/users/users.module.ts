import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { PrismaService } from '@infra/users/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/users/prisma/prisma-user.repository';
import { BcryptHasher } from '@infra/security/bcrypt/bcrypt.hasher';
import { JwtModule } from '@nestjs/jwt';
import { JwtTokenSigner } from '@infra/security/jwt/jwt.token-signer';

import { RegisterUserUseCase } from '@app/users/usecases/register-user.usecase';
import { LoginUserUseCase } from '@app/users/usecases/login-user.usecase';
import { GetUserUseCase } from '@app/users/usecases/get-user.usecase';
import { ListUsersUseCase } from '@app/users/usecases/list-users.usecase';
import { USER_REPO, PASSWORD_HASHER, TOKEN_SIGNER } from '@app/users/tokens';

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'changeme',
      signOptions: { expiresIn: process.env.JWT_EXPIRES_IN || '1h' },
    }),
  ],
  controllers: [UsersController],
  providers: [
    PrismaService,
    // Adapters
    { provide: USER_REPO, useClass: PrismaUserRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptHasher },
    { provide: TOKEN_SIGNER, useClass: JwtTokenSigner },
    // Use cases
    RegisterUserUseCase,
    LoginUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
  ],
})
export class UsersModule {}
