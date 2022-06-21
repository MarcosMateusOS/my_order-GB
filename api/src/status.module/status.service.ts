import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Status, StatusDocument } from './status.schema';

@Injectable()
export class StatusService {
  constructor(
    @InjectModel(Status.name)
    private StatusModel: Model<StatusDocument>,
  ) {}

  async store(StatusStoreDto: any): Promise<Status | Error> {
    try {
      const createdStatus = new this.StatusModel(StatusStoreDto);
      return createdStatus.save();
    } catch (error) {
      return error;
    }
  }

  async list(): Promise<Status[] | Error> {
    try {
      return this.StatusModel.find().exec();
    } catch (error) {
      return error;
    }
  }
}
