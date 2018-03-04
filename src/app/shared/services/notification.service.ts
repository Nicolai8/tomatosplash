import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class NotificationService {
  private duration = 500;

  constructor(private snackBar: MatSnackBar, private translate: TranslateService) {
  }

  showNotification(message: string, translate: boolean = true) {
    const messageToShow = translate ? this.translate.instant(message) : message;
    this.snackBar.open(messageToShow, '', {
      duration: this.duration,
    });
  }
}
