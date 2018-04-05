import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  AddItem, AddItemError, AddItemSuccess,
  EditItem, EditItemError, EditItemSuccess,
  GetItems,
  GetItemsError,
  GetItemsSuccess,
  ItemActionTypes,
  RemoveItem, RemoveItemError, RemoveItemSuccess
} from '../actions/item';
import { ItemsService } from '../../shared/services/items.service';
import { Item } from '../../../../models/item.model';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { ShowNotification } from '../../shared/actions/layout';

@Injectable()
export class ItemEffects {
  @Effect()
  getItems$ = this.actions$
    .ofType(ItemActionTypes.GetItems)
    .mergeMap(() =>
      this.itemsService.get().pipe(
        map((items: Item[]) => new GetItemsSuccess(items)),
        catchError(() => of(new GetItemsError()))
      )
    );

  @Effect()
  addItem$ = this.actions$
    .ofType(ItemActionTypes.AddItem)
    .mergeMap((action: AddItem) =>
      this.itemsService.add(action.item).pipe(
        mergeMap((item: Item) => [
          new AddItemSuccess(item),
          new ShowNotification('MESSAGES.ADD_ITEM_SUCCESS'),
        ]),
        catchError(() => of(new AddItemError()))
      )
    );

  @Effect()
  removeItem$ = this.actions$
    .ofType(ItemActionTypes.RemoveItem)
    .mergeMap((action: RemoveItem) =>
      this.itemsService.remove(action.id).pipe(
        mergeMap((id) => [
          new RemoveItemSuccess(id),
          new ShowNotification('MESSAGES.REMOVE_ITEM_SUCCESS'),
          new GetItems(),
        ]),
        catchError(() => of(new RemoveItemError()))
      )
    );

  @Effect()
  editItem$ = this.actions$
    .ofType(ItemActionTypes.EditItem)
    .mergeMap((action: EditItem) =>
      this.itemsService.edit(action.id, action.item).pipe(
        mergeMap((item: Item) => [
          new EditItemSuccess(item),
          new ShowNotification('MESSAGES.EDIT_ITEM_SUCCESS'),
        ]),
        catchError(() => of(new EditItemError()))
      )
    );

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
  ) {
  }
}
