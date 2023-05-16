import { Component, Input, OnInit } from '@angular/core';
import { IFlightInfo } from 'src/app/shared/models/flight-info.model';

@Component({
  selector: 'dates-slider-content',
  templateUrl: './dates-slider-content.component.html',
  styleUrls: ['./dates-slider-content.component.scss'],
})
export class DatesSliderContentComponent implements OnInit {
  @Input() date!: IFlightInfo;
  @Input() back!: boolean;
  @Input() currency = 'eur';
  durationTime!: string;

  currentClasses = {
    redBackground: false,
    orangeBackground: false,
    greenBackground: false,
  };

  ngOnInit() {
    if (this.date.timeMins) {
      this.durationTime = `${Math.trunc(this.date.timeMins / 60)}h ${
        this.date.timeMins % 60
      }m`;
    }

    if (this.date.seats) {
      const { total, avaible } = this.date.seats;
      if (avaible < 10) this.currentClasses.redBackground = true;
      else if (total / 2 > avaible) this.currentClasses.orangeBackground = true;
      else this.currentClasses.greenBackground = true;
    }
  }

  selectFlight() {}
}
