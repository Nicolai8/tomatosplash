import { Events } from '../../events';
import apiCaller from '../services/apiService';
import { Order } from '../../models/order.model';
import { Pagination } from '../../models/pagination.model';

export const ordersEvents = (ipcMain: Electron.IpcMain) => {
  ipcMain.on(Events.getOrders, (event: Electron.Event, page: number, limit: number) => {
    apiCaller(`/api/order/?page=${page + 1}&limit=${limit}`, 'get', {}, (data: Pagination<Order>) => {
      event.sender.send(Events.getOrdersSuccess, data);
    }, (error) => {
      event.sender.send(Events.getOrdersError, error);
    });
  });

  ipcMain.on(Events.addOrder, (event: Electron.Event, order: Order) => {
    apiCaller('/api/order/', 'put', { data: order }, (createdOrder) => {
      event.sender.send(Events.addOrderSuccess, createdOrder);
    }, (error) => {
      event.sender.send(Events.addOrderError, error);
    });
  });

  ipcMain.on(Events.editOrder, (event: Electron.Event, id: string, order: Order) => {
    apiCaller('/api/order/${id}', 'post', { path: { id }, data: order }, (updatedOrder) => {
      event.sender.send(Events.editOrderSuccess, updatedOrder);
    }, (error) => {
      event.sender.send(Events.editOrderError, error);
    });
  });

  ipcMain.on(Events.removeOrder, (event: Electron.Event, id: string) => {
    apiCaller('/api/order/${id}', 'delete', { path: { id } }, () => {
      event.sender.send(Events.removeOrderSuccess, id);
    }, (error) => {
      event.sender.send(Events.removeOrderError, error);
    });
  });

  ipcMain.on(Events.proceedOrder, (event: Electron.Event, id: string) => {
    apiCaller('/api/order/proceed/${id}', 'post', { path: { id } }, () => {
      event.sender.send(Events.proceedOrderSuccess, id);
    }, (error) => {
      event.sender.send(Events.proceedOrderError, error);
    });
  });
};
