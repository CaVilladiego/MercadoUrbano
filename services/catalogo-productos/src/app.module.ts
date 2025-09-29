import { Module } from '@nestjs/common';
import { ProductsModule } from './interface/modules/products.module';


@Module({
  imports: [ProductsModule,],
  controllers: [],
  providers: [],
})
export class AppModule {}