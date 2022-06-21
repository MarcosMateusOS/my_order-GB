import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Res,
} from '@nestjs/common';
import { Status } from './status.schema';
import { StatusService } from './status.service';

@Controller()
export class StatusController {
  constructor(private readonly statusService: StatusService) {}

  @Post('status')
  async store(@Body() statusDto: any): Promise<Status | HttpException> {
    try {
      const result = await this.statusService.store(statusDto);

      if (result instanceof Error) {
        throw new Error('O correu um erro no cadastro de status de pedidos.');
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

  @Get('status')
  async list(): Promise<Status[] | HttpException> {
    try {
      const result = await this.statusService.list();
      if (result instanceof Error) {
        throw new Error('O correu um erro na lista status de pedidos.');
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
