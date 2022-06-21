import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { identity } from 'rxjs';
import { StatusHistory } from './status-history.schema';
import { StatusHistoryService } from './status-history.service';

@Controller()
export class StatusHistoryController {
  constructor(private readonly statusHistoryService: StatusHistoryService) {}

  @Get('/histories/:id')
  async list(
    @Param('id') id: string,
  ): Promise<StatusHistory[] | HttpException> {
    try {
      const result = await this.statusHistoryService.findHistoriesOrder({ id });
      if (result instanceof Error) {
        throw new Error(result.message);
      }

      return result;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
