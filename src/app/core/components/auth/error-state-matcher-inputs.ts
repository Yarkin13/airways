import { ErrorStateMatcher } from '@angular/material/core';
import { FormControl } from '@angular/forms';

export class InputErrorStateMatcher implements ErrorStateMatcher {
  /* eslint-disable-next-line */
  isErrorState(control: FormControl | null): boolean {
    return !!(control && control.invalid && control.touched);
  }
}
