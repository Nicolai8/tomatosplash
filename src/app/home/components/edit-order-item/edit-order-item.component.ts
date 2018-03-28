import {
  AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALIDATORS, NG_VALUE_ACCESSOR, ValidationErrors, Validator,
  Validators
} from '@angular/forms';
import { Component, forwardRef, Input, OnDestroy } from '@angular/core';
import { Item } from '../../../../../models/item.model';
import { ItemInOrder } from '../../../../../models/order.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-edit-order-item',
  templateUrl: 'edit-order-item.component.html',
  styleUrls: [ 'edit-order-item.component.scss' ],
  providers: [
    { provide: NG_VALIDATORS, useExisting: forwardRef(() => EditOrderItemComponent), multi: true },
    { provide: NG_VALUE_ACCESSOR, useExisting: forwardRef(() => EditOrderItemComponent), multi: true }
  ]
})
export class EditOrderItemComponent implements ControlValueAccessor, Validator, OnDestroy {
  @Input() items: Item[];
  @Input() disable = false;

  form: FormGroup;

  private subscription: Subscription;
  private propagateChange = (_: any) => {
  };
  private propagateTouch = (_: any) => {
  };

  constructor() {
    this.form = new FormGroup({
      count: new FormControl(0, [ Validators.required, Validators.min(0) ]),
      itemId: new FormControl('', Validators.required),
    });
  }

  registerOnChange(fn) {
    this.propagateChange = fn;
  }

  registerOnTouched(fn) {
    this.propagateTouch = fn;
  }

  writeValue(value: ItemInOrder): void {
    if (value) {
      this.subscription = this.form.valueChanges.subscribe((data) => {
        this.propagateChange(data);
      });
      this.form.setValue({
        count: value && value.count || 0,
        itemId: value && value.itemId || '',
      });
    }
  }

  validate(c: AbstractControl): ValidationErrors | null {
    if (!this.form || this.form.pristine || this.form.valid) {
      return null;
    }
    return {
      editItemInOrderError: {
        given: this.form.value
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
