/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }

  @Post('register')
  async register(@Body() body: RegisterUserDto) {
    return this.authService.register(body);
  }
}
