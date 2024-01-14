import { MongooseModule } from '@nestjs/mongoose';
import { AddressController } from './address.controller';
import { AddressService } from './address.service';
import { Module } from '@nestjs/common';
import { Address, AddressSchema } from 'src/domain/models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Address.name, schema: AddressSchema }]),
  ],
  controllers: [AddressController],
  providers: [AddressService],
})
export class AddressModule {}
