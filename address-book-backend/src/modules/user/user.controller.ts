/*
https://docs.nestjs.com/controllers#controllers
*/

import { Controller, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/tools';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/profile')
  public async getProfile(@User('_id') _id: string) {
    return this.userService.findOne({ _id }, '_id name surname email');
  }
}
