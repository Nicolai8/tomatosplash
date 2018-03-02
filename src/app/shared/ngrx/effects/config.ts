import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ConfigActionTypes, SetConfigKey } from '../actions/config';
import { ConfigurationService } from '../../services/configuration.service';
import 'rxjs/add/operator/map';

@Injectable()
export class ConfigEffects {
  @Effect({ dispatch: false })
  setConfigKey$ = this.actions$
    .ofType(ConfigActionTypes.SetConfigKey)
    .map((action: SetConfigKey) => {
      this.configurationService.setSetting(action.key, action.value);
      return null;
    });

  constructor(
    private actions$: Actions,
    private configurationService: ConfigurationService,
  ) {
  }
}