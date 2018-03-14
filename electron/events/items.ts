import { Events } from '../../events';
import apiCaller from '../services/apiService';
import { Item } from '../../models/item.model';
import { Pagination } from '../../models/pagination.model';

export const itemsEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.on(Events.getItems, (event: Electron.Event, page: number, limit: number) => {
    apiCaller(`/api/item/?page=${page + 1}&limit=${limit}`, 'get', {}, (data: Pagination<Item>) => {
      event.sender.send(Events.getItemsSuccess, data);
    }, (error) => {
      event.sender.send(Events.getItemsError, error);
    });
  });

  ipcMain.on(Events.addItem, (event: Electron.Event, item: Item) => {
    apiCaller('/api/item/', 'put', { data: item }, (createdItem) => {
      event.sender.send(Events.addItemSuccess, createdItem);
    }, (error) => {
      event.sender.send(Events.addItemError, error);
    });
  });

  ipcMain.on(Events.editItem, (event: Electron.Event, id: string, item: Item) => {
    apiCaller('/api/item/${id}', 'post', { path: { id }, data: item }, (updatedItem) => {
      event.sender.send(Events.editItemSuccess, updatedItem);
    }, (error) => {
      event.sender.send(Events.editItemError, error);
    });
  });

  ipcMain.on(Events.removeItem, (event: Electron.Event, id: string) => {
    apiCaller('/api/item/${id}', 'delete', { path: { id } }, () => {
      event.sender.send(Events.removeItemSuccess, id);
    }, (error) => {
      event.sender.send(Events.removeItemError, error);
    });
  });
};
