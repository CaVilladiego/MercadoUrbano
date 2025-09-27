import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { SendEmailUseCase } from '../../../core/application/emails/usecases/send-email.usecase';

@Controller()
export class UserCreatedConsumer {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @EventPattern('user.created')
  async handleUserCreated(@Payload() data: any) {
    await this.sendEmailUseCase.execute({
      to: data.email,
      subject: 'Bienvenido a MercadoUrbano',
      body: `<p>Hola ${data.name}, tu cuenta fue creada exitosamente.</p>`,
    });
  }
}
