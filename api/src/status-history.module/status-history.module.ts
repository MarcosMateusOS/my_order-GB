import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatusModules } from 'src/status.module/status.module';
import { StatusHistory, StatusHistorySchema } from './status-history.schema';
import { StatusHistoryController } from './status-history.controller';
import { StatusHistoryService } from './status-history.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: StatusHistory.name, schema: StatusHistorySchema },
    ]),
  ],
  controllers: [StatusHistoryController],
  providers: [StatusHistoryService],
})
export class StatusHistoryModule {}
