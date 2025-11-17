import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JwtTokenPort, JwtPayload } from '../../domain/ports/jwt-token.port';

@Injectable()
export class JwtAdapter implements JwtTokenPort {
  constructor(private readonly jwt: JwtService) {}
  sign(payload: JwtPayload, expiresIn = '1h'): string {
    return this.jwt.sign(payload, { expiresIn });
  }
  verify(token: string): JwtPayload {
    return this.jwt.verify(token);
  }
}
