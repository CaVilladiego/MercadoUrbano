/* eslint-disable @typescript-eslint/no-floating-promises */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));

  app.enableCors({
    origin: '*',
    methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
    allowedHeaders: 'Content-Type, Authorization',
    credentials: true,
  });

  // Swagger setup
  const config = new DocumentBuilder()
    .setTitle('Cart Microservice')
    .setDescription('API del microservicio de carrito (solo carrito).')
    .setVersion('1.0')
    .addTag('cart')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  const port = parseInt(process.env.PORT || '3005', 10);
  await app.listen(port);
  console.log('Cart microservice listening on 3005 — Swagger: /api-docs');
}
bootstrap();
