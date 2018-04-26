import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function requiredIfRelativeChangedValidator(relativeControlName: string, initialValue: string): ValidatorFn {
  let relatedControl: AbstractControl;
  let relativeControl: AbstractControl;

  return (control: AbstractControl): ValidationErrors | null => {
    if (!control.parent) {
      return null;
    }

    if (!relatedControl) {
      relatedControl = control;

      relativeControl = control.parent.get(relativeControlName);
      if (!relativeControl) {
        throw new Error(`requiredIfRelativeChangedValidator(): control name: '${relativeControlName}' is not found in parent group`);
      }

      relativeControl.valueChanges.subscribe(() => {
        relatedControl.updateValueAndValidity();
      });
    }

    if (!relativeControl) {
      return null;
    }

    const relativeIsDirty = relativeControl.value !== initialValue;
    if (relativeIsDirty && control.value.length === 0) {
      return { RequiredIfRelativeChanged: true };
    }
    return null;
  };
}
