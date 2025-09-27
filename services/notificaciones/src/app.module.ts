import { Module } from '@nestjs/common';
import { EmailsController } from './interface/http/emails.controller';
import { SendEmailUseCase } from './core/application/emails/usecases/send-email.usecase';
import { NodemailerEmailRepository } from './infrastructure/emails/nodemailer-email.repository';
import { UserCreatedConsumer } from './interface/messaging/consumers/user-created.consumer';

@Module({
  imports: [],
  controllers: [EmailsController,UserCreatedConsumer],
  providers: [
    SendEmailUseCase,
    {
      provide: 'EmailRepositoryPort',      // token de inyección
      useClass: NodemailerEmailRepository, // implementación concreta
    },
  ],
})
export class AppModule {}
