/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
  origin: "*",
  methods: 'GET,POST,PUT,PATCH,DELETE,OPTIONS',
  allowedHeaders: 'Content-Type, Authorization',
  credentials: true,
});

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Recomendaciones')
    .setDescription('Documentación de la API de recomendaciones')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // la ruta será /api

  await app.listen(3001);
  console.log('Servidor corriendo en http://localhost:3000');
  console.log('Swagger disponible en http://localhost:3000/api');
}

// eslint-disable-next-line @typescript-eslint/no-floating-promises
bootstrap();
