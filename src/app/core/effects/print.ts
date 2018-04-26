import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { PrintActionTypes, PrintReceiptToDocx, PrintReportToDocx } from '../actions/print';
import { PrintService } from '../services/print.service';

@Injectable()
export class PrintEffects {
  @Effect({ dispatch: false })
  printReceiptToPDF$ = this.actions$
    .ofType(PrintActionTypes.PrintReceiptToPDF)
    .map(() => {
      this.printService.printReceiptToPDF();
      return null;
    });

  @Effect({ dispatch: false })
  printReceiptToDocx$ = this.actions$
    .ofType(PrintActionTypes.PrintReceiptToDocx)
    .map((action: PrintReceiptToDocx) => {
      this.printService.printReceiptToDocx(action.order);
      return null;
    });

  @Effect({ dispatch: false })
  printReportToDocx$ = this.actions$
    .ofType(PrintActionTypes.PrintReportToDocx)
    .map((action: PrintReportToDocx) => {
      this.printService.printReportToDocx(action.date, action.formattedDate);
      return null;
    });

  @Effect({ dispatch: false })
  getPrintReceiptDocxTemplate$ = this.actions$
    .ofType(PrintActionTypes.GetPrintReceiptDocxTemplate)
    .map(() => {
      this.printService.getPrintReceiptDocxTemplate();
      return null;
    });

  @Effect({ dispatch: false })
  setPrintReceiptDocxTemplate$ = this.actions$
    .ofType(PrintActionTypes.SetPrintReceiptDocxTemplate)
    .map(() => {
      this.printService.setPrintReceiptDocxTemplate();
      return null;
    });

  @Effect({ dispatch: false })
  getPrintReportDocxTemplate$ = this.actions$
    .ofType(PrintActionTypes.GetPrintReportDocxTemplate)
    .map(() => {
      this.printService.getPrintReportDocxTemplate();
      return null;
    });

  @Effect({ dispatch: false })
  setPrintReportDocxTemplate$ = this.actions$
    .ofType(PrintActionTypes.SetPrintReportDocxTemplate)
    .map(() => {
      this.printService.setPrintReportDocxTemplate();
      return null;
    });

  constructor(
    private actions$: Actions,
    private printService: PrintService,
  ) {
  }
}
