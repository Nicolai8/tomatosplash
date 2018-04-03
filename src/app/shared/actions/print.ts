import { ExtendedAction } from './action';
import { Order } from '../../../../models/order.model';

export enum PrintActionTypes {
  PrintReceiptToDocx = '[Print] PrintReceiptToDocx',
  PrintReportToDocx = '[Print] PrintReportToDocx',
  PrintReceiptToPDF = '[Print] PrintReceiptToPDF',

  SetPrintReceiptDocxTemplate = '[Print] SetPrintReceiptDocxTemplate',
  GetPrintReceiptDocxTemplate = '[Print] GetPrintReceiptDocxTemplate',

  SetPrintReportDocxTemplate = '[Print] SetPrintReportDocxTemplate',
  GetPrintReportDocxTemplate = '[Print] GetPrintReportDocxTemplate',
}

export class PrintReceiptToDocx implements ExtendedAction {
  readonly type = PrintActionTypes.PrintReceiptToDocx;

  constructor(public order: Order) {
  }
}

export class PrintReportToDocx implements ExtendedAction {
  readonly type = PrintActionTypes.PrintReportToDocx;
}

export class PrintReceiptToPDF implements ExtendedAction {
  readonly type = PrintActionTypes.PrintReceiptToPDF;
}

export class SetPrintReceiptDocxTemplate implements ExtendedAction {
  readonly type = PrintActionTypes.SetPrintReceiptDocxTemplate;
}

export class GetPrintReceiptDocxTemplate implements ExtendedAction {
  readonly type = PrintActionTypes.GetPrintReceiptDocxTemplate;
}

export class SetPrintReportDocxTemplate implements ExtendedAction {
  readonly type = PrintActionTypes.SetPrintReportDocxTemplate;
}

export class GetPrintReportDocxTemplate implements ExtendedAction {
  readonly type = PrintActionTypes.GetPrintReportDocxTemplate;
}
