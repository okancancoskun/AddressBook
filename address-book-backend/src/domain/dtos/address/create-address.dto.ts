import { Type } from 'class-transformer';
import { IsEmail, IsObject, IsString, ValidateNested } from 'class-validator';
import { Phone } from './phone.dto';

export class CreateAddressDto {
  @IsString()
  name: string;

  @IsString()
  surname: string;

  @IsEmail()
  email: string;

  @ValidateNested()
  @IsObject()
  @Type(() => Phone)
  phone: Phone;
}
