import { Injectable } from '@nestjs/common';
import { TokenSignerPort } from '@domain/security/token-signer.port';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtTokenSigner implements TokenSignerPort {
  constructor(private readonly jwt: JwtService) {}

  async sign(
    payload: Record<string, any>,
    opts?: { expiresIn?: string | number }
  ): Promise<string> {
    const fromEnv = (process.env.JWT_EXPIRES_IN || '').trim();
    const expiresIn =
      opts?.expiresIn && String(opts.expiresIn).trim() !== ''
        ? opts.expiresIn
        : fromEnv && fromEnv !== ''
        ? fromEnv
        : '1h';

    return this.jwt.signAsync(payload, {
      secret: (process.env.JWT_SECRET || 'changeme').trim(),
      expiresIn,
    });
  }
}
