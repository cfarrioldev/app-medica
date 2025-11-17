
import { JwtTokenPort } from '@/auth/domain/ports/jwt-token.port';
import { LoginDto } from '../dtos/login.dto';
import { PasswordHasherPort } from '@/auth/domain/ports/password-hasher.port';
import { UserRepositoryPort } from '@/users/ports/user.repository.port';

export class LoginUseCase {
  constructor(
    private readonly users: UserRepositoryPort,
    private readonly hasher: PasswordHasherPort,
    private readonly jwt: JwtTokenPort,
  ) {}

  async execute(input: LoginDto) {
    const user = await this.users.findByEmail(input.email);
    if (!user) throw new Error('Invalid credentials');

    const ok = await this.hasher.compare(input.password, user.passwordHash);
    if (!ok) throw new Error('Invalid credentials');

    const accessToken = this.jwt.sign({ sub: user.id!, email: user.email, role: user.role }, '1h');
    return { accessToken };
  }
}
