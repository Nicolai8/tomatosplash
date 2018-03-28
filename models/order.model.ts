export enum OrderType {
  NEW = 'NEW',
  PROCESSED = 'PROCESSED',
}

export interface ItemInOrder {
  count: number;
  itemId: string;
}

export interface Order {
  _id?: string;
  type: OrderType;
  processedOrderItems: string[];
  created: Date;
  processed: Date;
  items: ItemInOrder[];
}
