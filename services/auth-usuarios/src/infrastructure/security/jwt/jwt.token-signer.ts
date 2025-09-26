import { Injectable } from '@nestjs/common';
import { TokenSignerPort } from '@domain/security/token-signer.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenSigner implements TokenSignerPort {
  constructor(private readonly jwt: JwtService) {}
  async sign(payload: Record<string, any>, opts?: { expiresIn?: string | number }): Promise<string> {
    return this.jwt.signAsync(payload, { expiresIn: opts?.expiresIn });
  }
}
