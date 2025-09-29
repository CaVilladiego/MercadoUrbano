import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API de Recomendaciones')
    .setDescription('Documentación de la API de recomendaciones')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // la ruta será /api

  await app.listen(3001);
  console.log('Servidor corriendo en http://localhost:3001');
  console.log('Swagger disponible en http://localhost:3001/api');
}

bootstrap();
