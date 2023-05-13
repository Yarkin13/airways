import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { switchMap } from 'rxjs/operators';
import { BookingActions } from 'src/app/redux/actions/booking.actions';
import { PassengerType } from 'src/app/shared/models/booking.model';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  flightSearchForm: FormGroup = new FormGroup({
    from: new FormControl({ key: '', name: '' }, Validators.required),
    destination: new FormControl({ key: '', name: '' }, Validators.required),
    dateTo: new FormControl<Date | null>(null),
    dateBack: new FormControl<Date | null>(null),
    adults: new FormControl(0),
    child: new FormControl(0),
    infant: new FormControl(0),
  });

  flightType = 'roundTrip';
  errors = {
    from: false,
    destination: false,
    date: false,
    passengers: false,
  };

  constructor(private store: Store, private router: Router) {}

  ngOnInit() {
    this.flightSearchForm.valueChanges
      .pipe(
        switchMap(async () => {
          if (Object.values(this.errors).some((val) => val)) {
            this.errors = {
              from: false,
              destination: false,
              date: false,
              passengers: false,
            };
          }
        })
      )
      .subscribe();
  }

  changeFlightType(newType: string) {
    this.flightType = newType;
  }

  checkErrors() {
    const today = new Date();
    if (!this.fromValue) this.errors.from = true;
    if (!this.destinationValue) this.errors.destination = true;
    if (this.dateToValue < today) this.errors.date = true;
    if (this.flightType === 'roundTrip' && this.dateBackValue < today) {
      this.errors.date = true;
    }
    if (this.adultValue === 0 && this.childValue === 0 && this.infantValue === 0) {
      this.errors.passengers = true;
    }
    return Object.values(this.errors).every((val) => !val);
  }

  onSubmit(): void {
    if (this.checkErrors()) {
      const passengers: PassengerType[] = [
        { type: 'Adult', count: this.adultValue },
        { type: 'Child', count: this.childValue },
        { type: 'Infant', count: this.infantValue },
      ];
      this.store.dispatch(BookingActions.setPassengers({ passengers }));
      this.router.navigate(['/booking/flights'], {
        queryParams: {
          from: this.fromValue,
          to: this.destinationValue,
          dateIn: this.dateToValue.toISOString(),
          dateOut: this.dateBackValue.toISOString(),
        },
      });
    }
  }

  get fromValue() {
    return this.flightSearchForm.get('from')?.value.key;
  }
  get destinationValue() {
    return this.flightSearchForm.get('destination')?.value.key;
  }
  get dateToValue() {
    return this.flightSearchForm.get('dateTo')?.value;
  }
  get dateBackValue() {
    return this.flightSearchForm.get('dateBack')?.value;
  }
  get adultValue() {
    return this.flightSearchForm.get('adults')?.value;
  }
  get childValue() {
    return this.flightSearchForm.get('child')?.value;
  }
  get infantValue() {
    return this.flightSearchForm.get('infant')?.value;
  }
}
