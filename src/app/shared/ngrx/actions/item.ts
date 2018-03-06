import { Item } from '../../models/item.model';
import { ExtendedAction } from './action';

export enum ItemActionTypes {
  GetItems = '[Item] GetItems',
  GetItemsSuccess = '[Item] GetItemsSuccess',
  AddItem = '[Item] AddItem',
  AddItemSuccess = '[Item] AddItemSuccess',
  EditItem = '[Item] EditItem',
  EditItemSuccess = '[Item] EditItemSuccess',
  RemoveItem = '[Item] RemoveItem',
  RemoveItemSuccess = '[Item] RemoveItemSuccess',
}

export class GetItems implements ExtendedAction {
  readonly type = ItemActionTypes.GetItems;
}

export class GetItemsSuccess implements ExtendedAction {
  readonly type = ItemActionTypes.GetItemsSuccess;

  constructor(public items: Item[]) {
  }
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
