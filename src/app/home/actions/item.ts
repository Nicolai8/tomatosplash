import { Item } from '../../../../models/item.model';
import { ExtendedAction } from '../../core/actions/action';

export enum ItemActionTypes {
  GetItems = '[Item] GetItems',
  GetItemsSuccess = '[Item] GetItemsSuccess',
  GetItemsError = '[Item] GetItemsError',
  AddItem = '[Item] AddItem',
  AddItemSuccess = '[Item] AddItemSuccess',
  AddItemError = '[Item] AddItemError',
  EditItem = '[Item] EditItem',
  EditItemSuccess = '[Item] EditItemSuccess',
  EditItemError = '[Item] EditItemError',
  RemoveItem = '[Item] RemoveItem',
  RemoveItemSuccess = '[Item] RemoveItemSuccess',
  RemoveItemError = '[Item] RemoveItemError',
}

export class GetItems implements ExtendedAction {
  readonly type = ItemActionTypes.GetItems;
}

export class GetItemsSuccess implements ExtendedAction {
  readonly type = ItemActionTypes.GetItemsSuccess;

  constructor(public items: Item[]) {
  }
}

export class GetItemsError implements ExtendedAction {
  readonly type = ItemActionTypes.GetItemsError;
}

export class AddItem implements ExtendedAction {
  readonly type = ItemActionTypes.AddItem;

  constructor(public item: Item) {
  }
}

export class AddItemSuccess implements ExtendedAction {
  readonly type = ItemActionTypes.AddItemSuccess;

  constructor(public item: Item) {
  }
}

export class AddItemError implements ExtendedAction {
  readonly type = ItemActionTypes.AddItemError;
}

export class EditItem implements ExtendedAction {
  readonly type = ItemActionTypes.EditItem;

  constructor(public id: string, public item: Item) {
  }
}

export class EditItemSuccess implements ExtendedAction {
  readonly type = ItemActionTypes.EditItemSuccess;

  constructor(public item: Item) {
  }
}

export class EditItemError implements ExtendedAction {
  readonly type = ItemActionTypes.EditItemError;
}

export class RemoveItem implements ExtendedAction {
  readonly type = ItemActionTypes.RemoveItem;

  constructor(public id: string) {
  }
}

export class RemoveItemSuccess implements ExtendedAction {
  readonly type = ItemActionTypes.RemoveItemSuccess;

  constructor(public id: string) {
  }
}

export class RemoveItemError implements ExtendedAction {
  readonly type = ItemActionTypes.RemoveItemError;
}
