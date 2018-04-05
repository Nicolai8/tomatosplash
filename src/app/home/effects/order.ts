import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import {
  AddOrder,
  AddOrderError,
  AddOrderSuccess,
  EditOrder,
  EditOrderError,
  EditOrderSuccess,
  GetOrders,
  GetOrdersError,
  GetOrdersSuccess,
  OrderActionTypes,
  ProceedOrder,
  ProceedOrderError,
  ProceedOrderSuccess,
  RemoveOrder,
  RemoveOrderError,
  RemoveOrderSuccess
} from '../actions/order';
import { OrdersService } from '../../shared/services/orders.service';
import { select, Store } from '@ngrx/store';
import * as fromHome from '../reducers';
import { Router } from '@angular/router';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { Order } from '../../../../models/order.model';
import { Pagination } from '../../../../models/pagination.model';
import { of } from 'rxjs/observable/of';
import { ShowNotification } from '../../shared/actions/layout';

@Injectable()
export class OrderEffects {
  @Effect()
  getOrders$ = this.actions$
    .ofType(OrderActionTypes.GetOrders)
    .mergeMap((action: GetOrders) =>
      this.ordersService.get(action.pager.page, action.pager.limit).pipe(
        map((data: Pagination<Order>) => new GetOrdersSuccess(data.docs.map((doc) => new Order(doc)), data)),
        catchError(() => of(new GetOrdersError()))
      )
    );

  @Effect()
  addOrder$ = this.actions$
    .ofType(OrderActionTypes.AddOrder)
    .mergeMap((action: AddOrder) =>
      this.ordersService.add(action.order).pipe(
        mergeMap((createdOrder: Order) => [
          new AddOrderSuccess(new Order(createdOrder)),
          new ShowNotification('MESSAGES.ADD_ORDER_SUCCESS'),
        ]),
        catchError(() => of(new AddOrderError()))
      )
    );

  @Effect()
  removeOrder$ = this.actions$
    .ofType(OrderActionTypes.RemoveOrder)
    .mergeMap((action: RemoveOrder) =>
      this.ordersService.remove(action.id).pipe(
        mergeMap((id: string) => [
          new RemoveOrderSuccess(id),
          new ShowNotification('MESSAGES.REMOVE_ORDER_SUCCESS'),
        ]),
        catchError(() => of(new RemoveOrderError()))
      )
    );

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

  @Effect()
  editOrder$ = this.actions$
    .ofType(OrderActionTypes.EditOrder)
    .mergeMap((action: EditOrder) =>
      this.ordersService.edit(action.order._id, action.order).pipe(
        mergeMap((updatedOrder: Order) => [
          new EditOrderSuccess(new Order(updatedOrder)),
          new ShowNotification('MESSAGES.EDIT_ORDER_SUCCESS'),
        ]),
        catchError(() => of(new EditOrderError()))
      )
    );

  @Effect()
  proceedOrder$ = this.actions$
    .ofType(OrderActionTypes.ProceedOrder)
    .mergeMap((action: ProceedOrder) =>
      this.ordersService.proceed(action.id).pipe(
        mergeMap(() => [
          new ProceedOrderSuccess(),
          new ShowNotification('MESSAGES.PROCEED_ORDER_SUCCESS'),
        ]),
        catchError(() => of(new ProceedOrderError()))
      )
    );

  @Effect()
  proceedOrderSuccess$ = this.actions$
    .ofType(OrderActionTypes.ProceedOrderSuccess)
    .withLatestFrom(this.store$.pipe(select(fromHome.getOrdersPager)))
    .map(([ action, pagerData ]) => {
      return new GetOrders(pagerData);
    });

  @Effect({ dispatch: false })
  selectOrder$ = this.actions$
    .ofType(OrderActionTypes.SelectOrder)
    .map(() => {
      this.router.navigate([ '/order/edit' ]);
      return null;
    });

  constructor(
    private actions$: Actions,
    private ordersService: OrdersService,
    private store$: Store<fromHome.State>,
    private router: Router,
  ) {
  }
}
