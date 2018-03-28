import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';

import * as fromHome from './reducers';
import { GetItems } from './actions/item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: [ './home.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class HomeComponent implements OnInit {
  public isItemSaving$: Observable<boolean>;

  constructor(private store$: Store<fromHome.State>) {
  }

  ngOnInit() {
    this.store$.dispatch(new GetItems());
    this.isItemSaving$ = this.store$.pipe(select(fromHome.getItemsIsSaving));
  }
}
