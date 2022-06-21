import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Status } from 'src/status.module/status.schema';

export type OrderDocument = Order & Document;

@Schema()
export class Order {
  @Prop({ required: true, unique: false })
  product: string;

  @Prop({ required: true })
  value: number;

  @Prop({ type: Status })
  @Type(() => Status)
  status: Status;

  @Prop({ type: Date, default: Date.now })
  date_order: Date;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
