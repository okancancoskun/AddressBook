import { ConfigModule } from '@nestjs/config';
import { UserModule } from '../user';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [UserModule, ConfigModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
