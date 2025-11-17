import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './infrastructure/http/auth.controller';
import { BcryptAdapter } from './infrastructure/security/bcrypt.adapter';
import { JwtAdapter } from './infrastructure/security/jwt.adapter';
import { JwtAuthGuard } from './infrastructure/security/jwt-auth.guard';
import { LoginUseCase } from './application/use-cases/login.usecase';
import { RegisterUseCase } from './application/use-cases/register.usecase';
import { GetMeUseCase } from './application/use-cases/get-me.usecase';
import { UsersModule } from '../users/users.module';
import { PasswordHasherPort } from './domain/ports/password-hasher.port';
import { JwtTokenPort } from './domain/ports/jwt-token.port';

@Module({
  imports: [UsersModule, JwtModule.register({ secret: process.env.JWT_SECRET || 'dev-secret' })],
  controllers: [AuthController],
  providers: [
    // use-cases
    LoginUseCase, RegisterUseCase, GetMeUseCase,
    // adapters for ports
    { provide: PasswordHasherPort, useClass: BcryptAdapter },
    { provide: JwtTokenPort, useClass: JwtAdapter },
    JwtAuthGuard,
  ],
})
export class AuthModule {}
