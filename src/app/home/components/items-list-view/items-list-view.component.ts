import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef, MatPaginator, PageEvent } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';

import * as fromHome from '../../reducers';
import { Item } from '../../../../../models/item.model';
import { GetItems, RemoveItem } from '../../actions/item';
import { ItemDataSource } from '../../data-sources/item.datasource';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { PagerData } from '../../../../../models/pagination.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-items-list-view',
  templateUrl: 'items-list-view.component.html',
  styleUrls: [ 'items-list-view.component.scss' ],
})
export class ItemsListViewComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator: MatPaginator;

  public displayedColumns = [ '_id', 'name', 'price', 'type', 'actions' ];
  public dataSource: DataSource<Item>;

  public isLoadingResults$: Observable<boolean>;
  public pager$: Observable<PagerData>;
  public items$: Observable<Item[]>;
  private dialogRef: MatDialogRef<ItemDialogComponent>;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private matDialog: MatDialog
  ) {
    this.items$ = this.store$.pipe(select(fromHome.getItems));
    this.isLoadingResults$ = this.store$.pipe(select(fromHome.getIsLoading));
    this.pager$ = this.store$.pipe(select(fromHome.getPager));

    this.pager$.first().subscribe((pagerData: PagerData) => {
      pagerData.page = 0;
      this.store$.dispatch(new GetItems(pagerData));
    });
  }

  ngOnInit() {
    this.paginator.page.subscribe((pageEvent: PageEvent) => {
      this.store$.dispatch(new GetItems({
        page: pageEvent.pageIndex,
        limit: pageEvent.pageSize
      }));
    });

    this.dataSource = new ItemDataSource(this.items$);

    this.subscription = this.store$.pipe(select(fromHome.getIsSaved))
      .subscribe((isSaved: boolean) => {
        if (this.dialogRef && isSaved) {
          this.dialogRef.componentInstance.cancel();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  addNew() {
    this.dialogRef = this.matDialog.open(ItemDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: {},
      disableClose: true,
    });
  }

  edit(item: Item) {
    this.dialogRef = this.matDialog.open(ItemDialogComponent, {
      minWidth: '400px',
      maxWidth: '800px',
      data: Object.assign({}, item),
      disableClose: true,
    });
  }

  remove(id: string) {
    this.store$.dispatch(new RemoveItem(id));
  }
}
