import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ConfigActionTypes, SetConfigKey, SetConfigKeys } from '../actions/config';
import { ConfigurationService } from '../../services/configuration.service';

@Injectable()
export class ConfigEffects {
  @Effect({ dispatch: false })
  setConfigKey$ = this.actions$
    .ofType(ConfigActionTypes.SetConfigKey)
    .map((action: SetConfigKey) => {
      this.configurationService.setSetting(action.key, action.value);
      return null;
    });

  @Effect({ dispatch: false })
  setConfigKeys$ = this.actions$
    .ofType(ConfigActionTypes.SetConfigKeys)
    .map((action: SetConfigKeys) => {
      this.configurationService.setSettings(action.pairs);
      return null;
    });

  constructor(
    private actions$: Actions,
    private configurationService: ConfigurationService,
  ) {
  }
}
