import { ChangeDetectionStrategy, Component, Inject, NgZone, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { select, Store } from '@ngrx/store';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { Item } from '../../../../../models/item.model';
import * as fromHome from '../../reducers';
import { AddItem, EditItem } from '../../actions/item';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-item-dialog',
  templateUrl: 'item-dialog.component.html',
  styleUrls: [ 'item-dialog.component.scss' ]
})
export class ItemDialogComponent implements OnInit {
  public form: FormGroup;
  public isSaving$: Observable<boolean>;

  constructor(
    private store: Store<fromHome.State>,
    private dialogRef: MatDialogRef<ItemDialogComponent>,
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) private item: Item,
  ) {
  }

  ngOnInit() {
    this.isSaving$ = this.store.pipe(select(fromHome.getIsSaving));

    this.form = new FormGroup({
      _id: new FormControl(this.item._id || ''),
      name: new FormControl(this.item.name || '', [ Validators.required ]),
      price: new FormControl(this.item.price || 0, [ Validators.required, Validators.min(0) ]),
      type: new FormControl(this.item.type || ''),
    });
  }

  save() {
    const formValue: Item = this.form.getRawValue();
    if (formValue._id) {
      this.store.dispatch(new EditItem(formValue._id, formValue));
    } else {
      this.store.dispatch(new AddItem(formValue));
    }
  }

  cancel() {
    this.ngZone.run(() => {
      this.dialogRef.close();
    });
  }
}
