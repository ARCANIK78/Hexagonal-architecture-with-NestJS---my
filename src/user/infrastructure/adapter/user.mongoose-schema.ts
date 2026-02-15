import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class UserMongooseDoc extends Document {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop()
  createAt: Date;

  @Prop()
  updateAt: Date;
}

export const UserMongooseSchema = SchemaFactory.createForClass(UserMongooseDoc);
