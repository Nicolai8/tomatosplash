import { Item } from './item.model';

export enum OrderType {
  NEW = 'NEW',
  PROCESSED = 'PROCESSED',
}

export class ItemInOrder {
  count: number;
  itemId?: string;
  // obtained from API: might be an Id or object itself
  _item?: string | Item;
  total?: string;

  constructor(init: any) {
    if (init) {
      this.count = init.count;
      this.itemId = typeof init._item === 'string' ? init._item : init._item._id;
      this._item = init._item;
    }
  }
}

export class Order {
  _id?: string;
  type: OrderType;
  processedOrderItems: string[];
  created: Date;
  updated: Date;
  processed?: Date;
  items: ItemInOrder[] = [];

  constructor(init?: any) {
    if (init) {
      this._id = init._id;
      this.type = init.type;
      this.processedOrderItems = init.processedOrderItems;
      this.created = init.created;
      this.updated = init.updated;
      this.processed = init.processed;
      this.items = init.items.map((item) => new ItemInOrder(item));
    }
  }
}

export interface OrderToPrint {
  order: Order;
  total: number;
  orderProcessedDate: string;
}
