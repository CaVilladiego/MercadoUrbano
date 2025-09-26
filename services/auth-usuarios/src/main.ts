import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  console.log('DB URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);
  console.log(`auth-usuarios listo en http://localhost:${port}/api`);
  
}
bootstrap();
