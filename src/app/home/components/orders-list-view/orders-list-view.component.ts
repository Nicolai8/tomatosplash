import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { DataSource } from '@angular/cdk/collections';
import { Order, OrderType } from '../../../../../models/order.model';
import * as fromHome from '../../reducers';
import { OrderDataSource } from '../../data-sources/order.datasource';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { GetOrders, RemoveOrder, SelectOrder } from '../../actions/order';
import { Subscription } from 'rxjs/Subscription';
import { PagerData } from '../../../../../models/pagination.model';

@Component({
  selector: 'app-orders-list-view',
  templateUrl: 'orders-list-view.component.html',
  styleUrls: [ 'orders-list-view.component.scss' ],
})
export class OrdersListViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'type', 'created', 'updated', 'processed', 'actions' ];
  public dataSource: DataSource<Order>;
  public orderType = OrderType;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<PagerData>;
  public orders$: Observable<Order[]>;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
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
    this.subscription = this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store$.dispatch(new GetOrders({
        page: pageEvent.pageIndex,
        limit: pageEvent.pageSize
      }));
    });

    this.dataSource = new OrderDataSource(this.orders$);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNew() {
    this.store$.dispatch(new SelectOrder(new Order()));
  }

  edit(order: Order) {
    this.store$.dispatch(new SelectOrder(order));
  }

  remove(id: string) {
    this.store$.dispatch(new RemoveOrder(id));
  }
}
