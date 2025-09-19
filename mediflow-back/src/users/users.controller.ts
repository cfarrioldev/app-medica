import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {

  }
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}