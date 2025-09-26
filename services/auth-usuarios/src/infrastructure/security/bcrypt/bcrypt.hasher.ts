import { Injectable } from '@nestjs/common';
import { PasswordHasherPort } from '@domain/security/password-hasher.port';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptHasher implements PasswordHasherPort {
  private readonly rounds = 10;

  async hash(plain: string): Promise<string> {
    return bcrypt.hash(plain, this.rounds);
  }

  async compare(plain: string, hash: string): Promise<boolean> {
    return bcrypt.compare(plain, hash);
  }
}
