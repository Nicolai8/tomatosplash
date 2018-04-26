import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import './operators';
import { ShowDevConsole, ToggleSidenav } from './core/actions/layout';
import * as fromConfig from './core/reducers/config';
import * as fromRoot from './core/reducers';
import { environment } from '../environments/environment';
import Config from '../../models/config.model';
import * as fromLayout from './core/reducers/layout';
import { ElectronService } from './core/services/electron.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private clicksCount = 0;
  private subscription: Subscription;
  isElectron: boolean;

  sidenavMode$: Observable<boolean>;
  showSidenavButton$: Observable<boolean>;
  showSettingsButton$: Observable<boolean>;
  showHomeButton$: Observable<boolean>;
  showDevToolsButton = !environment.production;

  constructor(
    private store$: Store<fromRoot.State>,
    private electronService: ElectronService,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
    this.isElectron = this.electronService.isElectron();

    this.sidenavMode$ = this.store$.select(fromLayout.getSidenavMode);
    this.showSidenavButton$ = this.store$.select(fromLayout.getShowSidenavButton);
    this.showSettingsButton$ = this.store$.select(fromLayout.getShowSettingsButton);
    this.showHomeButton$ = this.store$.select(fromLayout.getShowHomeButton);
  }

  ngOnInit(): void {
    this.subscription = this.store$.select(fromConfig.getConfig)
      .subscribe((config: Config) => {
        this.translate.use(config.language);
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  showDevTools() {
    if (environment.production && this.clicksCount !== 8) {
      this.clicksCount++;
      return;
    }
    this.store$.dispatch(new ShowDevConsole());
  }

  toggleSidenav() {
    this.store$.dispatch(new ToggleSidenav());
  }
}
