import { Injectable } from '@nestjs/common';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { TokenSignerPort } from '@domain/security/token-signer.port';

@Injectable()
export class JwtTokenSigner implements TokenSignerPort {
  constructor(private readonly jwt: JwtService) {}

  async sign(
    payload: Record<string, any>,
    opts?: { expiresIn?: string | number }
  ): Promise<string> {
    const fromEnv = process.env.JWT_EXPIRES_IN?.trim();

    // Convertimos siempre a número
    const parsedExpires =
      opts?.expiresIn !== undefined
        ? Number(opts.expiresIn)
        : fromEnv
        ? Number(fromEnv)
        : 3600; // = 1h

    const options: JwtSignOptions = {
      secret: String(process.env.JWT_SECRET || 'changeme'),
      expiresIn: parsedExpires,
    };

    return this.jwt.signAsync(payload, options);
  }
}
