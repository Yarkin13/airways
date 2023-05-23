import {
  Component,
  Input,
  Inject,
  OnInit,
  OnDestroy,
  EventEmitter,
  Output,
} from '@angular/core';
import { v4 as uuidv4 } from 'uuid';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { selectHeaderDate } from 'src/app/redux/selectors/header-data.selectors';
import { DateFormat } from 'src/app/shared/constants';
import { nameValidator, dateValidator } from 'src/app/shared/validators';
import { PassengerInfo } from 'src/app/shared/models/booking.model';
import { selectPassengerById } from 'src/app/redux/selectors/booking.selectors';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

@UntilDestroy()
@Component({
  selector: 'app-passenger-info',
  templateUrl: './passenger-info.component.html',
  styleUrls: ['./passenger-info.component.scss'],
  providers: [{ provide: MAT_DATE_FORMATS, useClass: DateFormat }],
})
export class PassengerInfoComponent implements OnDestroy, OnInit {
  @Input() passengerType: 'Adult' | 'Child' | 'Infant' = 'Adult';

  @Input() id: string;

  @Input() passengerIdx = 0;

  @Input() submitEmitter: EventEmitter<void>;

  @Output() validPassengerInfoFormEmitter: EventEmitter<boolean> =
    new EventEmitter();

  @Output() passengerInfoFormEmitter: EventEmitter<PassengerInfo> =
    new EventEmitter();

  submitSub: Subscription;

  maxDate: Date;

  minDate: Date;

  gender: 'Male' | 'Female' = 'Male';

  needCheckedInBaggage = false;

  needSpecAssist = false;

  dateFormatSub: Subscription;

  availableCheckedInBaggage = true;

  initPassengerInfo: PassengerInfo | undefined;

  bookingForm: FormGroup;

  constructor(
    private store: Store,
    @Inject(MAT_DATE_FORMATS) public config: DateFormat
  ) {
    const currentYear = new Date().getFullYear();
    this.maxDate = new Date();
    this.minDate = new Date(currentYear - 90, 0, 0);
  }

  ngOnInit() {
    this.dateFormatSub = this.store
      .select(selectHeaderDate)
      // eslint-disable-next-line @ngrx/no-store-subscription
      .subscribe((date) => {
        this.config.value = date;
      });

    this.availableCheckedInBaggage = this.passengerType !== 'Infant';

    this.submitSub = this.submitEmitter.subscribe(() => this.onSubmit());

    this.store
      .select(selectPassengerById(this.id))
      .pipe(untilDestroyed(this))
      .subscribe((value) => {
        this.initPassengerInfo = value;
        this.gender = value?.gender || 'Male';
      });

    this.needSpecAssist = Boolean(
      this.initPassengerInfo?.needSpecialAssistance
    );

    this.needCheckedInBaggage = Boolean(this.initPassengerInfo?.baggage);

    this.bookingForm = new FormGroup({
      firstName: new FormControl(this.initPassengerInfo?.firstName || '', [
        Validators.required,
        nameValidator(),
      ]),
      lastName: new FormControl(this.initPassengerInfo?.lastName || '', [
        Validators.required,
        nameValidator(),
      ]),
      dateBirthDay: new FormControl(this.initPassengerInfo?.dateOfBirth, [
        Validators.required,
        dateValidator(true),
      ]),

      baggageWeight: new FormControl(this.initPassengerInfo?.baggage || '', [
        Validators.min(10),
        Validators.max(50),
      ]),
    });
  }

  get firstName() {
    return this.bookingForm.get('firstName');
  }

  get lastName() {
    return this.bookingForm.get('lastName');
  }

  get dateBirthDay() {
    return this.bookingForm.get('dateBirthDay');
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
    this.gender = e.tab.textLabel as 'Male' | 'Female';
  }

  ngOnDestroy() {
    this.dateFormatSub.unsubscribe();
    this.submitSub.unsubscribe();
  }

  onSubmit() {
    this.validPassengerInfoFormEmitter.emit(this.bookingForm.valid);
    this.bookingForm.markAllAsTouched();

    const passengerInfo = {
      lastName: this.lastName?.value || '',
      firstName: this.firstName?.value || '',
      dateOfBirth: this.dateBirthDay?.value || '',
      baggage: this.baggageWeight?.value || '',
      gender: this.gender,
      passengerType: this.passengerType,
      id: this.id || uuidv4(),
      needSpecialAssistance: this.needSpecAssist,
    };

    if (this.bookingForm.valid) {
      this.passengerInfoFormEmitter.emit(passengerInfo);
    }
  }
}
