import { Component, Input, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { PASSENGERS_TYPE } from 'src/app/shared/constants';

@Component({
  selector: 'passengers',
  templateUrl: './passengers.component.html',
  styleUrls: ['./passengers.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class PassengersComponent {
  @Input() flightSearchForm!: FormGroup;

  passengersType = PASSENGERS_TYPE;
  passengersValue = '';

  decrease(id: string) {
    const control = this.flightSearchForm.get(id);
    if (control?.value > 0) {
      control?.setValue(control.value - 1);
      this.changePassengersValue();
    }
  }

  increase(id: string) {
    const control = this.flightSearchForm.get(id);
    control?.setValue(control.value + 1);
    this.changePassengersValue();
  }

  changePassengersValue() {
    this.passengersValue = Object.entries(this.passengersCount)
      .filter(([, value]) => value > 0)
      .map((item) => item.reverse().join(' '))
      .join(', ');
  }

  get passengersCount() {
    return {
      Adults: this.flightSearchForm.get('adults')?.value,
      Child: this.flightSearchForm.get('child')?.value,
      Infant: this.flightSearchForm.get('infant')?.value,
    } as { [key: string]: number };
  }
}
