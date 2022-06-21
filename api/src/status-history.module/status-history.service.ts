import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StatusHistory, StatusHistoryDocument } from './status-history.schema';

@Injectable()
export class StatusHistoryService {
  constructor(
    @InjectModel(StatusHistory.name)
    private statusHistoryModel: Model<StatusHistoryDocument>,
  ) {}

  async findHistoriesOrder(
    getHistoriesDto: any,
  ): Promise<StatusHistory[] | Error> {
    try {
      const { id } = getHistoriesDto;

      const result = await this.statusHistoryModel
        .find()
        .where('order._id')
        .sort({ created_at: -1 })
        .equals(id)
        .exec();

      return result;
    } catch (error) {
      return error;
    }
  }
}
