import { Events } from '../../events';
import apiCaller from '../services/apiService';

export const itemsEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.on(Events.getItems, (event: Electron.Event) => {
    apiCaller('/api/item/', 'get', {}, (items) => {
      event.sender.send(Events.getItemsSuccess, items);
    });
  });

  ipcMain.on(Events.addItem, (event: Electron.Event, item: any) => {
    apiCaller('/api/item/', 'post', { data: item }, (createdItem) => {
      event.sender.send(Events.addItemSuccess, createdItem);
    });
  });

  ipcMain.on(Events.editItem, (event: Electron.Event, id: string, item: any) => {
    apiCaller('/api/item/${id}', 'put', { path: { id }, data: item }, (updatedItem) => {
      event.sender.send(Events.editItemSuccess, updatedItem);
    });
  });

  ipcMain.on(Events.removeItem, (event: Electron.Event, id: string) => {
    apiCaller('/api/item/${id}', 'delete', { path: { id } }, () => {
      event.sender.send(Events.removeItemSuccess, id);
    });
  });
};
