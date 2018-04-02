import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { ElectronService } from './electron.service';
import { Events } from '../../../../events';

@Injectable()
export class NotificationService {
  private duration = 1000;

  constructor(
    private snackBar: MatSnackBar,
    private translate: TranslateService,
    private electronService: ElectronService,
  ) {
    this.electronService.ipcRenderer.on(Events.error, (event: Electron.Event, error: string) => {
      this.showNotification(error, false);
    });
  }

  showNotification(message: string, translate: boolean = true) {
    const messageToShow = translate ? this.translate.instant(message) : message;
    this.snackBar.open(messageToShow, '', {
      duration: this.duration,
    });
  }
}
