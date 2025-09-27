import 'dotenv/config';
import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('DB URL:', process.env.DATABASE_URL);
  const app = await NestFactory.create(AppModule);

  // Prefijo global de la API
  app.setGlobalPrefix('api');
  
  // Configuración global de validación
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,              
    transformOptions: { enableImplicitConversion: true },
  }));

  //Inicio de la Swagger Configuración
  const config = new DocumentBuilder()
    .setTitle('Mercado Urbano - Auth Usuarios')
    .setDescription('Microservicio de autenticación de usuarios (registro, login, etc.)')
    .setVersion('1.0')
    .addBearerAuth() // Para probar rutas protegidas con JWT
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  //Fin de la Swagger Configuración

  const port = parseInt(process.env.PORT || '3001', 10);
  await app.listen(port);
  console.log(`auth-usuarios listo en http://localhost:${port}/api`);
  console.log(`Swagger disponible en http://localhost:${port}/api/docs`);
}
bootstrap();
