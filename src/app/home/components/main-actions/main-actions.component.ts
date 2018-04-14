import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { SelectOrder } from '../../actions/order';
import { Order } from '../../../../../models/order.model';
import { PrintReportDialogComponent } from '../print-report-dialog/print-report-dialog.component';
import { MatDialog } from '@angular/material';
import { ElectronService } from '../../../shared/services/electron.service';

@Component({
  selector: 'app-main-actions',
  templateUrl: 'main-actions.component.html',
  styleUrls: [ 'main-actions.component.scss' ]
})
export class MainActionsComponent {
  isElectron: boolean;

  constructor(
    private store$: Store<fromHome.State>,
    private matDialog: MatDialog,
    private electronService: ElectronService,
  ) {
    this.isElectron = this.electronService.isElectron();
  }

  addOrder() {
    this.store$.dispatch(new SelectOrder(new Order()));
  }

  printDailyReport() {
    this.matDialog.open(PrintReportDialogComponent);
  }
}
