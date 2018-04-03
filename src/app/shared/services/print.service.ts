import { Injectable } from '@angular/core';
import { Events } from '../../../../events';
import { ElectronService } from './electron.service';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as layout from '../actions/layout';
import { OrderToPrint } from '../../../../models/order.model';

@Injectable()
export class PrintService {
  constructor(
    private store$: Store<fromRoot.State>,
    private electronService: ElectronService
  ) {
    this.electronService.ipcRenderer.on(Events.setPrintReceiptDocxTemplateSuccess, () => {
      this.store$.dispatch(new layout.ShowNotification('MESSAGES.SET_PRINT_RECEIPT_DOCX_TEMPLATE_SUCCESS'));
    });
    this.electronService.ipcRenderer.on(Events.setPrintReportDocxTemplateSuccess, () => {
      this.store$.dispatch(new layout.ShowNotification('MESSAGES.SET_PRINT_REPORT_DOCX_TEMPLATE_SUCCESS'));
    });
    this.electronService.ipcRenderer.on(Events.printReceiptToDocxSuccess, () => {
      this.store$.dispatch(new layout.ShowNotification('MESSAGES.PRINT_RECEIPT_TO_DOCX_SUCCESS'));
    });
    this.electronService.ipcRenderer.on(Events.printReportToDocxSuccess, () => {
      this.store$.dispatch(new layout.ShowNotification('MESSAGES.PRINT_REPORT_TO_DOCX_SUCCESS'));
    });
  }

  printReceiptToDocx(order: OrderToPrint) {
    this.electronService.ipcRenderer.send(Events.printReceiptToDocx, order);
  }

  printReportToDocx(date: Date) {
    this.electronService.ipcRenderer.send(Events.printReportToDocx, date);
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
