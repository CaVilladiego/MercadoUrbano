import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Optional: set a global prefix for all endpoints
  app.setGlobalPrefix('api');

  // Swagger configuration
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Productos Catálogo API')
    .setDescription('API para la gestión de productos')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api/docs', app, document); // Swagger UI at /api/docs

  const port = 3004;
  await app.listen(port);

  console.log(`Productos Catálogo corriendo en http://localhost:${port}/api`);
  console.log(`Swagger disponible en http://localhost:${port}/api/docs`);
}

bootstrap();