import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { ConfirmDialogComponent } from '../components/confirm-dialog/confirm-dialog.component';

@Injectable()
export class ConfirmService {

  constructor(private matDialog: MatDialog) {
  }

  showDialog(message: string = ''): Observable<boolean> {
    const dialogRef = this.matDialog.open(ConfirmDialogComponent, {
      data: message
    });
    return dialogRef.afterClosed();
  }
}
