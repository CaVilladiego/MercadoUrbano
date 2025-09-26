import { EmailEntity } from './email.entity';

export interface EmailRepositoryPort {
  send(email: EmailEntity): Promise<void>;
}
