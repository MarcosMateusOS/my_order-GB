import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { GetOrdersFilterDto } from './dto/get-orders-filters.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order } from './order.schema';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('orders')
  async store(
    @Body() orderDto: OrderCreateDto,
  ): Promise<HttpException | Order> {
    try {
      const result = await this.orderService.store(orderDto);

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

  @Get('orders')
  async list(
    @Query() filterDto: GetOrdersFilterDto,
  ): Promise<Order[] | HttpException> {
    try {
      const result = await this.orderService.getOrders(filterDto);

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

  @Put('/orders/:id')
  async updateStatus(
    @Param('id') id: string,
    @Body() data: { status: string },
  ): Promise<any | HttpException> {
    try {
      const { status } = data;
      const result = this.orderService.updateStatus({
        order: id,
        status: status,
      });
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
