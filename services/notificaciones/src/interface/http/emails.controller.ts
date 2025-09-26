import { Body, Controller, Post } from '@nestjs/common';
import { SendEmailUseCase } from '../../core/application/emails/usecases/send-email.usecase';
import { EmailEntity } from '../../core/domain/emails/email.entity';

@Controller('emails')
export class EmailsController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Post('send')
  async sendEmail(
    @Body() body: { to: string; subject: string; body: string; from?: string },
  ): Promise<{ message: string }> {
    await this.sendEmailUseCase.execute(
      new EmailEntity(body.to, body.subject, body.body, body.from),
    );
    return { message: 'Correo mandado exitosamente' };
  }
}
