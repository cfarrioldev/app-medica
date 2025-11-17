import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserOrmEntity } from './infrastructure/persistence/user.typeorm.entity';
import { UserTypeormRepository } from './infrastructure/persistence/user.typeorm.repository';
import { UserRepositoryPort } from './ports/user.repository.port';


@Module({
  imports: [TypeOrmModule.forFeature([UserOrmEntity])],
  providers: [{ provide: UserRepositoryPort, useClass: UserTypeormRepository }],
  exports: [UserRepositoryPort, TypeOrmModule],
})
export class UsersModule {}
