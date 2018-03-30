import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers/index';
import { ElectronService } from '../../shared/services/electron.service';
import { Order } from '../../../../models/order.model';
import { Events } from '../../../../events';
import {
  AddOrderError,
  AddOrderSuccess,
  EditOrderError,
  EditOrderSuccess,
  GetOrdersError,
  GetOrdersSuccess,
  RemoveOrderError,
  RemoveOrderSuccess
} from '../actions/order';
import { NotificationService } from '../../shared/services/notification.service';
import { Pagination } from '../../../../models/pagination.model';

@Injectable()
export class OrdersService {
  constructor(
    private electronService: ElectronService,
    private store: Store<fromRoot.State>,
    private notificationService: NotificationService,
  ) {
    // get
    this.electronService.ipcRenderer.on(Events.getOrdersSuccess, (
      event: Electron.Event, data: Pagination<Order>) => {
      this.store.dispatch(new GetOrdersSuccess(data.docs.map((doc) => new Order(doc)), data));
    });
    this.electronService.ipcRenderer.on(Events.getOrdersError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new GetOrdersError());
      this.notificationService.showNotification(error, false);
    });
    // add
    this.electronService.ipcRenderer.on(Events.addOrderSuccess, (event: Electron.Event, createdOrder: Order) => {
      this.store.dispatch(new AddOrderSuccess(new Order(createdOrder)));
      this.notificationService.showNotification('MESSAGES.ADD_ORDER_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.addOrderError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new AddOrderError());
      this.notificationService.showNotification(error, false);
    });
    // edit
    this.electronService.ipcRenderer.on(Events.editOrderSuccess, (event: Electron.Event, updatedOrder: Order) => {
      this.store.dispatch(new EditOrderSuccess(new Order(updatedOrder)));
      this.notificationService.showNotification('MESSAGES.EDIT_ORDER_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.editOrderError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new EditOrderError());
      this.notificationService.showNotification(error, false);
    });
    // remove
    this.electronService.ipcRenderer.on(Events.removeOrderSuccess, (event: Electron.Event, id: string) => {
      this.store.dispatch(new RemoveOrderSuccess(id));
      this.notificationService.showNotification('MESSAGES.REMOVE_ORDER_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.removeOrderError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new RemoveOrderError());
      this.notificationService.showNotification(error, false);
    });
  }

  public get(page: number, limit: number): void {
    this.electronService.ipcRenderer.send(Events.getOrders, page, limit);
  }

  public add(order: Order): void {
    this.electronService.ipcRenderer.send(Events.addOrder, order);
  }

  public edit(id: string, order: Order): void {
    this.electronService.ipcRenderer.send(Events.editOrder, id, order);
  }

  public remove(id: string): void {
    this.electronService.ipcRenderer.send(Events.removeOrder, id);
  }
}
