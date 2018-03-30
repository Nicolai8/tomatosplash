import { Component } from '@angular/core';
import { Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { SelectOrder } from '../../actions/order';
import { Order } from '../../../../../models/order.model';

@Component({
  selector: 'app-main-actions',
  templateUrl: 'main-actions.component.html',
  styleUrls: [ 'main-actions.component.scss' ]
})
export class MainActionsComponent {
  constructor(private store$: Store<fromHome.State>) {
  }

  addOrder() {
    this.store$.dispatch(new SelectOrder(new Order()));
  }
}
