import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { COUNTRY_CODES } from 'src/app/shared/constants';
import { emailValidator, phoneValidator } from 'src/app/shared/validators';

@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent {
  countryCodes: {
    name: string;
    dial_code: string;
    code: string;
  }[] = COUNTRY_CODES;

  contactDetailsForm = new FormGroup({
    email: new FormControl('', [Validators.required, emailValidator()]),
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, phoneValidator()]),
  });

  get email() {
    return this.contactDetailsForm.get('email');
  }

  get countryCode() {
    return this.contactDetailsForm.get('countryCode');
  }

  get phone() {
    return this.contactDetailsForm.get('phone');
  }

  getErrorMessagePhone() {
    if (this.phone?.hasError('required')) {
      return 'Please enter your phone number';
    }

    return this.phone?.hasError('phoneValidator')
      ? 'Not a valid phone number'
      : '';
  }

  getErrorMessageEmail() {
    if (this.email?.hasError('required')) {
      return 'Please enter a email';
    }

    return this.email?.hasError('emailValidator') ? 'Not a valid email' : '';
  }
}
