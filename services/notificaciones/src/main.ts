import * as dotenv from 'dotenv';
dotenv.config();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Prefijo global de la API
  app.setGlobalPrefix('api');

  // Inicio de Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('Notificaciones API')
    .setDescription('Microservicio de notificaciones por email, push o WhatsApp')
    .setVersion('1.0')
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  // Fin de Configuración de Swagger

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@localhost:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: true },
    },
  });

  const port = parseInt(process.env.PORT || '3002', 10);
  await app.listen(port);

  console.log(`notificaciones listo en http://localhost:${port}/api`);
  console.log(`Swagger disponible en http://localhost:${port}/api/docs`);
}
bootstrap();
