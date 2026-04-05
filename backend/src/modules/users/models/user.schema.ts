import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import * as bcrypt from 'bcrypt';

@Schema({ timestamps: true })
export class User {
  @Prop({
    type: String,
    required: [true, 'Email address is required'],
    unique: true,
  })
  email: string;

  @Prop({
    type: String,
    required: [true, 'Username address is required'],
    unique: true,
  })
  username: string;

  @Prop({
    type: String,
    required: [true, 'Email address is required'],
  })
  password: string;

  // createdAT: Date;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next: any) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});
