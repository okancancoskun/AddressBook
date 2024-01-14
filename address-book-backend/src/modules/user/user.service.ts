import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { GenericService } from 'src/domain/generics';
import { User } from 'src/domain/models';

@Injectable()
export class UserService extends GenericService<User> {
  constructor(@InjectModel(User.name) userModel: Model<User>) {
    super(userModel);
  }
}
