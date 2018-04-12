import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs/Observable';

import './operators';
import { ShowDevConsole, ToggleSidenav } from './shared/actions/layout';
import * as fromConfig from './shared/reducers/config';
import * as fromRoot from './shared/reducers';
import { environment } from '../environments/environment';
import Config from '../../models/config.model';
import * as fromLayout from './shared/reducers/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private clicksCount = 0;
  private subscription: Subscription;

  sidenavMode$: Observable<boolean>;
  showSidenavButton$: Observable<boolean>;
  showSettingsButton$: Observable<boolean>;
  showHomeButton$: Observable<boolean>;
  showDevToolsButton = !environment.production;

  constructor(
    private store$: Store<fromRoot.State>,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
    this.sidenavMode$ = this.store$.select(fromLayout.getSidenavMode);
    this.showSidenavButton$ = this.store$.select(fromLayout.getShowSidenavButton);
    this.showSettingsButton$ = this.store$.select(fromLayout.getShowSettingsButton);
    this.showHomeButton$ = this.store$.select(fromLayout.getShowHomeButton);

    this.subscription = this.store$.pipe(select(fromConfig.getConfig))
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
