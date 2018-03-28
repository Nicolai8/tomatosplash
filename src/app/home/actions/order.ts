import { Order } from '../../../../models/order.model';
import { ExtendedAction } from '../../shared/actions/action';
import { PagerData } from '../../../../models/pagination.model';

export enum OrderActionTypes {
  GetOrders = '[Order] GetOrders',
  GetOrdersSuccess = '[Order] GetOrdersSuccess',
  GetOrdersError = '[Order] GetOrdersError',
  AddOrder = '[Order] AddOrder',
  AddOrderSuccess = '[Order] AddOrderSuccess',
  AddOrderError = '[Order] AddOrderError',
  EditOrder = '[Order] EditOrder',
  EditOrderSuccess = '[Order] EditOrderSuccess',
  EditOrderError = '[Order] EditOrderError',
  RemoveOrder = '[Order] RemoveOrder',
  RemoveOrderSuccess = '[Order] RemoveOrderSuccess',
  RemoveOrderError = '[Order] RemoveOrderError',
}

export class GetOrders implements ExtendedAction {
  readonly type = OrderActionTypes.GetOrders;

  constructor(public pager: PagerData) {
  }
}

export class GetOrdersSuccess implements ExtendedAction {
  readonly type = OrderActionTypes.GetOrdersSuccess;

  constructor(public orders: Order[], public pager: PagerData) {
  }
}

export class GetOrdersError implements ExtendedAction {
  readonly type = OrderActionTypes.GetOrdersError;
}

export class AddOrder implements ExtendedAction {
  readonly type = OrderActionTypes.AddOrder;

  constructor(public order: Order) {
  }
}

export class AddOrderSuccess implements ExtendedAction {
  readonly type = OrderActionTypes.AddOrderSuccess;

  constructor(public order: Order) {
  }
}

export class AddOrderError implements ExtendedAction {
  readonly type = OrderActionTypes.AddOrderError;
}

export class EditOrder implements ExtendedAction {
  readonly type = OrderActionTypes.EditOrder;

  constructor(public id: string, public order: Order) {
  }
}

export class EditOrderSuccess implements ExtendedAction {
  readonly type = OrderActionTypes.EditOrderSuccess;

  constructor(public order: Order) {
  }
}

export class EditOrderError implements ExtendedAction {
  readonly type = OrderActionTypes.EditOrderError;
}

export class RemoveOrder implements ExtendedAction {
  readonly type = OrderActionTypes.RemoveOrder;

  constructor(public id: string) {
  }
}

export class RemoveOrderSuccess implements ExtendedAction {
  readonly type = OrderActionTypes.RemoveOrderSuccess;

  constructor(public id: string) {
  }
}

export class RemoveOrderError implements ExtendedAction {
  readonly type = OrderActionTypes.RemoveOrderError;
}
