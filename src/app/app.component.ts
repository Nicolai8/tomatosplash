import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import './operators';
import { ShowDevConsole } from './shared/actions/layout';
import { Store } from '@ngrx/store';
import * as fromRoot from './shared/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnInit {
  constructor(
    private store$: Store<fromRoot.State>,
    private translate: TranslateService,
  ) {
    translate.setDefaultLang('en');
  }

  ngOnInit(): void {
  }

  showDevTools() {
    this.store$.dispatch(new ShowDevConsole());
  }
}
