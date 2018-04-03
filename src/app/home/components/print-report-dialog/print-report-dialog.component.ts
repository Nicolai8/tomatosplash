import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { PrintReportToDocx } from '../../../shared/actions/print';
import { FormControl } from '@angular/forms';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-print-report-dialog',
  templateUrl: './print-report-dialog.component.html',
  styleUrls: [ './print-report-dialog.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class PrintReportDialogComponent {
  public dateControl: FormControl = new FormControl(new Date());

  constructor(
    private store$: Store<fromHome.State>,
  ) {
  }

  print(date: Date) {
    this.store$.dispatch(new PrintReportToDocx(date));
  }
}
