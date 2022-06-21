import { IStatus } from "./status.interface";

export interface IOrder {
  _id: string;
  product: string;
  value: string;
  date_order: string;
  status: IStatus;
}
