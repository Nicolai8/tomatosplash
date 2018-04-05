import { Injectable } from '@angular/core';
import { Events } from '../../../../events';
import { ElectronService } from './electron.service';
import Config from '../../../../models/config.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import * as config from '../actions/config';
import * as layout from '../actions/layout';
import { AuthService } from './auth.service';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ConfigurationService {
  config$: BehaviorSubject<Config> = new BehaviorSubject<Config>(<any>{});

  constructor(
    private store$: Store<fromRoot.State>,
    private electronService: ElectronService,
  ) {
    this.electronService.ipcRenderer.on(Events.editConfigurationSuccess, (event: Electron.Event, newConfig: Config) => {
      this.config$.next(newConfig);
      this.store$.dispatch(new config.GetConfigSuccess(newConfig));
      this.store$.dispatch(new layout.ShowNotification('MESSAGES.EDIT_CONFIG_SUCCESS'));
    });
  }

  loadConfiguration(): Promise<Config> {
    return new Promise((resolve) => {
      const newConfig = this.electronService.ipcRenderer.sendSync(Events.getConfiguration) || {};
      this.config$.next(newConfig);
      this.store$.dispatch(new config.GetConfigSuccess(newConfig));
      resolve(newConfig);
    });
  }

  setSettings(pairs: { [key: string]: any }) {
    this.electronService.ipcRenderer.send(Events.editConfiguration, pairs);
  }

  showDevConsole() {
    this.electronService.ipcRenderer.sendSync(Events.showDevConsole);
  }
}
