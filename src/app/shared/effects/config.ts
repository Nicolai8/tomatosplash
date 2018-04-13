import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ConfigActionTypes, SetConfigKeys } from '../actions/config';
import { ConfigurationService } from '../services/configuration.service';
import { AuthService } from '../services/auth.service';
import * as fromRoot from '../reducers';
import * as fromConfig from '../reducers/config';
import { NotificationService } from '../services/notification.service';
import { Observable } from 'rxjs/Observable';
import Config from '../../../../models/config.model';
import { Store } from '@ngrx/store';

@Injectable()
export class ConfigEffects {
  @Effect({ dispatch: false })
  setConfigKeys$ = this.actions$
    .ofType(ConfigActionTypes.SetConfigKeys)
    .withLatestFrom(this.store$.select(fromConfig.getConfig))
    .mergeMap(([ action, oldConfig ]: [ SetConfigKeys, Config ]) => {
      if (action.config.dbPassword) {
        return this.authService.authorize(action.config)
          .mergeMap((result) => Observable.of([ result, oldConfig, action.config ]));
      }
      return Observable.of([ true, oldConfig, action.config ]);
    })
    .map(([ authResult, oldConfig, config ]: [ boolean, Config, Config ]) => {
      if (!authResult) {
        config.dbUserName = oldConfig.dbUserName;
        this.notificationService.showNotification('MESSAGES.AUTHORIZATION_FAILED_NOT_SAVED');
      }

      this.configurationService.setSettings(config);

      return null;
    });

  constructor(
    private actions$: Actions,
    private store$: Store<fromRoot.State>,
    private configurationService: ConfigurationService,
    private notificationService: NotificationService,
    private authService: AuthService,
  ) {
  }
}
