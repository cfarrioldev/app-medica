import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { User } from '../../domain/entities/user.domain';
import { UserOrmEntity } from './user.typeorm.entity';
import { UserRepositoryPort } from '@/users/ports/user.repository.port';

@Injectable()
export class UserTypeormRepository implements UserRepositoryPort {
  constructor(@InjectRepository(UserOrmEntity) private repo: Repository<UserOrmEntity>) {}

  private toDomain(e: UserOrmEntity): User {
    return new User(e.id, e.email, e.passwordHash, e.role as any, e.createdAt);
  }
  private toOrm(u: User): UserOrmEntity {
    return Object.assign(new UserOrmEntity(), {
      id: u.id ?? undefined, email: u.email, passwordHash: u.passwordHash, role: u.role,
    });
  }

  async findByEmail(email: string) {
    const e = await this.repo.findOne({ where: { email } });
    return e ? this.toDomain(e) : null;
  }
  async existsByEmail(email: string) {
    const count = await this.repo.count({ where: { email } });
    return count > 0;
  }
  async save(user: User) {
    const saved = await this.repo.save(this.toOrm(user));
    return this.toDomain(saved);
  }
  async findById(id: number) {
    const e = await this.repo.findOne({ where: { id } });
    return e ? this.toDomain(e) : null;
  }
}
