import { IOrder } from "./ orders.interface";
import { IStatus } from "./status.interface";

export interface IStatusHistory {
  order: IOrder;
  status: IStatus;
  created_at: string;
}
