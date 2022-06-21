import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  StatusHistory,
  StatusHistorySchema,
} from 'src/status-history.module/status-history.schema';
import { StatusModules } from 'src/status.module/status.module';
import { Status, StatusSchema } from 'src/status.module/status.schema';
import { OrderController } from './order.controller';
import { Order, OrderSchema } from './order.schema';
import { OrderService } from './order.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Order.name, schema: OrderSchema },
      { name: Status.name, schema: StatusSchema },
      { name: StatusHistory.name, schema: StatusHistorySchema },
    ]),
    StatusModules,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModules {}
