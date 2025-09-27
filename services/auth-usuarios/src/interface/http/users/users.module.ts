import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ClientsModule, Transport } from '@nestjs/microservices';   

import { UsersController } from './users.controller';
import { AuthController } from './auth.controller';
import { StoresController } from '@interface/http/stores/stores.controller';

import { PrismaService } from '@infra/users/prisma/prisma.service';
import { PrismaUserRepository } from '@infra/users/prisma/prisma-user.repository';
import { PrismaStoreRepository } from '@infra/stores/prisma/prisma-store.repository';

import { BcryptHasher } from '@infra/security/bcrypt/bcrypt.hasher';
import { JwtTokenSigner } from '@infra/security/jwt/jwt.token-signer';

import { RegisterUserUseCase } from '@app/users/usecases/register-user.usecase';
import { LoginUserUseCase } from '@app/users/usecases/login-user.usecase';
import { GetUserUseCase } from '@app/users/usecases/get-user.usecase';
import { ListUsersUseCase } from '@app/users/usecases/list-users.usecase';
import { UpdateUserUseCase } from '@app/users/usecases/update-user.usecase';
import { DeleteUserUseCase } from '@app/users/usecases/delete-user.usecase';
import { SearchUsersUseCase } from '@app/users/usecases/search-users.usecase';

import { CreateStoreUseCase } from '@app/stores/usecases/create-store.usecase';
import { ListStoresByOwnerUseCase } from '@app/stores/usecases/list-stores-by-owner.usecase';
import { UpdateStoreUseCase } from '@app/stores/usecases/update-store.usecase';
import { DeleteStoreUseCase } from '@app/stores/usecases/delete-store.usecase';

import { USER_REPO, PASSWORD_HASHER, TOKEN_SIGNER, STORE_REPO } from '@app/users/tokens';

@Module({
  imports: [
    JwtModule.register({
      secret: (process.env.JWT_SECRET || 'changeme').trim(),
    }),
    ClientsModule.register([
      {
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqp://guest:guest@localhost:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: true },
        },
      },
    ]),
  ],
  controllers: [AuthController, UsersController, StoresController],
  providers: [
    PrismaService,
    BcryptHasher,
    { provide: USER_REPO,  useClass: PrismaUserRepository  },
    { provide: STORE_REPO, useClass: PrismaStoreRepository },
    { provide: PASSWORD_HASHER, useClass: BcryptHasher },
    { provide: TOKEN_SIGNER,    useClass: JwtTokenSigner },
    // Users
    RegisterUserUseCase,
    LoginUserUseCase,
    GetUserUseCase,
    ListUsersUseCase,
    SearchUsersUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
    // Stores
    CreateStoreUseCase,
    ListStoresByOwnerUseCase,
    UpdateStoreUseCase,
    DeleteStoreUseCase,
  ],
})
export class UsersModule {}
