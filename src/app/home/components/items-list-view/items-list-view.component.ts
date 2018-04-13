import { ChangeDetectionStrategy, Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef, MatTableDataSource } from '@angular/material';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';
import { select, Store } from '@ngrx/store';

import * as fromHome from '../../reducers';
import { Item } from '../../../../../models/item.model';
import { RemoveItem } from '../../actions/item';
import { ItemDialogComponent } from '../item-dialog/item-dialog.component';
import { ConfirmService } from '../../../shared/services/confirm.service';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-items-list-view',
  templateUrl: 'items-list-view.component.html',
  styleUrls: [ 'items-list-view.component.scss' ],
})
export class ItemsListViewComponent implements OnInit, OnDestroy {
  public displayedColumns = [ '_id', 'name', 'price', 'type', 'actions' ];
  public dataSource: MatTableDataSource<Item> = new MatTableDataSource<Item>([]);

  public isLoadingResults$: Observable<boolean>;
  public items$: Observable<Item[]>;
  private dialogRef: MatDialogRef<ItemDialogComponent>;
  private isSavedSubscription: Subscription;
  private itemsSubscription: Subscription;

  constructor(
    private store$: Store<fromHome.State>,
    private matDialog: MatDialog,
    private ngZone: NgZone,
    private confirm: ConfirmService,
  ) {
    this.items$ = this.store$.pipe(select(fromHome.getItems));
    this.isLoadingResults$ = this.store$.pipe(select(fromHome.getItemsIsLoading));
  }

  ngOnInit() {
    this.itemsSubscription = this.items$.subscribe((items) => {
      this.ngZone.run(() => {
        this.dataSource.data = items;
      });
    });

    this.isSavedSubscription = this.store$.pipe(select(fromHome.getItemsIsSaved))
      .subscribe((isSaved: boolean) => {
        if (this.dialogRef && isSaved) {
          this.dialogRef.componentInstance.cancel();
        }
      });
  }

  ngOnDestroy() {
    this.isSavedSubscription.unsubscribe();
    this.itemsSubscription.unsubscribe();
  }

  addNew() {
    this.dialogRef = this.matDialog.open(ItemDialogComponent, {
      maxWidth: '800px',
      data: {},
      disableClose: true,
    });
  }

  edit(item: Item) {
    this.dialogRef = this.matDialog.open(ItemDialogComponent, {
      maxWidth: '800px',
      data: Object.assign({}, item),
      disableClose: true,
    });
  }

  remove(id: string) {
    this.confirm.showDialog().take(1).subscribe((result) => {
      if (result) {
        this.store$.dispatch(new RemoveItem(id));
      }
    });
  }
}
