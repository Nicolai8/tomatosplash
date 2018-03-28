import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AddOrder, EditOrder, GetOrders, OrderActionTypes, RemoveOrder } from '../actions/order';
import { OrdersService } from '../services/orders.service';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../reducers';

@Injectable()
export class OrderEffects {
  @Effect({ dispatch: false })
  getOrders$ = this.actions$
    .ofType(OrderActionTypes.GetOrders)
    .map((action: GetOrders) => {
      this.ordersService.get(action.pager.page, action.pager.limit);
      return null;
    });

  @Effect({ dispatch: false })
  addOrder$ = this.actions$
    .ofType(OrderActionTypes.AddOrder)
    .map((action: AddOrder) => {
      this.ordersService.add(action.order);
      return null;
    });

  @Effect({ dispatch: false })
  removeOrder$ = this.actions$
    .ofType(OrderActionTypes.RemoveOrder)
    .map((action: RemoveOrder) => {
      this.ordersService.remove(action.id);
      return null;
    });

  @Effect()
  removeOrderSuccess$ = this.actions$
    .ofType(OrderActionTypes.RemoveOrderSuccess)
    .withLatestFrom(this.store$.pipe(select(fromHome.getOrdersPager)))
    .map(([ action, pagerData ]) => {
      if (pagerData.thisPageLength - 1 <= 0 && pagerData.page !== 0) {
        pagerData.page--;
      }
      return new GetOrders(pagerData);
    });

  @Effect({ dispatch: false })
  editOrder$ = this.actions$
    .ofType(OrderActionTypes.EditOrder)
    .map((action: EditOrder) => {
      this.ordersService.edit(action.id, action.order);
      return null;
    });

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private store$: Store<fromHome.State>,
  ) {
  }
}
