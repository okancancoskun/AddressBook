import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { hash } from 'bcrypt';
import {
  CallbackWithoutResultAndOptionalError,
  HydratedDocument,
  Types,
} from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema({ versionKey: false })
export class User {
  _id: Types.ObjectId;

  @Prop({ type: String, unique: true })
  email: string;

  @Prop(String)
  name: string;

  @Prop(String)
  surname: string;

  @Prop({ type: String, minlength: 6 })
  password: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre(
  'save',
  async function (next: CallbackWithoutResultAndOptionalError): Promise<void> {
    if (!this.isModified('password')) {
      return next();
    } else {
      this.password = await hash(this.password, 8);
      return next();
    }
  },
);
