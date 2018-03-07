import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';

import * as fromHome from '../../reducers';
import { Item } from '../../../../../models/item.model';
import { GetItems } from '../../actions/item';
import { ItemDataSource } from '../../data-sources/item.datasource';
import { Pager } from '../../models/pager.model';

@Component({
  selector: 'app-items-list-view',
  templateUrl: 'items-list-view.component.html',
  styleUrls: [ 'items-list-view.component.scss' ],
})
export class ItemsListViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'name', 'price', 'type' ];
  public dataSource: DataSource<Item>;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<Pager>;
  public items$: Observable<Item[]>;

  constructor(private store: Store<fromHome.State>) {
    this.items$ = this.store.pipe(select(fromHome.getItems));
    this.isLoadingResults$ = this.store.pipe(select(fromHome.getIsLoading));
    this.pager$ = this.store.pipe(select(fromHome.getPager));
  }

  ngOnInit() {
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store.dispatch(new GetItems(<Pager>{
        pageNumber: pageEvent.pageIndex,
        pageSize: pageEvent.pageSize
      }));
    });

    this.dataSource = new ItemDataSource(this.items$);
  }
}
