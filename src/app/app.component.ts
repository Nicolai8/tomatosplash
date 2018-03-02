import { Component, OnInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
import { TranslateService } from '@ngx-translate/core';
import { AppConfig } from './app.config';
import { select, Store } from '@ngrx/store';
import * as fromRoot from './shared/ngrx/reducers';
import { getConfig } from './shared/ngrx/selectors/config';
import * as fromConfig from './shared/ngrx/actions/config';
import { Observable } from 'rxjs/Observable';
import Config from './shared/models/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  public computerName = '';
  public config$: Observable<Config>;

  constructor(
    private electronService: ElectronService,
    private translate: TranslateService,
    private store: Store<fromRoot.State>,
  ) {
    translate.setDefaultLang('en');
    console.log('AppConfig', AppConfig);
    this.config$ = this.store.pipe(select(getConfig));

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
  }

  openConfig(value) {
    this.store.dispatch(new fromConfig.SetConfigKey('key', value));
  }
}
