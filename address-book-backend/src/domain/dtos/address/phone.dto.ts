import { IsString } from 'class-validator';

export class Phone {
  @IsString()
  countryCode: string;
  @IsString()
  number: string;
}
