import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { Events } from '../../../../events';
import { ElectronService } from './electron.service';
import Config from '../../../../models/config.model';
import * as fromRoot from '../reducers';
import { ShowNotification } from '../actions/layout';
import { GetConfigSuccess } from '../actions/config';

export const CONFIGURATION_STORAGE_KEY = 'app.config';

@Injectable()
export class ConfigurationService {
  config$: BehaviorSubject<Config> = new BehaviorSubject<Config>(<Config>{});

  constructor(
    private store$: Store<fromRoot.State>,
    private electronService: ElectronService,
  ) {
    this.electronService.ipcRenderer.on(Events.editConfigurationSuccess,
      (event: Electron.Event, config: Config) => {
        this.editConfigSuccess(config);
      });
  }

  loadConfiguration(): Promise<Config> {
    return new Promise((resolve) => {
      let newConfig = <Config>{};

      if (this.electronService.isElectron()) {
        newConfig = this.electronService.ipcRenderer.sendSync(Events.getConfiguration) || {};
      } else {
        const configString = localStorage.getItem(CONFIGURATION_STORAGE_KEY);
        if (configString) {
          newConfig = JSON.parse(configString);
        }
      }

      this.config$.next(newConfig);
      this.store$.dispatch(new GetConfigSuccess(newConfig));
      resolve(newConfig);
    });
  }

  setSettings(config: Config) {
    if (this.electronService.isElectron()) {
      this.electronService.ipcRenderer.send(Events.editConfiguration, config);
    } else {
      delete config.dbPassword;
      localStorage.setItem(CONFIGURATION_STORAGE_KEY, JSON.stringify(config));
      this.editConfigSuccess(config);
    }
  }

  showDevConsole() {
    this.electronService.ipcRenderer.sendSync(Events.showDevConsole);
  }

  private editConfigSuccess(config: Config) {
    this.config$.next(config);
    this.store$.dispatch(new GetConfigSuccess(config));
    this.store$.dispatch(new ShowNotification('MESSAGES.EDIT_CONFIG_SUCCESS'));
  }
}
