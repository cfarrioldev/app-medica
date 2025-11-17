export type JwtPayload = { sub: number; email: string; role: string };

export abstract class JwtTokenPort {
  abstract sign(payload: JwtPayload, expiresIn?: string): string;
  abstract verify(token: string): JwtPayload;
}