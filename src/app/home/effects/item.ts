import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AddItem, EditItem, GetItems, ItemActionTypes, RemoveItem } from '../actions/item';
import { ItemsService } from '../services/items.service';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../reducers';
import { PagerData } from '../../../../models/pagination.model';

@Injectable()
export class ItemEffects {
  @Effect({ dispatch: false })
  getItems$ = this.actions$
    .ofType(ItemActionTypes.GetItems)
    .map((action: GetItems) => {
      this.itemsService.get(action.pager.page, action.pager.limit);
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
    .withLatestFrom(this.store$.pipe(select(fromHome.getPager)))
    .map(([ action, pagerData ]) => {
      if (pagerData.thisPageLength - 1 <= 0 && pagerData.page !== 0) {
        pagerData.page--;
      }
      return new GetItems(pagerData);
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
    private store$: Store<fromHome.State>,
  ) {
  }
}
