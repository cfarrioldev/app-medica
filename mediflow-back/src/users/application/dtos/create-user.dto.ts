import { IsEmail, IsString, MinLength, IsOptional, IsIn } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email!: string;

  @IsString()
  @MinLength(6)
  password!: string;

  @IsOptional()
  @IsIn(['PATIENT', 'DOCTOR', 'ADMIN'])
  role?: 'PATIENT' | 'DOCTOR' | 'ADMIN';
}
