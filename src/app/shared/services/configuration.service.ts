import { Injectable } from '@angular/core';
import { Events } from '../../../../events';
import { ElectronService } from './electron.service';
import Config from '../models/config.model';
import { Store } from '@ngrx/store';
import * as fromRoot from '../ngrx/reducers';
import * as config from '../ngrx/actions/config';

@Injectable()
export class ConfigurationService {
  constructor(
    private store: Store<fromRoot.State>,
    private electronService: ElectronService
  ) {
    this.electronService.ipcRenderer.on(Events.editConfigurationSuccess, (event: Electron.Event, newConfig: Config) => {
      this.store.dispatch(new config.GetConfigSuccess(newConfig));
    });
  }

  loadConfiguration(): Promise<Config> {
    return new Promise((resolve) => {
      const newConfig = this.electronService.ipcRenderer.sendSync(Events.getConfiguration) || {};
      this.store.dispatch(new config.GetConfigSuccess(newConfig));
      resolve(newConfig);
    });
  }

  setSetting(key: string, value: any) {
    this.electronService.ipcRenderer.send(Events.editConfiguration, key, value);
  }
}
