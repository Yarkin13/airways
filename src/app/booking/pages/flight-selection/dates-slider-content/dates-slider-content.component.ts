import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  deleteFlightBack,
  deleteFlightTo,
  setFlightBack,
  setFlightTo,
} from 'src/app/redux/actions/flight.action';
import { selectHeaderCurrency } from 'src/app/redux/selectors/header-data.selectors';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'dates-slider-content',
  templateUrl: './dates-slider-content.component.html',
  styleUrls: ['./dates-slider-content.component.scss'],
})
export class DatesSliderContentComponent implements OnInit {
  @Input() date!: IFlightInfo;
  @Input() back!: boolean;
  @Input() isSelect = false;
  currency$ = this.store.select(selectHeaderCurrency);
  durationTime!: string;

  currentClasses = {
    redBackground: false,
    orangeBackground: false,
    greenBackground: false,
  };

  constructor(private store: Store) {}

  ngOnInit() {
    this.durationTime = `${Math.trunc(this.date.timeMins / 60)}h ${this.date.timeMins % 60}m`;

    const { total, avaible } = this.date.seats;
    if (avaible < 10) this.currentClasses.redBackground = true;
    else if (total / 2 > avaible) this.currentClasses.orangeBackground = true;
    else this.currentClasses.greenBackground = true;
  }

  selectFlight() {
    if (this.back) this.store.dispatch(setFlightBack({ flight: this.date }));
    else this.store.dispatch(setFlightTo({ flight: this.date }));
  }

  editFlight() {
    if (this.back) this.store.dispatch(deleteFlightBack());
    else this.store.dispatch(deleteFlightTo());
  }
}
