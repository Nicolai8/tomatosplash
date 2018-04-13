import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { Events } from '../../../../events';
import { ElectronService } from './electron.service';
import { Order, OrderToPrint } from '../../../../models/order.model';
import { OrdersService } from './orders.service';
import { NotificationService } from './notification.service';

@Injectable()
export class PrintService {
  private subscription: Subscription;

  constructor(
    private notificationService: NotificationService,
    private ordersService: OrdersService,
    private electronService: ElectronService
  ) {
    this.electronService.ipcRenderer.on(Events.setPrintReceiptDocxTemplateSuccess, () => {
      this.notificationService.showNotification('MESSAGES.SET_PRINT_RECEIPT_DOCX_TEMPLATE_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.setPrintReportDocxTemplateSuccess, () => {
      this.notificationService.showNotification('MESSAGES.SET_PRINT_REPORT_DOCX_TEMPLATE_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.printReceiptToDocxSuccess, () => {
      this.notificationService.showNotification('MESSAGES.PRINT_RECEIPT_TO_DOCX_SUCCESS');
    });
    this.electronService.ipcRenderer.on(Events.printReportToDocxSuccess, () => {
      this.notificationService.showNotification('MESSAGES.PRINT_REPORT_TO_DOCX_SUCCESS');
    });
  }

  printReceiptToDocx(order: OrderToPrint) {
    this.electronService.ipcRenderer.send(Events.printReceiptToDocx, order);
  }

  printReportToDocx(date: Date, formattedDate: string) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.ordersService.getDailyReport(date)
      .subscribe((orders: Order[]) => {
        this.electronService.ipcRenderer.send(Events.printReportToDocx, orders, date, formattedDate);
      });
  }

  printReceiptToPDF() {
    this.electronService.ipcRenderer.send(Events.printReceiptToPDF);
  }

  getPrintReceiptDocxTemplate() {
    this.electronService.ipcRenderer.send(Events.getPrintReceiptDocxTemplate);
  }

  setPrintReceiptDocxTemplate() {
    this.electronService.ipcRenderer.send(Events.setPrintReceiptDocxTemplate);
  }

  getPrintReportDocxTemplate() {
    this.electronService.ipcRenderer.send(Events.getPrintReportDocxTemplate);
  }

  setPrintReportDocxTemplate() {
    this.electronService.ipcRenderer.send(Events.setPrintReportDocxTemplate);
  }
}
