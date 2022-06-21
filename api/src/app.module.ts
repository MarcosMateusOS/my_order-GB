import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { OrderModules } from './order.module/order.module';
import { StatusModules } from './status.module/status.module';
import { StatusHistoryModule } from './status-history.module/status-history.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [`.env.${process.env.NODE_ENV}`],
    }),
    MongooseModule.forRoot(
      `mongodb+srv://${process.env.MONGOOSE_USER}:${process.env.MONGOOSE_PASSWORD}@${process.env.MONGOOSE_URL}`,
    ),
    OrderModules,
    StatusModules,
    StatusHistoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
