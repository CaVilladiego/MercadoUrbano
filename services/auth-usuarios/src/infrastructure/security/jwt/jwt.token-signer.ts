import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenSignerPort } from '@domain/security/token-signer.port';

@Injectable()
export class JwtTokenSigner implements TokenSignerPort {
  constructor(private readonly jwt: JwtService) { }

  async sign(payload: Record<string, any>, opts?: { expiresIn?: number }): Promise<string> {
  
  const normalizedPayload = {
    sub: payload.id,
    email: payload.email,
    Rol: payload.Rol, 
  };

  return this.jwt.signAsync(normalizedPayload, {
    secret: String(process.env.JWT_SECRET || 'changeme'),
    expiresIn: opts?.expiresIn ?? Number(process.env.JWT_EXPIRES_IN ?? 3600),
  });
}

}
