import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import { EmailRepositoryPort } from '../../core/domain/emails/email.repository.port';
import { EmailEntity } from '../../core/domain/emails/email.entity';

@Injectable()
export class NodemailerEmailRepository implements EmailRepositoryPort {
  private transporter: nodemailer.Transporter;

  constructor() {
    console.log('SMTP_HOST:', process.env.SMTP_HOST);
    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT || '587'),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,    
        pass: process.env.SMTP_PASS,  
      },
    });
  }

  async send(email: EmailEntity): Promise<void> {
    await this.transporter.sendMail({
      from: email.from || process.env.EMAIL_FROM,
      to: email.to,
      subject: email.subject,
      html: email.body,
    });
  }
}
