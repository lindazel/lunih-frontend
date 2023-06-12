import { AbstractControl, ValidationErrors } from '@angular/forms';

export const phoneNumberValidator: ValidationErrors = (control: AbstractControl) => {
  if (!control.value) {
    return null;
  } else {
    // Match 8-11 digit
    const valid = /^[0-9]{8,11}$/.test(control.value);
    return valid ? null : { invalidPhoneNumber: { valid: false, value: control.value } };
  }
};
