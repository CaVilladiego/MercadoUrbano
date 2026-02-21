import { Module } from '@nestjs/common';
import { CartModule } from './interface/modules/cart.module';

@Module({
  imports: [CartModule],
})
export class AppModule {}
