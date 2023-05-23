import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectContactDetails } from 'src/app/redux/selectors/booking.selectors';
import { selectUserInfo } from 'src/app/redux/selectors/user.selectors';
import { COUNTRY_CODES } from 'src/app/shared/constants';
import { ContactDetails } from 'src/app/shared/models/booking.model';
import { emailValidator, phoneValidator } from 'src/app/shared/validators';
import { UserRegisterData } from 'src/app/core/models/user.model';

@UntilDestroy()
@Component({
  selector: 'app-contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
})
export class ContactDetailsComponent implements OnInit, OnDestroy {
  countryCodes: {
    name: string;
    dial_code: string;
    code: string;
  }[] = COUNTRY_CODES;

  @Input() submitEmitter: EventEmitter<void>;

  @Output() validContactDetailsFormEmitter: EventEmitter<boolean> = new EventEmitter();

  @Output() contactDetailsFormEmitter: EventEmitter<ContactDetails> = new EventEmitter();

  submitSub: Subscription;

  initContactDetails: ContactDetails;

  contactDetailsForm: FormGroup;

  userRegisterData: UserRegisterData;

  constructor(private store: Store) {}

  ngOnInit() {
    this.submitSub = this.submitEmitter.subscribe(() => this.onSubmit());

    this.store
      .select(selectContactDetails)
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        if (value) this.initContactDetails = value;
      });

    this.store
      .select(selectUserInfo)
      .pipe(untilDestroyed(this))
      .subscribe((data) => {
        this.userRegisterData = data;
      });

    this.contactDetailsForm = new FormGroup({
      email: new FormControl(
        this.initContactDetails?.email || this.userRegisterData.email || '',
        [Validators.required, emailValidator()]
      ),
      countryCode: new FormControl(
        this.initContactDetails?.countryCode
          || this.userRegisterData.countryCode
          || '',
        [Validators.required]
      ),
      phone: new FormControl(
        this.initContactDetails?.phone || this.userRegisterData.phone || '',
        [Validators.required, phoneValidator()]
      ),
    });
  }

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

  onSubmit() {
    this.validContactDetailsFormEmitter.emit(this.contactDetailsForm.valid);
    this.contactDetailsForm.markAllAsTouched();
    if (this.contactDetailsForm.valid) {
      this.contactDetailsFormEmitter.emit({
        phone: this.phone?.value || '',
        email: this.email?.value || '',
        countryCode: this.countryCode?.value || '',
      });
    }
  }

  ngOnDestroy() {
    this.submitSub.unsubscribe();
  }
}
