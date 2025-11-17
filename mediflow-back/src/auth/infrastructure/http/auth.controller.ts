import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { LoginDto } from '../../application/dtos/login.dto';
import { RegisterDto } from '../../application/dtos/register.dto';
import { LoginUseCase } from '../../application/use-cases/login.usecase';
import { RegisterUseCase } from '../../application/use-cases/register.usecase';
import { GetMeUseCase } from '../../application/use-cases/get-me.usecase';
import { JwtAuthGuard } from '../security/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly loginUC: LoginUseCase,
    private readonly registerUC: RegisterUseCase,
    private readonly meUC: GetMeUseCase,
  ) {}

  @Post('register')
  register(@Body() dto: RegisterDto) {
    return this.registerUC.execute(dto);
  }

  @Post('login')
  login(@Body() dto: LoginDto) {
    return this.loginUC.execute(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  me(req: any) {
    return this.meUC.execute(req.user.id);
  }
}
