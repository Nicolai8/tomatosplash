import { Component, NgZone, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, PageEvent } from '@angular/material';
import { Order, OrderType } from '../../../../../models/order.model';
import * as fromHome from '../../reducers';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { GetOrders, ProceedOrder, RemoveOrder, SelectOrder } from '../../actions/order';
import { Subscription } from 'rxjs/Subscription';
import { PagerData } from '../../../../../models/pagination.model';
import { OrderDialogComponent } from '../order-dialog/order-dialog.component';
import { ConfirmService } from '../../../shared/services/confirm.service';

@Component({
  selector: 'app-orders-list-view',
  templateUrl: 'orders-list-view.component.html',
  styleUrls: [ 'orders-list-view.component.scss' ],
})
export class OrdersListViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'type', 'created', 'updated', 'processed', 'actions' ];
  public dataSource: MatTableDataSource<Order> = new MatTableDataSource<Order>([]);
  public orderType = OrderType;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<PagerData>;
  public orders$: Observable<Order[]>;
  private pagerSubscription: Subscription;
  private onInitSubscription: Subscription;
  private ordersSubscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private ngZone: NgZone,
    private matDialog: MatDialog,
    private confirm: ConfirmService,
  ) {
    this.orders$ = this.store$.select(fromHome.getOrders);
    this.isLoadingResults$ = this.store$.pipe(select(fromHome.getOrdersIsLoading));
    this.pager$ = this.store$.pipe(select(fromHome.getOrdersPager));

    this.onInitSubscription = this.pager$.first().subscribe((pagerData: PagerData) => {
      pagerData.page = 0;
      this.store$.dispatch(new GetOrders(pagerData));
    });
  }

  ngOnInit() {
    this.ordersSubscription = this.orders$.subscribe((orders) => {
      this.ngZone.run(() => {
        this.dataSource.data = orders;
      });
    });

    this.pagerSubscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store$.dispatch(new GetOrders({
        page: pageEvent.pageIndex,
        limit: pageEvent.pageSize
      }));
    });
  }

  ngOnDestroy() {
    this.pagerSubscription.unsubscribe();
    this.onInitSubscription.unsubscribe();
    this.ordersSubscription.unsubscribe();
  }

  addNew() {
    this.store$.dispatch(new SelectOrder(new Order()));
  }

  edit(order: Order) {
    this.store$.dispatch(new SelectOrder(order));
  }

  proceed(order: Order) {
    this.confirm.showDialog('MESSAGES.PROCEED_ORDER_CONFIRMATION').take(1).subscribe((result) => {
      if (result) {
        this.store$.dispatch(new ProceedOrder(order._id));
      }
    });
  }

  remove(id: string) {
    this.confirm.showDialog().take(1).subscribe((result) => {
      if (result) {
        this.store$.dispatch(new RemoveOrder(id));
      }
    });
  }

  visualize(order: Order) {
    this.matDialog.open(OrderDialogComponent, {
      panelClass: 'app-order-dialog',
      data: Object.assign({}, order),
    });
  }
}
