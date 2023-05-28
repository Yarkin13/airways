import {
  Component, OnDestroy, OnInit, Inject
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { Store } from '@ngrx/store';
import { selectHeaderDate } from 'src/app/redux/selectors/header-data.selectors';
import { Subscription } from 'rxjs';
import {
  passwordValidator,
  emailValidator,
  nameValidator,
  dateValidator,
  phoneValidator,
} from '../../../../shared/validators';
import {
  COUNTRY_CODES,
  CITIZENSHIP,
  DateFormat,
} from '../../../../shared/constants';
import { AuthService } from '../../../services/auth.service';
import { InputErrorStateMatcher } from '../error-state-matcher-inputs';

@Component({
  selector: 'app-sing-up-form',
  templateUrl: './sing-up-form.component.html',
  styleUrls: ['./sing-up-form.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useClass: DateFormat }],
})
export class SingUpFormComponent implements OnDestroy, OnInit {
  hidePassword = true;

  gender = 'Male';

  maxDate: Date;

  minDate: Date;

  countryCodes: {
    name: string;
    dial_code: string;
    code: string;
  }[] = COUNTRY_CODES;

  citizenshipArray = CITIZENSHIP;

  signUpSub: Subscription;

  dateFormatSub: Subscription;

  constructor(
    public auth: AuthService,
    private store: Store,
    @Inject(MAT_DATE_FORMATS) public config: DateFormat
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date(currentYear - 18, 0, 0);
    this.minDate = new Date(currentYear - 90, 0, 0);
  }

  ngOnInit() {
    this.dateFormatSub = this.store
      .select(selectHeaderDate)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((date) => {
        this.config.value = date;
      });
  }

  signUpForm = new FormGroup({
    login: new FormControl('', [Validators.required, emailValidator()]),
    password: new FormControl('', [Validators.required, passwordValidator()]),
    firstName: new FormControl('', [Validators.required, nameValidator()]),
    lastName: new FormControl('', [Validators.required, nameValidator()]),
    dateBirthDay: new FormControl('', [Validators.required, dateValidator()]),
    countryCode: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required, phoneValidator()]),
    citizenship: new FormControl('', [Validators.required]),
    agreement: new FormControl('', [Validators.requiredTrue]),
  });

  errorMatcher = new InputErrorStateMatcher();

  get login() {
    return this.signUpForm.get('login');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get firstName() {
    return this.signUpForm.get('firstName');
  }

  get lastName() {
    return this.signUpForm.get('lastName');
  }

  get dateBirthDay() {
    return this.signUpForm.get('dateBirthDay');
  }

  get countryCode() {
    return this.signUpForm.get('countryCode');
  }

  get phone() {
    return this.signUpForm.get('phone');
  }

  get citizenship() {
    return this.signUpForm.get('citizenship');
  }

  get agreement() {
    return this.signUpForm.get('agreement');
  }

  getErrorMessageLogin() {
    if (this.login?.hasError('required')) {
      return 'Please enter a login email';
    }

    return this.login?.hasError('emailValidator') ? 'Not a valid email' : '';
  }

  getErrorMessagePassword() {
    if (this.password?.hasError('required')) {
      return 'Please enter a password';
    }

    return this.password?.hasError('passwordValidator')
      ? 'Your password isn`t strong enough'
      : '';
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
      ? 'Invalid date MM/DD/YYYY, you must be over 18 years of age'
      : '';
  }

  getErrorMessagePhone() {
    if (this.phone?.hasError('required')) {
      return 'Please enter your phone number';
    }

    return this.phone?.hasError('phoneValidator')
      ? 'Not a valid phone number'
      : '';
  }

  onSubmit() {
    this.signUpForm.markAllAsTouched();
    if (this.signUpForm.invalid) return;

    this.signUpSub = this.auth
      .register({
        email: this.login?.value || '',
        password: this.password?.value || '',
        firstName: this.firstName?.value || '',
        lastName: this.lastName?.value || '',
        phone: this.phone?.value || '',
        dateOfBirth: this.dateBirthDay?.value || '',
        countryCode: this.countryCode?.value || '',
        citizenship: this.citizenship?.value || '',
        gender: this.gender,
      })
      .subscribe((data) => {
        if (data.token) {
          this.signUpForm.reset();
          this.signUpForm.markAsUntouched();
        }
      });
  }

  selectedTabChangeGender(e: MatTabChangeEvent) {
    this.gender = e.tab.textLabel;
  }

  ngOnDestroy(): void {
    if (this.signUpSub) this.signUpSub.unsubscribe();
    this.dateFormatSub.unsubscribe();
  }
}
