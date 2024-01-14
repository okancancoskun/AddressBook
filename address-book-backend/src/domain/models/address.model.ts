import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { HydratedDocument, Types, Schema as Sch } from 'mongoose';
import { User } from './user.model';

export type AddressDocument = HydratedDocument<Address>;

@Schema({ versionKey: false, timestamps: true })
export class Address {
  _id: Types.ObjectId;

  @Prop(String)
  name: string;

  @Prop(String)
  surname: string;

  @Prop(String)
  email: string;

  @Prop(raw({ countryCode: { type: String }, number: { type: String } }))
  phone?: {
    countryCode: string;
    number: string;
  };

  @Prop({ type: Sch.Types.ObjectId, ref: User.name })
  userId: User;
}

export const AddressSchema = SchemaFactory.createForClass(Address);

AddressSchema.index({ email: 1, phone: 1, userId: 1 }, { unique: true });
