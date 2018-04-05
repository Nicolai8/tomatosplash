import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { ConfigActionTypes, SetConfigKeys } from '../actions/config';
import { ConfigurationService } from '../services/configuration.service';

@Injectable()
export class ConfigEffects {
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
