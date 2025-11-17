import { UserRepositoryPort } from '@/users/ports/user.repository.port';
import { PasswordHasherPort } from '../../../auth/domain/ports/password-hasher.port';

import { User } from '../../domain/entities/user.domain';
import { CreateUserDto } from '../dtos/create-user.dto';

export class CreateUserUseCase {
  constructor(
    private readonly users: UserRepositoryPort,
    private readonly hasher: PasswordHasherPort,
  ) {}

  async execute(input: CreateUserDto) {
    const exists = await this.users.existsByEmail(input.email);
    if (exists) throw new Error('Email already exists');
    const hash = await this.hasher.hash(input.password);
    const user = new User(null, input.email, hash, input.role ?? 'PATIENT');
    const saved = await this.users.save(user);
    return { id: saved.id, email: saved.email, role: saved.role };
  }
}
