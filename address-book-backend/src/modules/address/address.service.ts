import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/domain/generics';
import { Address } from 'src/domain/models';

@Injectable()
export class AddressService extends GenericService<Address> {
  constructor(@InjectModel(Address.name) addressModel: Model<Address>) {
    super(addressModel);
  }
}
