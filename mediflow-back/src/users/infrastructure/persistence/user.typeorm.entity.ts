import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, Unique } from 'typeorm';

@Entity('users')
@Unique(['email'])
export class UserOrmEntity {
  @PrimaryGeneratedColumn() id!: number;
  @Column() email!: string;
  @Column() passwordHash!: string;
  @Column({ length: 16, default: 'PATIENT' }) role!: string;
  @CreateDateColumn() createdAt!: Date;
}
