import { INestApplication, Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      log: ['query', 'info', 'warn', 'error'],
      errorFormat: 'colorless',
    });
  }

  async onModuleInit() {
    try {
      console.log('Conectando a la base de datos...');
      console.log('URL:', process.env.DATABASE_URL);
      await this.$connect();
      console.log('Conexión a la base de datos exitosa!');
    } catch (error) {
      console.error('Error de conexión a la base de datos:', error);
      throw error;
    }
  }

  async enableShutdownHooks(app: INestApplication) {
    (this as any).$on('beforeExit', async () => {
      await app.close();
    });
  }
}