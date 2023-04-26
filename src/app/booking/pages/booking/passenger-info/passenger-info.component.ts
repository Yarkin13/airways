import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { nameValidator, dateValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
})
export class PassengerInfoComponent {
  @Input() passengerType: 'Adult' | 'Child' | 'Infant' = 'Adult';

  @Input() passengerIdx = 0;

  maxDate: Date;

  minDate: Date;

  gender = 'Male';

  needCheckedInBaggage = false;

  constructor() {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
    this.minDate = new Date(currentYear - 90, 0, 0);
  }

  bookingForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, nameValidator()]),
    lastName: new FormControl('', [Validators.required, nameValidator()]),
    dateBirthDay: new FormControl('', [
      Validators.required,
      dateValidator(true),
    ]),
    needSpecAssist: new FormControl('', []),
    baggageWeight: new FormControl('', [Validators.min(10), Validators.max(50)]),
  });

  get firstName() {
    return this.bookingForm.get('firstName');
  }

  get lastName() {
    return this.bookingForm.get('lastName');
  }

  get dateBirthDay() {
    return this.bookingForm.get('dateBirthDay');
  }

  get needSpecAssist() {
    return this.bookingForm.get('needSpecAssist');
  }

  get baggageWeight() {
    return this.bookingForm.get('baggageWeight');
  }

  getErrorMessageFirstName() {
    if (this.firstName?.hasError('required')) {
      return 'Please enter a first name';
    }

    return this.firstName?.hasError('nameValidator') ? 'Invalid character' : '';
  }

  getErrorMessageLastName() {
    if (this.lastName?.hasError('required')) {
      return 'Please enter a last name';
    }

    return this.lastName?.hasError('nameValidator') ? 'Invalid character' : '';
  }

  getErrorMessageBirthday() {
    if (this.dateBirthDay?.hasError('required')) {
      return 'Please enter your birthday';
    }

    return this.dateBirthDay?.hasError('dateValidator')
      ? 'Invalid date MM/DD/YYYY'
      : '';
  }

  selectedTabChangeGender(e: MatTabChangeEvent) {
    this.gender = e.tab.textLabel;
  }
}
