import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AddItem, EditItem, GetItems, ItemActionTypes, RemoveItem } from '../actions/item';
import { ItemsService } from '../services/items.service';

@Injectable()
export class ItemEffects {
  @Effect({ dispatch: false })
  getItems$ = this.actions$
    .ofType(ItemActionTypes.GetItems)
    .map(() => {
      this.itemsService.get();
      return null;
    });

  @Effect({ dispatch: false })
  addItem$ = this.actions$
    .ofType(ItemActionTypes.AddItem)
    .map((action: AddItem) => {
      this.itemsService.add(action.item);
      return null;
    });

  @Effect({ dispatch: false })
  removeItem$ = this.actions$
    .ofType(ItemActionTypes.RemoveItem)
    .map((action: RemoveItem) => {
      this.itemsService.remove(action.id);
      return null;
    });

  @Effect()
  removeItemSuccess$ = this.actions$
    .ofType(ItemActionTypes.RemoveItemSuccess)
    .map(() => {
      return new GetItems();
    });

  @Effect({ dispatch: false })
  editItem$ = this.actions$
    .ofType(ItemActionTypes.EditItem)
    .map((action: EditItem) => {
      this.itemsService.edit(action.id, action.item);
      return null;
    });

  constructor(
    private actions$: Actions,
    private itemsService: ItemsService,
  ) {
  }
}
