import { Inject, Injectable } from '@nestjs/common';
import type { EmailRepositoryPort } from '../../../domain/emails/email.repository.port'; // 👈 importante
import { EmailEntity } from '../../../domain/emails/email.entity';

@Injectable()
export class SendEmailUseCase {
  constructor(
    @Inject('EmailRepositoryPort')
    private readonly emailRepository: EmailRepositoryPort,
  ) {}

  async execute(email: EmailEntity): Promise<void> {
    await this.emailRepository.send(email);
  }
}
