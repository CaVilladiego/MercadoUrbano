import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

process.on('unhandledRejection', (reason) => {
  console.error(' Unhandled Rejection DETECTADA ');
  console.error(reason);
});

process.on('uncaughtException', (err) => {
  console.error(' Uncaught Exception DETECTADA ');
  console.error(err);
});

async function bootstrap() {
  console.log('DB URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: process.env.FRONTEND_URL,
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
});


  // Prefijo global de la API
  app.setGlobalPrefix('api');
  
  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
    transformOptions: { enableImplicitConversion: true },
  }));

  // Swagger
  const config = new DocumentBuilder()
    .setTitle('Mercado Urbano - Auth Usuarios')
    .setDescription('Microservicio de autenticación de usuarios (registro, login, etc.)')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);
  console.log(`auth-usuarios listo en http://localhost:${port}/api`);
  console.log(`Swagger disponible en http://localhost:${port}/api/docs`);
}

bootstrap();
