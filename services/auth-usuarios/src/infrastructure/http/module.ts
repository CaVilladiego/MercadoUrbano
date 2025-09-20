import { Module } from '@nestjs/common';
import { HealthController } from './routes/health.controller';

@Module({
  controllers: [HealthController],
  providers: [],
})
export class AppModule {}
