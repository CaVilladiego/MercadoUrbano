import { Module } from '@nestjs/common';
import { UsersModule } from '@interface/http/users/users.module';

@Module({
  imports: [UsersModule],
})
export class AppModule {}
