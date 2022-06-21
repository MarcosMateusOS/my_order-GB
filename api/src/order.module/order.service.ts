import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  StatusHistory,
  StatusHistoryDocument,
} from 'src/status-history.module/status-history.schema';
import { Status, StatusDocument } from 'src/status.module/status.schema';
import { GetOrdersFilterDto } from './dto/get-orders-filters.dto';
import { OrderCreateDto } from './dto/order-create.dto';
import { Order, OrderDocument } from './order.schema';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel(Order.name)
    private orderModel: Model<OrderDocument>,
    @InjectModel(Status.name)
    private statusModel: Model<StatusDocument>,
    @InjectModel(StatusHistory.name)
    private statusHistoryModel: Model<StatusHistoryDocument>,
  ) {}

  async store(orderCreateDto: OrderCreateDto): Promise<Order | Error> {
    try {
      const { value, product, status } = orderCreateDto;

      /**Busca o status do pedido */
      const searchStatus = await this.statusModel.findById(status);
      if (searchStatus === null) {
        throw new Error('Status não encontrado');
      }
      /**Cria o pedido */
      const createdOrder = new this.orderModel({
        product: product,
        value: Number(value),
        status: searchStatus,
      });

      const orderSave = await createdOrder.save();

      /**Salva o status no historico do pedido */
      const createHistory = new this.statusHistoryModel({
        status: searchStatus,
        order: orderSave,
      });
      createHistory;
      createHistory.save();

      return orderSave;
    } catch (error) {
      return error;
    }
  }

  async getOrders(filterDto: GetOrdersFilterDto): Promise<Order[] | Error> {
    try {
      const { value, status, order_by } = filterDto;

      const query = this.orderModel.find();

      if (status) {
        query.where('status._id').equals(status);
      }

      if (value) {
        query.where('value').equals(value);
      }

      if (order_by) {
        query.sort(order_by);
      }

      const result = await query.exec();

      return result;
    } catch (error) {
      return error;
    }
  }

  async updateStatus(orderStoreDto: any): Promise<true | Error> {
    try {
      const { order, status } = orderStoreDto;

      /**Busca o status do pedido */
      const searchStatus = await this.statusModel.findById(status);

      const orderUpdt = await this.orderModel.findById(order);
      searchStatus;
      await orderUpdt.updateOne({ status: searchStatus });

      const createHistory = new this.statusHistoryModel({
        status: searchStatus,
        order: orderUpdt,
      });
      createHistory;
      createHistory.save();

      return true;
    } catch (error) {
      return error;
    }
  }
}
