import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { DatePipe } from '@angular/common';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Subscription } from 'rxjs/Subscription';

import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import * as fromHome from '../../reducers';
import { ItemInOrder, Order, OrderToPrint, OrderType } from '../../../../../models/order.model';
import { Item } from '../../../../../models/item.model';
import { PrintReceiptToDocx, PrintReceiptToPDF } from '../../../shared/actions/print';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-order-dialog',
  templateUrl: './order-dialog.component.html',
  styleUrls: [ './order-dialog.component.scss' ],
  encapsulation: ViewEncapsulation.None,
})
export class OrderDialogComponent implements OnInit, OnDestroy {
  public order: Order;
  public total: number;
  public displayedColumns = [ 'name', 'type', 'price', 'count', 'total' ];
  public dataSource: MatTableDataSource<ItemInOrder> = new MatTableDataSource<ItemInOrder>([]);
  private subscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
    private datePipe: DatePipe,
    @Inject(MAT_DIALOG_DATA) private data: Order,
  ) {
  }

  ngOnInit(): void {
    this.subscription = this.store$.select(fromHome.getItems)
      .subscribe((items: Item[]) => {
        this.order = this.data;

        if (this.order.type === OrderType.NEW) {
          this.order.items.forEach((itemInOrder: ItemInOrder) => {
            itemInOrder._item = _.find(items, (item: Item) => item._id === itemInOrder.itemId);
          });
        } else {
          this.order.items = this.order.processedOrderItems
            .map((processedItemInOrder: string) => JSON.parse(processedItemInOrder));
        }

        this.total = 0;
        this.order.items.forEach((item) => {
          const totalForItem = item.count * (<Item>item._item).price;
          item.total = totalForItem.toFixed(2);
          this.total += totalForItem;
        });

        this.dataSource.data = this.order.items;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  printReceiptToDocx() {
    const orderToPrint: OrderToPrint = {
      order: this.order,
      total: this.total,
      orderProcessedDate: this.datePipe.transform(this.order.processed, 'MMMM d, y, HH:mm'),
    };

    this.store$.dispatch(new PrintReceiptToDocx(orderToPrint));
  }

  printReceiptToPDF() {
    this.store$.dispatch(new PrintReceiptToPDF());
  }
}
