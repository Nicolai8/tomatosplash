import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { Config, ConfigurationService } from './shared/services/configuration.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
    public computerName = '';
    public config$: BehaviorSubject<Config>;

    constructor(
        public electronService: ElectronService,
        private translate: TranslateService,
        private configurationService: ConfigurationService,
    ) {
        translate.setDefaultLang('en');
        console.log('AppConfig', AppConfig);
        this.config$ = this.configurationService.configuration$;

        if (electronService.isElectron()) {
            console.log('Mode electron');
            console.log('Electron ipcRenderer', electronService.ipcRenderer);
            console.log('NodeJS childProcess', electronService.childProcess);
        } else {
            console.log('Mode web');
        }


    }

    ngOnInit(): void {
        console.log('component initialized');
        this.computerName = this.electronService.ipcRenderer.sendSync('getComputerName');
    }

    openConfig(value) {
        this.configurationService.setSetting("key", value);
    }
}
