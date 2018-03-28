import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { select, Store } from '@ngrx/store';
import { DataSource } from '@angular/cdk/collections';

import * as fromHome from '../../reducers';
import { Item } from '../../../../../models/item.model';
import { RemoveItem } from '../../actions/item';
import { ItemDataSource } from '../../data-sources/item.datasource';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { Subscription } from 'rxjs/Subscription';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-items-list-view',
  templateUrl: 'items-list-view.component.html',
  styleUrls: [ 'items-list-view.component.scss' ],
})
export class ItemsListViewComponent implements OnInit, OnDestroy {
  public displayedColumns = [ '_id', 'name', 'price', 'type', 'actions' ];
  public dataSource: DataSource<Item>;

  public isLoadingResults$: Observable<boolean>;
  public items$: Observable<Item[]>;
  private dialogRef: MatDialogRef<ItemDialogComponent>;
  private subscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private matDialog: MatDialog
  ) {
    this.items$ = this.store$.pipe(select(fromHome.getItems));
    this.isLoadingResults$ = this.store$.pipe(select(fromHome.getItemsIsLoading));
  }

  ngOnInit() {
    this.dataSource = new ItemDataSource(this.items$);

    this.subscription = this.store$.pipe(select(fromHome.getItemsIsSaved))
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
