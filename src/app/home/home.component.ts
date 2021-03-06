import { Component, HostListener, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromHome from './reducers';
import * as fromLayout from '../core/reducers/layout';
import { GetItems } from './actions/item';
import { environment } from '../../environments/environment';
import { SetSidenavMode, ToggleHomeButton, ToggleSettingsButton, ToggleSidenav, ToggleSidenavButton } from '../core/actions/layout';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  isItemSaving$: Observable<boolean>;
  showSidenav$: Observable<boolean>;
  sidenavMode$: Observable<boolean>;
  private mode: string;

  constructor(private store$: Store<fromHome.State>) {
    this.isItemSaving$ = this.store$.select(fromHome.getItemsIsSaving);
    this.showSidenav$ = this.store$.select(fromLayout.getShowSidenav);
    this.sidenavMode$ = this.store$.select(fromLayout.getSidenavMode);
  }

  ngOnInit() {
    this.store$.dispatch(new GetItems());

    setTimeout(() => {
      this.store$.dispatch(new ToggleSidenavButton(true));
      this.store$.dispatch(new ToggleSettingsButton(true));
      this.store$.dispatch(new ToggleHomeButton(false));

      this.onResize();
    }, 10);
  }

  @HostListener('window:resize', [ '$event' ])
  onResize() {
    let mode = 'side';
    let toggle = true;

    if (window.innerWidth < environment.toggleSidebarViewport) {
      mode = 'over';
      toggle = false;
    }

    if (mode !== this.mode) {
      this.store$.dispatch(new SetSidenavMode(mode));
      this.store$.dispatch(new ToggleSidenav(toggle));
      this.mode = mode;
    }

    return mode;
  }

  onClosedStart() {
    this.store$.dispatch(new ToggleSidenav(false));
  }
}
