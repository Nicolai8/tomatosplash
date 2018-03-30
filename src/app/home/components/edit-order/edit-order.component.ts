import { ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { ItemInOrder, Order, OrderType } from '../../../../../models/order.model';
import { Subscription } from 'rxjs/Subscription';
import { FormControl, FormGroup } from '@angular/forms';
import { Item } from '../../../../../models/item.model';
import { AddOrder, EditOrder } from '../../actions/order';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-edit-order',
  templateUrl: 'edit-order.component.html',
  styleUrls: [ 'edit-order.component.scss' ],
})
export class EditOrderComponent implements OnInit, OnDestroy {
  form: FormGroup = new FormGroup({});
  orderType = OrderType;
  order: Order;
  items: Item[];
  controlNames: string[] = [];
  private itemsSubscription: Subscription;
  private orderSubscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
  ) {
  }

  private getItemFormControlsFromOrder(formGroup: FormGroup, order: Order): void {
    if (order) {
      if (order.type === OrderType.NEW) {
        order.items.forEach((itemInOrder) => {
          formGroup.addControl(itemInOrder.itemId, new FormControl(itemInOrder));
        });
      } else if (order.type === OrderType.PROCESSED) {
        order.processedOrderItems.forEach((itemInOrderString: string) => {
          const itemInOrder = JSON.parse(itemInOrderString);
          formGroup.addControl(itemInOrder.itemId, new FormControl(itemInOrder));
        });
      }
    }
  }

  ngOnInit() {
    this.itemsSubscription = this.store$.pipe(select(fromHome.getItems))
      .subscribe((items: Item[]) => {
        this.items = items;
      });

    this.orderSubscription = this.store$.pipe(select(fromHome.getSelectedOrder))
      .subscribe((order: Order) => {
        Object.keys(this.form.controls).forEach((key) => this.form.removeControl(key));
        this.controlNames = [];
        this.form.markAsPristine();
        this.cdRef.detectChanges();

        this.ngZone.run(() => {
          this.getItemFormControlsFromOrder(this.form, order);
          this.controlNames = Object.keys(this.form.controls);
          this.order = order;
          this.cdRef.detectChanges();
        });
      });
  }

  ngOnDestroy() {
    this.itemsSubscription.unsubscribe();
    this.orderSubscription.unsubscribe();
  }

  addItemInOrder() {
    this.form.addControl(`item_in_order_${Date.now()}`, new FormControl({}));
    this.form.markAsDirty();
    this.controlNames = Object.keys(this.form.controls);
  }

  removeItemInOrder(controlName: string) {
    this.form.removeControl(controlName);
    this.form.markAsDirty();
    this.controlNames = Object.keys(this.form.controls);
  }

  save() {
    const items: { [key: string]: ItemInOrder } = {};
    Object.keys(this.form.controls).forEach((key: string) => {
      const item: ItemInOrder = this.form.value[ key ];
      if (items[ item.itemId ]) {
        // all duplicates will be saved
        items[ item.itemId ].count += item.count;
      } else {
        items[ item.itemId ] = item;
      }
    });

    // we shouldn't pass itemId, because there is no such property in Order entity
    this.order.items = Object.keys(items).map((key: string) => {
      return {
        count: items[ key ].count,
        _item: key,
      };
    });

    if (this.order._id) {
      this.store$.dispatch(new EditOrder(this.order));
    } else {
      this.store$.dispatch(new AddOrder(this.order));
    }
  }
}
