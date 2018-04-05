import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { ShowDevConsole } from './shared/actions/layout';
import { Store } from '@ngrx/store';
import * as fromRoot from './shared/reducers';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  private clicksCount = 0;
  showDevToolsButton = !environment.production;

  constructor(
    private store$: Store<fromRoot.State>,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  showDevTools() {
    if (environment.production && this.clicksCount !== 8) {
      this.clicksCount++;
      return;
    }
    this.store$.dispatch(new ShowDevConsole());
  }
}
