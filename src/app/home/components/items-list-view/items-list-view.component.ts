import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';

import * as fromHome from '../../reducers';
import { Item } from '../../../../../models/item.model';
import { GetItems, RemoveItem } from '../../actions/item';
import { ItemDataSource } from '../../data-sources/item.datasource';
import { Pager } from '../../models/pager.model';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';

@Component({
  selector: 'app-items-list-view',
  templateUrl: 'items-list-view.component.html',
  styleUrls: [ 'items-list-view.component.scss' ],
})
export class ItemsListViewComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'name', 'price', 'type', 'actions' ];
  public dataSource: DataSource<Item>;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<Pager>;
  public items$: Observable<Item[]>;

  constructor(
    private store: Store<fromHome.State>,
    private matDialog: MatDialog
  ) {
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

  addNew() {
    this.matDialog.open(ItemDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: {},
      disableClose: true,
    });
  }

  edit(item: Item) {
    this.matDialog.open(ItemDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: item,
      disableClose: true,
    });
  }

  remove(id: string) {
    this.store.dispatch(new RemoveItem(id));
  }
}
