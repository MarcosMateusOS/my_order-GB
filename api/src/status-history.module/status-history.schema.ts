import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Type } from 'class-transformer';
import { Document } from 'mongoose';
import { Order } from 'src/order.module/order.schema';
import { Status } from 'src/status.module/status.schema';

export type StatusHistoryDocument = StatusHistory & Document;

@Schema()
export class StatusHistory {
  @Prop({ type: Status })
  @Type(() => Status)
  status: Status;

  @Prop({ type: Order })
  @Type(() => Order)
  order: Order;

  @Prop({ type: Date, default: Date.now })
  created_at: Date;

  @Prop({ type: Date, default: Date.now })
  updated_at: Date;
}

export const StatusHistorySchema = SchemaFactory.createForClass(StatusHistory);
