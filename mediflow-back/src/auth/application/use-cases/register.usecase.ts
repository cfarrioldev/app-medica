import { PasswordHasherPort } from '@/auth/domain/ports/password-hasher.port';


import { RegisterDto } from '../dtos/register.dto';
import { User } from '@/users/domain/entities/user.domain';
import { UserRepositoryPort } from '@/users/ports/user.repository.port';
import { Inject } from '@nestjs/common';


export class RegisterUseCase {
  constructor(
    @Inject(UserRepositoryPort) private readonly users: UserRepositoryPort,
    @Inject(PasswordHasherPort) private readonly hasher: PasswordHasherPort,
  ) {}

  async execute(input: RegisterDto) {
    const exists = await this.users.existsByEmail(input.email);
    if (exists) throw new Error('Email already exists');

    const hash = await this.hasher.hash(input.password);
    const user = new User(null, input.email, hash, input.role ?? 'PATIENT');
    const saved = await this.users.save(user);

    return { id: saved.id, email: saved.email, role: saved.role };
  }
}
