import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { LayoutActionTypes, ShowNotification } from '../actions/layout';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class LayoutEffects {
  @Effect({ dispatch: false })
  showNotification$ = this.actions$
    .ofType(LayoutActionTypes.ShowNotification)
    .map((action: ShowNotification) => {
      this.notificationService.showNotification(action.message, action.translate);
      return null;
    });

  constructor(
    private actions$: Actions,
    private notificationService: NotificationService,
  ) {
  }
}
