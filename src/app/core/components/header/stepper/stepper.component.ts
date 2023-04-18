import {
  Component, Input, OnChanges,
} from '@angular/core';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
})
export class StepperComponent implements OnChanges {
  @Input() currentPage!: string;

  isFlights = true;

  isPassengers = false;

  isReview = false;

  ngOnChanges(): void {
    if (this.currentPage === '/booking/flights') {
      this.isFlights = true;
      this.isPassengers = false;
      this.isReview = false;
    }
    if (this.currentPage === '/booking/booking') {
      this.isFlights = false;
      this.isPassengers = true;
      this.isReview = false;
    }
    if (this.currentPage === '/booking/summary') {
      this.isFlights = false;
      this.isPassengers = false;
      this.isReview = true;
    }
  }
}
