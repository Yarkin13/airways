import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from 'src/app/material/material.module';
import { selectFlightData } from 'src/app/redux/selectors/flight.selectors';
import { Store } from '@ngrx/store';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap, take } from 'rxjs';

@Component({
  selector: 'app-edit-menu',
  standalone: true,
  imports: [CommonModule, MaterialModule, SharedModule],
  templateUrl: './edit-menu.component.html',
  styleUrls: ['./edit-menu.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class EditMenuComponent implements OnInit, OnDestroy {
  flightSearchForm: FormGroup = new FormGroup({
    from: new FormControl({ key: '', name: '' }, Validators.required),
    destination: new FormControl({ key: '', name: '' }, Validators.required),
    dateTo: new FormControl<Date | null>(null),
    dateBack: new FormControl<Date | null>(null),
    adults: new FormControl(0),
    child: new FormControl(0),
    infant: new FormControl(0),
  });

  @Output() hideForm = new EventEmitter<boolean>();

  errors = {
    from: false,
    destination: false,
    date: '',
    passengers: false,
  };

  constructor(private store: Store, private router: Router) {
    this.store
      .select(selectFlightData)
      .pipe(take(2))
      .subscribe((data) => {
        this.flightSearchForm.setValue({
          from: { key: data.fromKey, name: data.from },
          destination: { key: data.toKey, name: data.to },
          dateTo: new Date(data.dateTo.substring(0, 10)),
          dateBack: data.dateBack ? new Date(data.dateBack.substring(0, 10)) : null,
          adults: +data.adult,
          child: +data.child,
          infant: +data.infant,
        });
      });
  }

  ngOnInit() {
    this.flightSearchForm.valueChanges
      .pipe(
        switchMap(async () => {
          if (Object.values(this.errors).some((val) => val)) {
            this.errors = {
              from: false,
              destination: false,
              date: '',
              passengers: false,
            };
          }
        })
      )
      .subscribe();
  }

  ngOnDestroy() {
    this.hideForm.emit();
  }

  checkErrors() {
    if (!this.fromValue) this.errors.from = true;
    if (!this.destinationValue) this.errors.destination = true;
    if (!Date.parse(this.dateToValue)) this.errors.date = 'Required field';

    if (this.adultValue === 0 && this.childValue === 0 && this.infantValue === 0) {
      this.errors.passengers = true;
    }
    return Object.values(this.errors).every((val) => !val);
  }

  onSubmit(): void {
    if (this.checkErrors()) {
      const request = {
        fromKey: this.fromValue,
        toKey: this.destinationValue,
        fromValue: this.flightSearchForm.get('from')?.value.name,
        toValue: this.flightSearchForm.get('destination')?.value.name,
        forwardDate: this.getCurrentDate(this.dateToValue),
        backDate: this.getCurrentDate(this.dateBackValue),
        adult: this.adultValue,
        child: this.childValue,
        infant: this.infantValue,
      };

      this.router.navigate(['/booking/flights'], { queryParams: request });
      this.hideForm.emit();
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

  // eslint-disable-next-line class-methods-use-this
  getCurrentDate(date: Date) {
    if (!date) return null;
    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
  }
}
