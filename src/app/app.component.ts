import { Component, OnDestroy, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { select, Store } from '@ngrx/store';
import { Subscription } from 'rxjs/Subscription';

import './operators';
import { ShowDevConsole } from './shared/actions/layout';
import * as fromConfig from './shared/reducers/config';
import * as fromRoot from './shared/reducers';
import { environment } from '../environments/environment';
import Config from '../../models/config.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit, OnDestroy {
  private clicksCount = 0;
  showDevToolsButton = !environment.production;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromRoot.State>,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');

    this.subscription = this.store$.pipe(select(fromConfig.getConfig))
      .subscribe((config: Config) => {
        translate.use(config.language);
      });
  }

  ngOnInit(): void {
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
}
