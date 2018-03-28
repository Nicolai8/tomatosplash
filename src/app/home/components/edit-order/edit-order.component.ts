import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ItemInOrder, Order, OrderType } from '../../../../../models/order.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../../../../../models/item.model';

@Component({
  selector: 'app-edit-order',
  templateUrl: 'edit-order.component.html',
  styleUrls: [ 'edit-order.component.scss' ],
})
export class EditOrderComponent implements OnInit, OnDestroy {
  form: FormGroup;
  orderType = OrderType;
  order: Order;
  items: Item[];
  controlNames: string[];
  private subscription: Subscription;

  constructor(
    private store: Store<fromHome.State>,
    private route: ActivatedRoute,
    private cdRef: ChangeDetectorRef
  ) {
  }

  private static getItemFormControlsFromOrder(order: Order): { [key: string]: FormControl } {
    const controls = {};
    if (order) {
      if (order.type === OrderType.NEW) {
        order.items.forEach((itemInOrder) => {
          controls[ itemInOrder.itemId ] = new FormControl(itemInOrder);
        });
      } else if (order.type === OrderType.PROCESSED) {
        order.processedOrderItems.forEach((itemInOrderString: string) => {
          const itemInOrder = JSON.parse(itemInOrderString);
          controls[ itemInOrder.itemId ] = new FormControl(itemInOrder);
        });
      }
    }

    return controls;
  }

  ngOnInit() {
    this.subscription = this.route.params
      .map((params) => params.id)
      .mergeMap((id: string) => {
        let order$ = Observable.of(<Order>{});
        if (id) {
          order$ = this.store.pipe(select(fromHome.getOrderById(id)));
        }
        return Observable.zip(
          order$,
          this.store.pipe(select(fromHome.getItems)),
        );
      })
      .subscribe(([ order, items ]) => {
        this.form = new FormGroup(EditOrderComponent.getItemFormControlsFromOrder(order));
        this.controlNames = Object.keys(this.form.controls);
        this.order = order;
        this.items = items;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addItemInOrder() {
    this.form.addControl(`item_in_order_${Date.now()}`, new FormControl({}));
    this.controlNames = Object.keys(this.form.controls);
    this.cdRef.detectChanges();
  }

  removeItemInOrder(controlName: string) {
    this.form.removeControl(controlName);
    this.controlNames = Object.keys(this.form.controls);
    this.cdRef.detectChanges();
  }
}
