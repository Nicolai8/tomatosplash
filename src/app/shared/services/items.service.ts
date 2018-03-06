import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromRoot from '../ngrx/reducers';
import { ElectronService } from './electron.service';
import { Item } from '../models/item.model';
import { Events } from '../../../../events';
import { AddItemSuccess, EditItemSuccess, GetItemsSuccess, RemoveItemSuccess } from '../ngrx/actions/item';

@Injectable()
export class ItemsService {
  constructor(
    private electronService: ElectronService,
    private store: Store<fromRoot.State>
  ) {
    this.electronService.ipcRenderer.on(Events.getItemsSuccess, (items: Item[]) => {
      this.store.dispatch(new GetItemsSuccess(items));
    });
    this.electronService.ipcRenderer.on(Events.addItemSuccess, (createdItem: Item) => {
      this.store.dispatch(new AddItemSuccess(createdItem));
    });
    this.electronService.ipcRenderer.on(Events.editItemSuccess, (updatedItem: Item) => {
      this.store.dispatch(new EditItemSuccess(updatedItem));
    });
    this.electronService.ipcRenderer.on(Events.removeItemSuccess, (id: string) => {
      this.store.dispatch(new RemoveItemSuccess(id));
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
