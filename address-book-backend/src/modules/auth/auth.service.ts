import {
  BadRequestException,
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { UserService } from '../user';
import { LoginUserDto, RegisterUserDto } from 'src/domain/dtos';
import { GenericResult, LoginResult } from 'src/domain/types';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly configService: ConfigService,
  ) {}

  async register(
    dto: RegisterUserDto,
  ): Promise<GenericResult<{ email: string; name: string; surname: string }>> {
    const user = await this.userService.findOne({ email: dto.email });
    if (user) throw new ConflictException('User Already Exist');
    if (dto.password !== dto.repeatPassword)
      throw new BadRequestException('Passwords are not matched');
    delete dto.repeatPassword;
    try {
      const { email, name, surname } = await this.userService.create(dto);
      return {
        isSuccess: true,
        data: { email, name, surname },
      };
    } catch (error) {
      throw new InternalServerErrorException('Error while Create user');
    }
  }

  async login({ email, password }: LoginUserDto): Promise<LoginResult> {
    const user = await this.userService.findOne({ email });
    if (!user) throw new NotFoundException('User does not exist');
    const isSuccess = await compare(password, user.password);
    if (!isSuccess) throw new BadRequestException('Password is not correct');
    const token: string = sign(
      {
        _id: user._id,
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
      this.configService.get('JWT_SECRET'),
      { expiresIn: '200h' },
    );
    return {
      access_token: token,
      user: {
        email: user.email,
        name: user.name,
        surname: user.surname,
      },
    };
  }
}
