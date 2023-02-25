import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './user.schema';

export type QRCodeDocument = UserQRCode & Document;

@Schema()
export class UserQRCode {
  @Prop()
  name: string;
  @Prop()
  data: string;
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  createdBy: User;
}

export const QRCodeSchema = SchemaFactory.createForClass(UserQRCode);
