import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Order, OrderType } from '../../../../../models/order.model';
import * as fromHome from '../../reducers';
// import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { OrderDataSource } from '../../data-sources/order.datasource';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { GetOrders, RemoveOrder } from '../../actions/order';
import { Subscription } from 'rxjs/Subscription';
import { PagerData } from '../../../../../models/pagination.model';

@Component({
  selector: 'app-orders-list-view',
  templateUrl: 'orders-list-view.component.html',
  styleUrls: [ 'orders-list-view.component.scss' ],
})
export class OrdersListViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'items', 'type', 'created', 'processed', 'actions' ];
  public dataSource: DataSource<Order>;
  public orderType = OrderType;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<PagerData>;
  public orders$: Observable<Order[]>;
  // private dialogRef: MatDialogRef<OrderDialogComponent>;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private matDialog: MatDialog
  ) {
    this.orders$ = this.store$.pipe(select(fromHome.getOrders));
    this.isLoadingResults$ = this.store$.pipe(select(fromHome.getOrdersIsLoading));
    this.pager$ = this.store$.pipe(select(fromHome.getOrdersPager));

    this.pager$.first().subscribe((pagerData: PagerData) => {
      pagerData.page = 0;
      this.store$.dispatch(new GetOrders(pagerData));
    });
  }

  ngOnInit() {
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store$.dispatch(new GetOrders({
        page: pageEvent.pageIndex,
        limit: pageEvent.pageSize
      }));
    });

    this.dataSource = new OrderDataSource(this.orders$);

    this.subscription = this.store$.pipe(select(fromHome.getOrdersIsSaved))
      .subscribe((isSaved: boolean) => {
        /*if (this.dialogRef && isSaved) {
          this.dialogRef.componentInstance.cancel();
        }*/
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNew() {
/*    this.dialogRef = this.matDialog.open(OrderDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: {},
      disableClose: true,
    });*/
  }

  edit(order: Order) {
    /*this.dialogRef = this.matDialog.open(OrderDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: Object.assign({}, order),
      disableClose: true,
    });*/
  }

  remove(id: string) {
    this.store$.dispatch(new RemoveOrder(id));
  }
}
