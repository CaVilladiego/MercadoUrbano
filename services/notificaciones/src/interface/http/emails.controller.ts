import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { SendEmailUseCase } from '../../core/application/emails/usecases/send-email.usecase';
import { EmailEntity } from '../../core/domain/emails/email.entity';
import { SendEmailDto } from '../../core/application/emails/dto/send-email.dto';

@ApiTags('Emails')
@Controller('emails')
export class EmailsController {
  constructor(private readonly sendEmailUseCase: SendEmailUseCase) {}

  @Post('send')
  @ApiOperation({ summary: 'Enviar un correo electrónico' })
  @ApiResponse({ status: 201, description: 'Correo enviado correctamente' })
  async sendEmail(@Body() dto: SendEmailDto): Promise<{ message: string }> {
    await this.sendEmailUseCase.execute(
      new EmailEntity(dto.to, dto.subject, dto.body),
    );
    return { message: 'Correo mandado exitosamente' };
  }
}
