import { Injectable } from '@angular/core';
import { Events } from '../../../../events';
import { ElectronService } from '../../providers/electron.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export type Config = {
    [key: string]: any
}

@Injectable()
export class ConfigurationService {
    private config$: BehaviorSubject<Config> = new BehaviorSubject({});

    constructor(private electronService: ElectronService) {
        this.electronService.ipcRenderer.on(Events.editConfigurationSuccess, (event: Electron.Event, config: Config) => {
            this.config$.next(config);
        });
    }

    get configuration$() {
        return this.config$;
    }

    loadConfiguration(): Promise<Config> {
        return new Promise((resolve) => {
            this.config$.next(this.electronService.ipcRenderer.sendSync(Events.getConfiguration) || {});
            resolve(this.config$);
        });
    }

    setSetting(key: string, value: any) {
        this.electronService.ipcRenderer.send(Events.editConfiguration, key, value);
    }
}
