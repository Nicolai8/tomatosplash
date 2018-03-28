import { Item } from './item.model';

export enum OrderType {
  NEW = 'NEW',
  PROCESSED = 'PROCESSED',
}

export interface Order {
  _id?: string;
  type: OrderType;
  processedOrderItems: string[];
  created: Date;
  processed: Date;
  _items: string | Item;
}
