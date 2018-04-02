import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, NgZone, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';

import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import * as fromHome from '../../reducers';
import { ItemInOrder, Order, OrderType } from '../../../../../models/order.model';
import { Subscription } from 'rxjs/Subscription';
import { Item } from '../../../../../models/item.model';
import { ConfigurationService } from '../../../shared/services/configuration.service';

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
    private configurationService: ConfigurationService,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private ngZone: NgZone,
    private cdRef: ChangeDetectorRef,
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

        this.total = this.order.items.reduce((total, current: any) => total + current.count * current._item.price, 0);

        this.dataSource.data = this.order.items;
        this.cdRef.detectChanges();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  print() {
    this.configurationService.print();
  }

  printToPDF() {
    this.configurationService.printToPDF();
  }
}
