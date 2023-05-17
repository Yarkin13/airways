import { Component, Input, ViewEncapsulation, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectHeaderCurrency } from 'src/app/redux/selectors/header-data.selectors';
import { IEmptyFlight, IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'dates-slider-tab',
  templateUrl: './dates-slider-tab.component.html',
  styleUrls: ['./dates-slider-tab.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DatesSliderTabComponent implements OnInit {
  @Input() date!: IFlightInfo | IEmptyFlight;
  currency$ = this.store.select(selectHeaderCurrency);

  currentClasses = {
    redBorder: false,
    orangeBorder: false,
    greenBorder: false,
  };

  constructor(private store: Store) {}

  ngOnInit() {
    if (this.date.price) {
      const { total, avaible } = this.date.seats;
      if (avaible < 10) this.currentClasses.redBorder = true;
      else if (total / 2 > avaible) this.currentClasses.orangeBorder = true;
      else this.currentClasses.greenBorder = true;
    }
  }
}
