import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../shared/reducers/index';
import { ElectronService } from '../../shared/services/electron.service';
import { Item } from '../../../../models/item.model';
import { Events } from '../../../../events';
import {
  AddItemError, AddItemSuccess, EditItemError, EditItemSuccess, GetItemsError, GetItemsSuccess, RemoveItemError,
  RemoveItemSuccess
} from '../actions/item';
import { Pager } from '../models/pager.model';
import { NotificationService } from '../../shared/services/notification.service';

@Injectable()
export class ItemsService {
  constructor(
    private electronService: ElectronService,
    private store: Store<fromRoot.State>,
    private notificationService: NotificationService,
  ) {
    // get
    this.electronService.ipcRenderer.on(Events.getItemsSuccess, (
      event: Electron.Event, items: Item[], pager: Pager) => {
      this.store.dispatch(new GetItemsSuccess(items, pager));
    });
    this.electronService.ipcRenderer.on(Events.getItemsError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new GetItemsError());
      this.notificationService.showNotification(error, false);
    });
    // add
    this.electronService.ipcRenderer.on(Events.addItemSuccess, (event: Electron.Event, createdItem: Item) => {
      this.store.dispatch(new AddItemSuccess(createdItem));
    });
    this.electronService.ipcRenderer.on(Events.addItemError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new AddItemError());
      this.notificationService.showNotification(error, false);
    });
    // edit
    this.electronService.ipcRenderer.on(Events.editItemSuccess, (event: Electron.Event, updatedItem: Item) => {
      this.store.dispatch(new EditItemSuccess(updatedItem));
    });
    this.electronService.ipcRenderer.on(Events.editItemError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new EditItemError());
      this.notificationService.showNotification(error, false);
    });
    // remove
    this.electronService.ipcRenderer.on(Events.removeItemSuccess, (event: Electron.Event, id: string) => {
      this.store.dispatch(new RemoveItemSuccess(id));
    });
    this.electronService.ipcRenderer.on(Events.removeItemError, (event: Electron.Event, error: string) => {
      this.store.dispatch(new RemoveItemError());
      this.notificationService.showNotification(error, false);
    });
  }

  public get(): void {
    this.electronService.ipcRenderer.send(Events.getItems);
  }

  public add(item: Item): void {
    this.electronService.ipcRenderer.send(Events.addItem, item);
  }

  public edit(id: string, item: Item): void {
    this.electronService.ipcRenderer.send(Events.editItem, id, item);
  }

  public remove(id: string): void {
    this.electronService.ipcRenderer.send(Events.removeItem, id);
  }
}
